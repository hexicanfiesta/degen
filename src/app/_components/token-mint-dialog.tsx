import React from "react";
import type { WriteContractErrorType } from "@wagmi/core";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "motion/react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import pepeCry from "@/assets/pepe-cry.webp";
import Image from "next/image";

type ExtendedWriteContractError = WriteContractErrorType & {
  shortMessage: string;
};

type Props = {
  onClose: () => Promise<void>;
  refetch: () => Promise<void>;
  resetLaunch: () => void;
  initMintSuccess: boolean;
  isInitMintReceiptLoading: boolean;
  completeMintSuccess: boolean;
  isCompleteMintReceiptLoading: boolean;
  initMintError: WriteContractErrorType | null;
  completeMintError: WriteContractErrorType | null;
  isInitMintPending: boolean;
  isCompleteMintPending: boolean;
  ipfsUploading: boolean;
};

// export function ErrorContent({
//   error,
//   refetch,
//   resetLaunch,
// }: {
//   error: ExtendedWriteContractError;
//   refetch: () => Promise<void>;
//   resetLaunch: () => void;
// }) {
//   return (
//     <div className="flex flex-col gap-2 text-sm items-center ">
//       <div className="font-press-start-2p text-center text-red-500">
//         Something went wrong
//       </div>
//       <div className="font-press-start-2p text-center text-red-900">
//         {error.shortMessage}
//       </div>
//       <Image src={pepeCry} alt="pepe crying" className="w-[100px] h-[100px]" />
//       <div className="flex gap-2 w-full justify-end mt-5">
//         <button className="font-sans" onClick={async () => await refetch()}>
//           Try again
//         </button>
//         <AlertDialogCancel onClick={resetLaunch} className="bg-degen-orange text-white">
//           Cancel
//         </AlertDialogCancel>
//       </div>
//     </div>
//   );
// }

// export default function MintDialog({
//   onClose,
//   initMintSuccess,
//   refetch,
//   resetLaunch,
//   isInitMintReceiptLoading,
//   completeMintSuccess,
//   isCompleteMintReceiptLoading,
//   isInitMintPending,
//   isCompleteMintPending,
//   initMintError,
//   completeMintError,
//   ipfsUploading,
// }: Props) {
//   const isError = initMintError ?? completeMintError;

//   return (
//     <AlertDialog defaultOpen={true}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle className="font-press-start-2p text-center">
//             Launching
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             {isInitMintReceiptLoading && "Waiting for transaction to be mined"}
//             {isCompleteMintReceiptLoading &&
//               "Waiting for transaction to be mined"}
//             {isInitMintPending &&
//               "Go to your god damn wallet and confirm the transaction"}
//             {isCompleteMintPending &&
//               "Go to your god damn wallet and confirm the transaction"}
//             {completeMintSuccess && "Successfully minted your token"}
//             {ipfsUploading && "JUST A FEW MORE SECONDS NOW"}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         {isError && initMintError && (
//           <ErrorContent
//             error={initMintError as ExtendedWriteContractError}
//             refetch={refetch}
//             resetLaunch={resetLaunch}
//           />
//         )}
//         {isError && completeMintError && (
//           <ErrorContent
//             error={completeMintError as ExtendedWriteContractError}
//             refetch={refetch}
//             resetLaunch={resetLaunch}
//           />
//         )}
//         <AlertDialogFooter>
//           {completeMintSuccess && (
//             <AlertDialogAction
//               onClick={async () => await onClose()}
//               className="bg-degen-orange"
//             >
//               Continue
//             </AlertDialogAction>
//           )}
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

export function ErrorContent({
  error,
  refetch,
  resetLaunch,
}: {
  error: ExtendedWriteContractError;
  refetch: () => Promise<void>;
  resetLaunch: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-2 text-sm"
    >
      <div className="text-center font-press-start-2p text-red-500">
        Something went wrong
      </div>
      <div className="text-center font-press-start-2p text-red-900">
        {error.shortMessage}
      </div>
      <Image src={pepeCry} alt="pepe crying" className="h-[100px] w-[100px]" />
      <div className="mt-5 flex w-full justify-end gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-sans"
          onClick={async () => await refetch()}
        >
          Try again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetLaunch}
          className="rounded bg-degen-orange px-4 py-2 text-white"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function MintDialog({
  onClose,
  initMintSuccess,
  refetch,
  resetLaunch,
  isInitMintReceiptLoading,
  completeMintSuccess,
  isCompleteMintReceiptLoading,
  isInitMintPending,
  isCompleteMintPending,
  initMintError,
  completeMintError,
  ipfsUploading,
}: Props) {
  const isError = initMintError ?? completeMintError;
  const isLoading =
    isInitMintReceiptLoading ||
    isCompleteMintReceiptLoading ||
    isInitMintPending ||
    isCompleteMintPending ||
    ipfsUploading;

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-press-start-2p">
              Launching
            </AlertDialogTitle>
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center gap-4"
                >
                  <LoadingSpinner />
                  <AlertDialogDescription className="text-center">
                    {isInitMintReceiptLoading &&
                      "Waiting for transaction to be mined"}
                    {isCompleteMintReceiptLoading &&
                      "Waiting for transaction to be mined"}
                    {isInitMintPending &&
                      "Go to your wallet and confirm the transaction"}
                    {isCompleteMintPending &&
                      "Go to your wallet and confirm the transaction"}
                    {ipfsUploading && "JUST A FEW MORE SECONDS NOW"}
                  </AlertDialogDescription>
                </motion.div>
              )}
              {completeMintSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center font-bold text-green-500"
                >
                  Successfully minted your token!
                </motion.div>
              )}
            </AnimatePresence>
          </AlertDialogHeader>
          <AnimatePresence>
            {isError && (initMintError ?? completeMintError) && (
              <ErrorContent
                error={
                  (initMintError ??
                    completeMintError) as ExtendedWriteContractError
                }
                refetch={refetch}
                resetLaunch={resetLaunch}
              />
            )}
          </AnimatePresence>
          <AlertDialogFooter>
            {completeMintSuccess && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => await onClose()}
                className="rounded bg-degen-orange px-4 py-2 text-white"
              >
                Continue
              </motion.button>
            )}
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
