import { motion } from "motion/react";

export const LoadingSpinner = () => {
  return (
    <motion.div
      className="h-16 w-16 rounded-full border-4 border-degen-orange border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};
