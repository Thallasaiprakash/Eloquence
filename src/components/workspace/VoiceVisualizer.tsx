"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export function VoiceVisualizer({ isRecording }: VoiceVisualizerProps) {
  const [bars, setBars] = useState<number[]>(new Array(20).fill(4));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setBars(prev => prev.map(() => Math.floor(Math.random() * 40) + 4));
      }, 100);
    } else {
      setBars(new Array(20).fill(4));
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="flex items-center justify-center gap-1 h-24">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 4 }}
          animate={{ height }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-1.5 rounded-full ${
            isRecording ? 'bg-primary shadow-[0_0_10px_rgba(126,34,206,0.5)]' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}
