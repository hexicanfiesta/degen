import { Card } from "@/components/ui/card"
import { Copy } from 'lucide-react'

interface TokenPreviewProps {
  name: string
  symbol: string
  supply: string
  logoUrl: string
}

export function TokenPreview({ name, symbol, supply, logoUrl }: TokenPreviewProps) {
  const dummyAddress = "0x019490...";

  function formatSupply(supply: string): string {
    const numericSupply = Number(supply)
    if (isNaN(numericSupply)) return "0"
    
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      notation: numericSupply > 999999 ? 'compact' : 'standard'
    }).format(numericSupply)
  }

  return (
    <Card className="w-full max-w-sm p-4 min-h-[200px] bg-white">
      <div className="flex justify-between items-start">
        <div className="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden bg-gray-100">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Token logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Logo
            </div>
          )}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">More options</span>
          •••
        </button>
      </div>

      <div className="mt-4">
        <h2 className="font-press-start-2p text-lg">{name || "TOKEN NAME"}</h2>
        <p className="font-press-start-2p text-sm text-gray-500 mt-1">
          ({symbol || "SYMBOL"})
        </p>
      </div>

      <p className="font-press-start-2p text-sm mt-4">
        {formatSupply(supply) || "0"} {symbol || "TOKENS"}
      </p>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Contract Address</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">{dummyAddress}</span>
            <Copy className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Owner</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono">{dummyAddress}</span>
            <Copy className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </Card>
  )
}

