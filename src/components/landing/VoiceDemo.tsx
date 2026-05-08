"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, User, Bot, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoSteps = [
  {
    role: "assistant",
    content: "Hello! I'm your Eloquence assistant. What would you like to write about today?",
    typingSpeed: 50
  },
  {
    role: "user",
    content: "I want to write an essay about the impact of artificial intelligence on modern architecture.",
    typingSpeed: 30
  },
  {
    role: "assistant",
    content: "Fascinating topic! AI is revolutionizing generative design. What specific aspect should we focus on? The aesthetic possibilities or the structural efficiency?",
    typingSpeed: 50
  },
  {
    role: "user",
    content: "Let's focus on how AI helps architects create more sustainable and energy-efficient buildings.",
    typingSpeed: 30
  }
];

export function VoiceDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentStep < demoSteps.length) {
      setIsTyping(true);
      let i = 0;
      const text = demoSteps[currentStep].content;
      setDisplayedText("");
      
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text[i]);
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setIsTyping(false);
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
          }, 2000);
        }
      }, demoSteps[currentStep].typingSpeed);

      return () => clearInterval(interval);
    } else {
      // Reset after a delay
      setTimeout(() => setCurrentStep(0), 5000);
    }
  }, [currentStep]);

  return (
    <section className="py-24 bg-black/20">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold mb-6">Experience the <span className="gold-gradient">Magic</span></h2>
            <p className="text-muted-foreground text-lg mb-8">
              Watch how Eloquence transforms a simple conversation into the foundation of a brilliant essay. No typing required, just your brilliant ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex items-center gap-6 p-6 rounded-2xl glass border-primary/20 flex-1">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mic className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold">AI is listening...</p>
                  <p className="text-sm text-muted-foreground">Speak naturally, like you're talking to a mentor.</p>
                </div>
              </div>
              <Button 
                onClick={() => {
                  window.location.href = '/dashboard/voice';
                }}
                className="h-full py-6 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl group"
              >
                Launch Live Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="relative p-8 rounded-3xl glass border-white/10 min-h-[400px] flex flex-col gap-6 shadow-2xl">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-5 h-5 text-gold opacity-50" />
              </div>
              
              <AnimatePresence mode="popLayout">
                {demoSteps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: step.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-4 ${step.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                    }`}>
                      {step.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[80%] ${
                      step.role === 'user' ? 'bg-accent/10 border border-accent/20 rounded-tr-none' : 'bg-primary/10 border border-primary/20 rounded-tl-none'
                    }`}>
                      <p className="text-sm md:text-base">
                        {index === currentStep ? displayedText : step.content}
                        {index === currentStep && isTyping && <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse" />}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 30, repeat: Infinity }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Essay Generation in progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
