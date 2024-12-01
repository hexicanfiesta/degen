"use client";

import {
    config,
    projectId,
    pulsechainCaip,
    pulsechainTestnetCaip,
} from "@/config";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Setup queryClient
export const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
    name: "appkit-example-scroll",
    description: "AppKit Example - Scroll",
    url: process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create modal
const modal = createAppKit({
    adapters: [config],
    projectId,
    networks: [pulsechainTestnetCaip, pulsechainCaip],
    defaultNetwork: pulsechainTestnetCaip,
    metadata: metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
        swaps: false,
        onramp: false,
        email: false,
        socials: false,
        history: false,
    },
    showWallets: true,
    allWallets: "SHOW",
    includeWalletIds: [
        "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    ],
    featuredWalletIds: [
        "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
        "dd43441a6368ec9046540c46c5fdc58f79926d17ce61a176444568ca7c970dcd",
        "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
        "a2eb8a1c403a4440b2f578e9deb185b8e22cf4ec2a2a58441032b84b13aaab87",
        "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1",
    ],
    allowUnsupportedChain: true,
});

export default function WalletConnectProvider({
    children,
    cookies,
}: 
{
    children: ReactNode;
    cookies: string | null;
    
}) {
    // const initialState = localH(config.wagmiConfig as Config);
    const initialState = cookieToInitialState(config.wagmiConfig, cookies)
    return (
        <WagmiProvider
            config={config.wagmiConfig}
            initialState={initialState}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
