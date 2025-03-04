"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(20); // Start progress on navigation
    const timer = setTimeout(() => setProgress(100), 500); // Complete after 500ms

    return () => {
      clearTimeout(timer);
      setProgress(0); // Reset after navigation
    };
  }, [pathname]);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-blue-500"
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ ease: "easeOut", duration: 0.5 }}
    />
  );
};

export default ProgressBar;
