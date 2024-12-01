"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={"ghost"}
      className={cn(
        "h-6 w-6 p-2 rounded-md transition-all duration-200 ease-in-out",
        "hover:bg-primary/10 focus:outline-none focus:ring-2",
        "transform active:scale-95",
        isCopied ? "text-green-600" : "bg-primary/5 text-primary",
      )}
      aria-label={isCopied ? "Copied" : "Copy to clipboard"}
    >
      <div className="relative h-fit w-fit">
        <span
          className={cn(
            "relative inset-0 transform transition-all duration-100 ease-in-out",
            isCopied ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <Copy size={18} />
        </span>
        <span
          className={cn(
            "absolute inset-0 transform transition-all duration-100 ease-in-out",
            isCopied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          <Check size={18} />
        </span>
      </div>
    </Button>
  );
}
