"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
};

export default function CTAButton({ children, href }: Props) {
  return (
    <Link href={href ?? "/meme-launcher"}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hover:bg-degen-orange-dark mt-4 rounded bg-degen-orange px-6 py-3 font-press-start-2p text-white transition-colors"
      >
        {children}
      </motion.button>
    </Link>
  );
}
