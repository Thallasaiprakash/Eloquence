"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mic, Sparkles, LayoutDashboard } from "lucide-react";
import { AuthModal } from "@/components/shared/AuthModal";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl"
    >
      <div className="flex items-center gap-2">
        <Link href="/" className="relative group flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border border-white/10">
              <Mic className="w-5 h-5 text-primary" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-glow">Eloquence</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
        <Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
        <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-[0_0_20px_rgba(126,34,206,0.3)] gap-2">
              <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <AuthModal>
              <Button variant="ghost" className="text-muted-foreground hover:text-primary transition-colors">
                Login
              </Button>
            </AuthModal>
            <AuthModal>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-[0_0_20px_rgba(126,34,206,0.3)]">
                Start Writing <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </AuthModal>
          </>
        )}
      </div>
    </motion.nav>
  );
}
