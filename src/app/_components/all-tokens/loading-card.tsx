import { Card } from "@/components/ui/card";

export default function LoadingCard() {
    return (
      <Card className="min-h-[200px] w-full bg-white p-4 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="h-16 w-16 rounded-lg bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>

        <div className="mt-4 h-3 w-1/4 rounded bg-gray-200" />

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-1/4 rounded bg-gray-200" />
            <div className="h-3 w-1/6 rounded bg-gray-200" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 w-1/5 rounded bg-gray-200" />
            <div className="h-3 w-1/6 rounded bg-gray-200" />
          </div>
        </div>
      </Card>
    );
  }