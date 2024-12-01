"use client";

import { useState } from "react";
import { Check, Copy, Link } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { isAddress } from "viem";

export default function ReferralGenerator() {
  const [address, setAddress] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    if (!address) return;
    // In a real app, you might want to make an API call here
    const link = `https://degenslaunch.com/?r=${address}`;
    setReferralLink(link);
  };

  const copyToClipboard = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center mt-20 p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Pixel Art Style Heading */}
        <h1 className="text-center font-press-start-2p text-4xl font-bold leading-none tracking-tight md:text-5xl">
          Refer friends, get{" "}
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-red-500"
          >
            free
          </motion.span>{" "}
          coins
        </h1>

        <p className="text-muted-foreground text-center font-sans">
          Earn 0.1% of all the memes your friends make, sent directly to your
          wallet
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Paste PLS address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="font-mono"
            />
            <Button
              onClick={generateLink}
              disabled={!address || !isAddress(address)}
              className="bg-degen-orange text-white hover:bg-red-600"
            >
              Create Link
            </Button>
          </div>
          {address && !isAddress(address) && (
            <div className="text-center text-red-500">Invalid address</div>
          )}

          <AnimatePresence mode="wait">
            {referralLink && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden font-mono text-sm">
                      <Link className="size-4 shrink-0" />
                      <span className="truncate">{referralLink}</span>
                    </div>
                    <CopyButton textToCopy={referralLink} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
