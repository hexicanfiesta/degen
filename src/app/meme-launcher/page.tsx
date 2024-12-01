import React from "react";
import TokenFactory from "../_components/token-factory";

export default function FactoryPage({}) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-degen-white text-gray-950">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="font-press-start-2p text-5xl font-extrabold tracking-tight">
          LAUNCH THE <span className="text-degen-orange">SHITTIEST</span> COIN
        </h1>
        <div className="mx-auto w-full max-w-7xl">
          <TokenFactory />
        </div>
      </div>
    </main>
  );
}
