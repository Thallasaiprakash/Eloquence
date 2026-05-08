"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, Github, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AuthModal({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { signInWithGoogle, loginAsGuest } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] glass border-white/10 bg-[#020617]/95 p-0 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
          <Mic className="w-32 h-32 text-primary" />
        </div>
        
        <div className="p-8 relative z-10">
          <DialogHeader className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              {mode === 'login' ? 'Welcome Back' : 'Join Eloquence'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'login' 
                ? 'Sign in to continue your writing journey.' 
                : 'Start speaking your ideas into masterpieces today.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl glass border-white/10 gap-3 hover:bg-white/5 transition-all"
                onClick={() => signInWithGoogle()}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl glass border-white/10 gap-3 hover:bg-white/5 transition-all"
                onClick={() => loginAsGuest()}
              >
                <Github className="w-5 h-5" /> Continue with GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-[#020617] px-2 text-muted-foreground">Or with email</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="evelyn@example.com" className="h-12 rounded-xl glass border-white/10 focus:border-primary/50 pl-12" />
                </div>
              </div>
              <Button 
                onClick={() => loginAsGuest()}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg"
              >
                {mode === 'login' ? 'Login to Eloquence' : 'Create Account'}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => loginAsGuest()}
                className="w-full h-12 rounded-xl hover:bg-white/5 text-xs text-primary font-bold uppercase tracking-widest"
              >
                Enter as Demo Guest
              </Button>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 p-4 text-center border-t border-white/5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Secure · Encrypted · AI-Powered
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
