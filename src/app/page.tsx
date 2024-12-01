import CTAButton from "@/components/ui/cta-button";
import AllTokenGrid from "./_components/all-tokens/token-grid";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-degen-white text-gray-950">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="font-press-start-2p text-5xl font-extrabold tracking-tight">
          TIME TO BE A <span className="text-degen-orange">DEGEN</span> AGAIN
        </h1>
        <p>
          Your number one meme collection on PulseChain. Launch your own meme
          token!
        </p>
        <CTAButton>Launch your own meme token</CTAButton>
        <AllTokenGrid />
      </div>
    </main>
  );
}
