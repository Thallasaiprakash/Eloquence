"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Play, Sparkles } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow"></div>

      <div className="container px-6 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-gradient">The Future of Writing is Voice</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          Speak your <span className="text-glow text-primary">Masterpiece</span> <br />
          into <span className="gold-gradient">Existence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Eloquence is your sophisticated AI writing companion. Have a natural conversation about your ideas, and watch them transform into elegant, structured essays in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-lg font-semibold shadow-[0_0_30px_rgba(126,34,206,0.4)] transition-all hover:scale-105">
            <Mic className="mr-2 w-6 h-6" /> Start Speaking Free
          </Button>
          <Button size="lg" variant="outline" className="h-16 px-8 rounded-full glass border-white/10 text-lg font-semibold hover:bg-white/5 transition-all">
            <Play className="mr-2 w-5 h-5 fill-current" /> Watch Demo
          </Button>
        </motion.div>

        {/* AI Assistant Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
          <div className="relative w-full h-full rounded-full border-2 border-white/10 p-4 overflow-hidden bg-background/50 backdrop-blur-md">
            <Image 
              src="/avatar.png" 
              alt="Eloquence AI" 
              fill 
              className="object-cover rounded-full opacity-90 brightness-110"
            />
            {/* Waveform Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 24, 8, 32, 4] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 rounded-full bg-primary/80"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles/Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-24 h-24 rounded-full border border-primary/20"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-[15%] w-32 h-32 rounded-full border border-accent/20"
        />
      </div>
    </section>
  );
}
