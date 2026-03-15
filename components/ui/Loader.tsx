"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(40px)" }}
          transition={{ duration: 1 }}
        >
          {/* brume animée */}
          <motion.div
            className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
            animate={{ x: [0, 200, -200, 0], y: [0, -200, 200, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          <motion.div
            className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
            animate={{ x: [0, -200, 200, 0], y: [0, 200, -200, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
          />

          {/* logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={120}
              height={120}
              priority
            />

            <motion.div
              className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
