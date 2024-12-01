import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import Image from "next/image";
import React from "react";

type Props = {
  contractAddress: string;
  name: string;
  symbol: string;
  supply: string;
  creator: string;
  ipfsHash?: string;
};

export default function TokenCards({
  contractAddress = "0x019490...",
  name,
  symbol,
  supply,
  creator = "0x019490...",
  ipfsHash,
}: Props) {
  function formatSupply(supply: string): string {
    const numericSupply = Number(supply);
    if (isNaN(numericSupply)) return "0";

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      notation: numericSupply > 999999 ? "compact" : "standard",
    }).format(numericSupply);
  }

  return (
    <Card className="min-h-[200px] w-full bg-white p-4 duration-150">
      <div className="flex items-start justify-between">
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
          {ipfsHash ? (
            <Image
              src={
                "https://crimson-secure-rabbit-370.mypinata.cloud/ipfs/" +
                ipfsHash
              }
              alt={name + " logo"}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Logo
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-press-start-2p text-lg">{name || "TOKEN NAME"}</h2>
        <p className="mt-1 font-press-start-2p text-sm text-gray-500">
          ({symbol || "SYMBOL"})
        </p>
      </div>

      <p className="mt-4 font-press-start-2p text-sm">
        {formatSupply(supply) || "0"} {symbol || "TOKENS"}
      </p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Contract Address</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">
              {contractAddress.slice(0, 5)}...{contractAddress.slice(-4)}
            </span>
            <CopyButton textToCopy={contractAddress} />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Creator</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">
              {creator.slice(0, 5)}...{creator.slice(-4)}
            </span>
            <CopyButton textToCopy={creator} />
          </div>
        </div>
      </div>
    </Card>
  );
}
