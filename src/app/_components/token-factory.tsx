"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { degenFactoryAbi } from "@/lib/abi";
import { cn } from "@/lib/utils";
import {
  degenFactoryNoTaxAddressMainNet,
  degenFactoryNoTaxAddressTestNet,
} from "@/services/contract";
import { pinata } from "@/utils/config";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useQueryState } from "nuqs";
import React, { useEffect, useMemo, useState } from "react";
import { isAddress, parseEther } from "viem";
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import MintDialog from "./token-mint-dialog";
import { TokenPreview } from "./token-preview";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

interface KeyResponse {
  JWT: string;
}

export default function TokenFactory() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [tokenName, setTokenName] = useQueryState("name");
  const [contractAddress, setContractAddress] = useState<
    `0x${string}` | undefined
  >();
  const [referral] = useQueryState("r");
  const [tokenSymbol, setTokenSymbol] = useQueryState("tokenSymbol");
  const [tokenSupply, setTokenSupply] = useQueryState("tokenSupply");
  const [logoUrl, setLogoUrl] = useState("");
  const [, setLogoFile] = useState<File | null>(null);

  const [file, setFile] = useState<File>();
  const [IpfsHash, setIpfsHash] = useState("");
  const [uploading, setUploading] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const uploadFile = async (address?: `0x${string}`) => {
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const keyData = await keyRequest.json();
      const upload = await pinata.upload
        .file(file)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .key(keyData.JWT as string)
        .addMetadata({ name: address! as string });
      setIpfsHash(upload.IpfsHash);
      setUploading(false);
      return upload.IpfsHash;
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const deleteFile = async () => {
    try {
      const unpin = await pinata.unpin([IpfsHash]);
    } catch (e) {
      console.log(e);
      console.log("Error deleting file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoUrl("");
    }
  };

  const chainID = useChainId();

  const FactoryContractAddress = useMemo(() => {
    if (chainID === 369) {
      return degenFactoryNoTaxAddressMainNet;
    } else if (chainID === 943) {
      return degenFactoryNoTaxAddressTestNet;
    } else return "";
  }, [chainID]);

  const {
    data: simulateInitMint,
    error: simulateInitMintError,
    isSuccess,
    isLoading: isLoadingSimulate,
  } = useSimulateContract({
    abi: degenFactoryAbi,
    address: FactoryContractAddress as `0x${string}`,
    functionName: "initiateMint",
    args: [tokenName!, tokenSymbol!, parseEther(tokenSupply! ?? "0")],
    query: {
      refetchOnWindowFocus: false,
      enabled: !!tokenName && !!tokenSymbol && !!tokenSupply,
    },
  });

  const {
    writeContractAsync: initMintWrite,
    data: result,
    error: initMintError,
    isPending: isInitMintPending,
    reset: resetInitMint,
  } = useWriteContract();

  const {
    data: receipt,
    isSuccess: isReceiptSuccess,
    isLoading: isInitMintReceiptLoading,
  } = useWaitForTransactionReceipt({
    hash: result,
  });

  useEffect(() => {
    if (isReceiptSuccess && receipt?.logs[0]?.address) {
      setContractAddress(receipt.logs[0].address);
    }
  }, [isReceiptSuccess, receipt]);

  const referralAddress = useMemo(() => {
    if (referral && isAddress(referral)) {
      return referral;
    } else {
      return "0x0000000000000000000000000000000000000000";
    }
  }, [referral]);

  const {
    data: simulateCompleteMint,
    error: simulateCompleteMintError,
    isSuccess: isSimulateCompleteMintSuccess,
    isLoading: isLoadingSimulateCompleteMint,
  } = useSimulateContract({
    abi: degenFactoryAbi,
    address: FactoryContractAddress as `0x${string}`,
    functionName: "completeMint",
    args: [
      contractAddress!, // tokenAddress
      referralAddress, // referralAddress
      IpfsHash, // referralAddress
    ],
    query: {
      refetchOnWindowFocus: false,
      enabled: !!contractAddress && !!IpfsHash,
    },
  });

  const {
    writeContractAsync: completeMintWrite,
    data: completeMintWriteTxHash,
    error: completeMintError,
    isPending: isCompleteMintPending,
    reset: resetCompleteMint,
  } = useWriteContract();

  const {
    data: completeMintReceipt,
    isSuccess: isCompleteMintSuccess,
    isLoading: isCompleteMintReceiptLoading,
  } = useWaitForTransactionReceipt({
    hash: completeMintWriteTxHash,
  });

  async function handleTokenCompleteMint(
    imageHash: string,
    contractAddress: `0x${string}`,
  ) {
    try {
      const hash = await completeMintWrite({
        abi: degenFactoryAbi,
        address: FactoryContractAddress as `0x${string}`,
        functionName: "completeMint",
        args: [
          contractAddress, // tokenAddress
          referralAddress,
          imageHash, // referralAddress
        ],
      });
      await waitForTransactionReceipt(config.wagmiConfig, {
        hash,
      });
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }

  async function handleLaunch() {
    try {
      setIsLaunching(true);
      const initMintHash = await initMintWrite(simulateInitMint!.request);

      const receipt = await waitForTransactionReceipt(config.wagmiConfig, {
        hash: initMintHash,
      });
      if (receipt.status === "success" && receipt.logs[0]?.address) {
        const imageHash = await uploadFile(receipt.logs[0]?.address);
        await handleTokenCompleteMint(
          imageHash! as `0x${string}`,
          receipt.logs[0]?.address,
        );
      }
    } catch (e) {
      console.log("error:", e);
      if (IpfsHash) await deleteFile();
    }
  }

  async function resetAll() {
    setIsLaunching(false);
    await setTokenName("");
    await setTokenSymbol("");
    await setTokenSupply("");
    setLogoUrl("");
    setLogoFile(null);
    resetInitMint();
    resetCompleteMint();
  }

  function resetLaunch() {
    setIsLaunching(false);
    resetInitMint();
    resetCompleteMint();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleLaunch();
  }

  const handleConnectWallet = async () => {
    await open();
  };

  const isDisabled = !tokenName || !tokenSymbol || !tokenSupply || !logoUrl;

  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-8 text-center font-press-start-2p text-xl">
          MEMECOIN FACTORY
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-press-start-2p text-sm"
            >
              Token Name
            </label>
            <Input
              id="name"
              value={tokenName ?? ""}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Death Over Green Eels"
              className="w-full text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="symbol"
              className="mb-2 block font-press-start-2p text-sm"
            >
              Token Symbol
            </label>
            <Input
              id="symbol"
              value={tokenSymbol?.trim() ?? ""}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="DOGE"
              className="w-full text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="supply"
              className="mb-2 block font-press-start-2p text-sm"
            >
              Token total supply
            </label>
            <Input
              id="supply"
              type="number"
              value={tokenSupply?.trim() ?? ""}
              onChange={(e) => setTokenSupply(e.target.value)}
              placeholder="69 420"
              className="w-full text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="logo"
              className="mb-2 block font-press-start-2p text-sm"
            >
              Logo Upload
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className={cn()}
              />
            </div>
          </div>
          {isConnected && address != "undefined" && (
            <Button
              type="submit"
              disabled={isLaunching || isDisabled}
              className="h-12 w-full bg-red-500 font-press-start-2p text-sm text-white hover:bg-red-600"
            >
              {isDisabled
                ? "Please fill in all fields"
                : isLaunching
                  ? "Launching..."
                  : "Launch That Shit"}
            </Button>
          )}
          {!isConnected && (
            <Button
              type="button"
              onClick={handleConnectWallet}
              className="h-12 w-full bg-red-500 font-press-start-2p text-sm text-white hover:bg-red-600"
            >
              Connect Wallet to Launch
            </Button>
          )}
        </form>
      </div>

      <div
        className={cn(
          "flex items-start justify-center opacity-10 duration-150",
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          (tokenName || tokenSymbol || tokenSupply || logoUrl) && "opacity-100",
        )}
      >
        <TokenPreview
          name={tokenName ?? ""}
          symbol={tokenSymbol ?? ""}
          supply={tokenSupply ?? ""}
          logoUrl={logoUrl ?? ""}
        />
      </div>
      {isLaunching && (
        <MintDialog
          onClose={async () => {
            setIsLaunching(false);
            await resetAll();
          }}
          ipfsUploading={uploading}
          resetLaunch={resetLaunch}
          refetch={handleLaunch}
          initMintSuccess={isReceiptSuccess}
          isInitMintReceiptLoading={isInitMintReceiptLoading}
          completeMintSuccess={isCompleteMintSuccess}
          isCompleteMintReceiptLoading={isCompleteMintReceiptLoading}
          initMintError={initMintError}
          completeMintError={completeMintError}
          isInitMintPending={isInitMintPending}
          isCompleteMintPending={isCompleteMintPending}
        />
      )}
    </div>
  );
}
