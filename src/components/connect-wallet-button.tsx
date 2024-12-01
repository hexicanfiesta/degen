"use client";

import {
  useAppKitAccount,
  useAppKit,
  useAppKitState,
} from "@reown/appkit/react";
import { useMemo, useEffect } from "react";
import { Button } from "./ui/button";
import { useAccount, useChainId, useDisconnect } from "wagmi";

const ConnectWalletButton = () => {
  const { isConnected, status } = useAppKitAccount();
  const {address} = useAccount()
  const { open: isOpen } = useAppKitState();
  const { open } = useAppKit();
  const chainId = useChainId();
  const { disconnectAsync } = useDisconnect();

  const buttonText = useMemo(() => {
    if (isConnected && address) {
      return address?.slice(0, 4) + "..." + address?.slice(-6);
    }

    if (isOpen && !isConnected) {
      return "Loading...";
    }

    if (status === "connecting") {
      return "Connecting...";
    }

    if (status === "reconnecting") {
      return "Connecting...";
    }

    return "Connect Wallet";
  }, [isConnected, status, address, isOpen]);

  return (
    <Button
      onClick={async () => {
        if (isConnected && address === undefined ) {
          await disconnectAsync();
        } else {
          await open();
        }
      }}
      className="rounded-full bg-degen-orange text-white hover:bg-red-600"
      disabled={isOpen}
    >
      {buttonText}
    </Button>
  );
};

export default ConnectWalletButton;
