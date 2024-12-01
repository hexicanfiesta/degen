import ConnectWalletButton from "@/components/connect-wallet-button";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex h-16 items-center justify-between rounded-full bg-white px-6 shadow-md">
          <Link
            href="/"
            className="font-Press_Start_2P font-press-start-2p text-2xl font-bold text-red-500"
          >
            DEGEN
          </Link>
          <nav className="hidden space-x-8 font-press-start-2p text-xs md:flex">
            <Link href="/meme-launcher" className="text-gray-900">
              MEME LAUNCHER
            </Link>
            <Link href="/all-tokens" className="text-gray-900">
              ALL TOKENS
            </Link>
            <Link href="/referal" className="text-gray-900">
              REFERAL
            </Link>
          </nav>
          <div className="flex-0 w-fit">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
