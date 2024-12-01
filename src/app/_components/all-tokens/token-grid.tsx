"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { degenFactoryAbi } from "@/lib/abi";
import {
  degenFactoryNoTaxAddressMainNet,
  degenFactoryNoTaxAddressTestNet,
} from "@/services/contract";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { readContract, readContracts } from "@wagmi/core";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { erc20Abi, formatEther } from "viem";
import { useChainId, useReadContract } from "wagmi";
import TokenCards from "@/app/_components/all-tokens/token-cards";
import LoadingCard from "@/app/_components/all-tokens/loading-card";
import Link from "next/link";

type TokenDetail = {
  address: string;
  creator: string;
  name: string;
  symbol: string;
  logoURL: string;
  totalSupply: string;
};

const fetchTokenAddresses = async (
  pageIndex: number,
  pageSize: number,
  FactoryContractAddress: string,
): Promise<string[]> => {
  const startIndex = pageIndex * pageSize;

  const totalAirdrops = await readContract(config.wagmiConfig, {
    address: FactoryContractAddress as `0x${string}`,
    abi: degenFactoryAbi,
    functionName: "getTotalCreatedTokens",
    args: [],
  });

  const endIndex = Math.min(startIndex + pageSize, Number(totalAirdrops));
  const numCalls = endIndex - startIndex;

  // Create an array of contract calls
  const calls = Array.from({ length: numCalls }, (_, i) => ({
    address: FactoryContractAddress as `0x${string}`,
    abi: degenFactoryAbi,
    functionName: "getTokenByIndex",
    args: [BigInt(startIndex + i)],
  }));

  // Batch call using `readContracts`
  const results = await readContracts(config.wagmiConfig, {
    contracts: calls,
  });

  // Extract addresses from results and handle potential null/undefined
  return results.map((result) => result.result as string);
};

const fetchTokenDetails = async (
  addresses: string[],
  creator: string[],
  FactoryContractAddress: string,
): Promise<TokenDetail[]> => {
  const calls = addresses.flatMap((address) => [
    {
      address: address as `0x${string}`,
      abi: erc20Abi,
      functionName: "name",
    },
    {
      address: address as `0x${string}`,
      abi: erc20Abi,
      functionName: "symbol",
    },
    {
      address: address as `0x${string}`,
      abi: erc20Abi,
      functionName: "totalSupply",
    },
    {
      address: FactoryContractAddress as `0x${string}`,
      abi: degenFactoryAbi,
      functionName: "getTokenImageURL",
      args: [address],
    },
    // {
    //   address: "0x54Ab8D0134c69FA2C996214C05F0D8C7e6E937e0" as `0x${string}`,
    //   abi: metaDataDBAbi,
    //   functionName: "getMetadata",
    //   args: [address],
    // }
  ]);

  const results = await readContracts(config.wagmiConfig, {
    contracts: calls,
    allowFailure: false,
  });

  // Group the details into TokenDetail objects
  return addresses.map((address, i) => ({
    address,
    creator: creator[i] ?? "",
    name: results[i * 4] as string,
    symbol: results[i * 4 + 1] as string,
    logoURL: results[i * 4 + 3] as string,
    totalSupply: formatEther(results[i * 4 + 2] as bigint),
  }));
};

const usePaginatedTokens = (
  pageIndex: number,
  pageSize: number,
  FactoryContractAddress: string,
) => {
  return useQuery<TokenDetail[], Error>({
    queryKey: ["tokens", pageIndex],
    queryFn: async () => {
      // Step 1: Fetch token addresses
      const addresses = await fetchTokenAddresses(
        pageIndex,
        pageSize,
        FactoryContractAddress,
      );

      // Step 2: Fetch token details
      const tokenDetails = await fetchTokenDetails(
        addresses.map((address) => address[0]!),
        addresses.map((address) => address[1]!),
        FactoryContractAddress,
      );
      return tokenDetails;
    },
    placeholderData: keepPreviousData,
  });
};

export default function AllTokenGrid() {
  const limit = 12;
  const [canPressNext, setCanPressNext] = useState(false);

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(Math.min(1)),
  );

  const chainID = useChainId();

  const factoryContractAddress = useMemo(() => {
    if (chainID === 369) {
      return degenFactoryNoTaxAddressMainNet;
    } else if (chainID === 943) {
      return degenFactoryNoTaxAddressTestNet;
    } else return "";
  }, [chainID]);

  const { data: totalTokens } = useReadContract({
    address: factoryContractAddress as `0x${string}`,
    abi: degenFactoryAbi,
    functionName: "getTotalCreatedTokens",
    args: [],
  });

  useEffect(() => {
    if (totalTokens) {
      setCanPressNext(page * limit < Number(totalTokens));
    }

    const handleGoToFirstPage = async () => {
      if (totalTokens && page > Math.ceil(Number(totalTokens) / limit)) {
        await setPage(1);
      }
    };

    void handleGoToFirstPage();
  }, [totalTokens, page, limit, setPage]);

  const {
    data: tokens,
    isFetching: isLoadingTokenDetails,
    isPending: isTokenDetailsPending,
    isError: isErrorTokenDetails,
    isPlaceholderData,
  } = usePaginatedTokens(
    (page > 0 ? page : 1) - 1,
    limit,
    factoryContractAddress,
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* {isLoadingTokenDetails && <div>Loading token details...</div>} */}
        {isTokenDetailsPending ? (
          Array.from({ length: limit }).map((_, i) => <LoadingCard key={i} />)
        ) : isErrorTokenDetails ? (
          <div>Error loading token details</div>
        ) : (
          tokens?.map((token) => (
            <TokenCards
              key={token.address}
              contractAddress={token.address}
              name={token.name}
              symbol={token.symbol}
              supply={token.totalSupply}
              creator={token.creator}
              ipfsHash={token.logoURL}
            />
          ))
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-12 px-4 py-16">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page <= 1}
        >
          Previous Page
        </Button>
        <span>Page {page}</span>
        <Button
          onClick={async () => {
            if (!isPlaceholderData) {
              await setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !canPressNext}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
