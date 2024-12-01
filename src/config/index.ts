import type { CaipNetwork } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { fallback, http, createStorage, cookieStorage } from "@wagmi/core";
import { pulsechain, pulsechainV4 } from "viem/chains";

// Define the custom network

// import { mainnet, pulsechain-, pulsechainV4, sepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://degenslaunch.com", // origin must match your domain & subdomain
};

// Create wagmiConfig

// export const pulsechainCaip: CaipNetwork = defineChain(pulsechain);
// export const pulsechainTestnetCaip: CaipNetwork = defineChain(pulsechainV4);

export const pulsechainCaip: CaipNetwork = {
  ...pulsechain,
  chainNamespace: "eip155",
  caipNetworkId: `eip155:${pulsechain.id}`,
};

export const pulsechainTestnetCaip: CaipNetwork = {
  ...pulsechainV4,
  chainNamespace: "eip155",
  caipNetworkId: `eip155:${pulsechainV4.id}`,
};

const networks = [pulsechainTestnetCaip, pulsechainCaip];

export const config = new WagmiAdapter({
  projectId,
  networks,
  transports: {
    [pulsechainCaip.id]: fallback([
      http("https://rpc-pulsechain.g4mm4.io"),
      http("https://rpc.pulsechain.com"),
      http("https://pulsechain-rpc.publicnode.com"),
    ]),
    [pulsechainTestnetCaip.id]: http("https://rpc-testnet-pulsechain.g4mm4.io"),
  },
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
});
