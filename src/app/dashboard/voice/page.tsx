"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Bot, 
  User, 
  Save, 
  RotateCcw,
  Volume2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceVisualizer } from "@/components/workspace/VoiceVisualizer";
import { useVoiceStore } from "@/store/useVoiceStore";
import { cn } from "@/lib/utils";

export default function VoiceWritingPage() {
  const { 
    isRecording, 
    transcript, 
    interimTranscript, 
    aiResponse, 
    isProcessing,
    essayContent,
    currentStep,
    startRecording,
    stopRecording,
    setTranscript,
    setInterimTranscript,
    setEssayContent,
    setStep,
    setAIResponse,
    setIsProcessing
  } = useVoiceStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('WebkitSpeechRecognition' in window || 'speechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        let final = '';
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (final) setTranscript(transcript + " " + final);
        setInterimTranscript(interim);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error("Speech recognition restart error:", e);
          }
        }
      };
    }
  }, [transcript, isRecording, setInterimTranscript, setTranscript]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      stopRecording();
      processUserInput();
    } else {
      recognitionRef.current?.start();
      startRecording();
    }
  };

  const processUserInput = async () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    try {
      let data;
      // If we are on static hosting (like Firebase Hosting), we can't call API routes easily.
      // We check if the current location is a .web.app or similar
      const isStaticHost = window.location.hostname.includes('web.app') || window.location.hostname.includes('firebaseapp.com');
      
      if (isStaticHost) {
        // Mock response for static hosting demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        data = { content: "That's a fascinating perspective. In my analysis, focusing on the human-centric design aspect would really elevate this essay. Shall we proceed with that as our primary theme?" };
      } else {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            messages: [{ role: 'user', content: transcript }],
            context: { currentStep }
          }),
        });
        data = await response.json();
      }
      
      setAIResponse(data.content);

      // Progress steps based on current state
      if (currentStep === 'topic') setStep('subject');
      else if (currentStep === 'subject') setStep('tone');
      else if (currentStep === 'tone') {
        setStep('writing');
        setEssayContent("# " + transcript.split('.')[0] + "\n\nDrafting your ideas into a structured essay...");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setAIResponse("I'm sorry, I encountered an error. Let's try that again.");
    } finally {
      setIsProcessing(false);
      setTranscript(""); 
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-180px)] flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 text-primary">
            <Mic className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Voice Writing <span className="text-muted-foreground font-normal">Session</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full glass border-white/5">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg">
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        {/* AI Interaction Side */}
        <div className="flex flex-col gap-6 h-full">
          <Card className="flex-1 glass border-white/5 overflow-hidden flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
              {/* AI Avatar Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-md rounded-full animate-pulse"></div>
                    <img src="/avatar.png" alt="AI" className="relative w-12 h-12 rounded-full object-cover border border-primary/30" />
                  </div>
                  <div>
                    <p className="font-bold text-glow">Eloquence AI</p>
                    <p className="text-[10px] text-primary uppercase tracking-widest font-semibold">Active Assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Voice Enabled</span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 rounded-tl-none">
                    <p className="text-sm leading-relaxed">{aiResponse}</p>
                  </div>
                </div>

                {isProcessing && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="w-4 h-4 animate-spin text-gold" />
                    <span className="text-xs italic">Eloquence is thinking...</span>
                  </div>
                )}

                {(transcript || interimTranscript) && (
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                    <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 rounded-tr-none">
                      <p className="text-sm italic">
                        {transcript}
                        <span className="text-accent/50">{interimTranscript}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Voice Input Section */}
              <div className="p-8 border-t border-white/5 bg-black/20 flex flex-col items-center gap-4">
                <VoiceVisualizer isRecording={isRecording} />
                
                <Button 
                  onClick={toggleRecording}
                  disabled={isProcessing}
                  className={cn(
                    "w-20 h-20 rounded-full transition-all duration-500 shadow-2xl",
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 scale-110" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>
                
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  {isRecording ? "Listening to your brilliance..." : "Click to start speaking"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Essay Preview Side */}
        <div className="flex flex-col h-full">
          <Card className="flex-1 glass border-white/5 overflow-hidden flex flex-col">
            <CardHeader className="border-b border-white/5 px-6 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Live Document
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Autosaving</span>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {essayContent ? (
                <div className="p-10 prose prose-invert prose-purple max-w-none prose-p:text-sm prose-h1:text-2xl prose-h2:text-xl">
                  {/* We would use a markdown renderer here */}
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {essayContent}
                  </div>
                  {currentStep === 'writing' && isRecording && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="inline-block w-1 h-5 bg-primary ml-1 translate-y-1"
                    />
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Ready to create?</h3>
                  <p className="text-sm max-w-xs mx-auto">
                    Start our conversation on the left, and your document will begin to take shape here in real-time.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
