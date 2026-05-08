"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, 
  Share2, 
  Download, 
  Sparkles, 
  History,
  Bot,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function EditorView({ id }: { id: string }) {
  const [content, setContent] = useState("# The Impact of AI on Modern Architecture\n\nArtificial Intelligence is not just a tool; it's a new lens through which we view structural design. From generative algorithms that optimize structural integrity to AI-driven aesthetic explorations, the field of architecture is undergoing a profound transformation.\n\n## Generative Design and Sustainability\n\nOne of the most promising applications of AI in architecture is generative design. By inputting environmental parameters such as solar exposure, wind patterns, and material availability, AI can generate thousands of design iterations that prioritize sustainability...");
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleAISuggest = () => {
    setIsAISuggesting(true);
    setTimeout(() => {
      setIsAISuggesting(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Editor Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <Bot className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">The Impact of AI on Modern Architecture</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] uppercase">Draft</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <History className="w-3 h-3" /> Last edited 2 mins ago
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full glass border-white/5 gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button variant="outline" className="rounded-full glass border-white/5 gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg gap-2">
            <Save className="w-4 h-4" /> Save Final
          </Button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* AI Insights Sidebar */}
        <div className="hidden lg:flex flex-col gap-6 h-full">
          <Card className="glass border-white/5 flex-1 flex flex-col">
            <CardHeader className="border-b border-white/5 bg-primary/5">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" /> AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Content Score</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">84<span className="text-sm text-muted-foreground">/100</span></span>
                  <Zap className="w-5 h-5 text-gold" />
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%]"></div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Suggestions</p>
                <div className="space-y-2">
                  {[
                    "Expand on generative design",
                    "Add more academic citations",
                    "Strengthen the conclusion"
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-xs group-hover:text-primary transition-colors">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5">
                <Button 
                  onClick={handleAISuggest}
                  disabled={isAISuggesting}
                  className="w-full rounded-xl bg-gold text-black hover:bg-gold/90 font-bold text-xs gap-2"
                >
                  {isAISuggesting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                  Ask AI for Improvements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Editor */}
        <Card className="lg:col-span-3 glass border-white/5 flex flex-col overflow-hidden">
          <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between px-6 py-4 bg-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">Eloquence Editor</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Words: {content.split(' ').length}</span>
                <span>Reading Time: 3m</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1.5"></div>
              Synced
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative">
            <ScrollArea className="h-full p-10">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[600px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-none font-serif placeholder:text-muted-foreground/30"
                placeholder="Start writing your masterpiece..."
              />
              <AnimatePresence>
                {isAISuggesting && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 p-4 rounded-2xl glass border-primary/30 shadow-2xl flex items-center gap-4 z-50 min-w-[300px]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">AI is analyzing...</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Enhancing your writing</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
