"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Share2, 
  Type, 
  Settings2,
  Maximize2,
  Languages,
  Zap,
  MoreHorizontal,
  ChevronDown,
  Bot,
  FileText,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function EditEssayPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState("# The Impact of AI on Modern Architecture\n\nArtificial Intelligence is not just a tool; it's a new lens through which we view structural design. From generative algorithms that optimize structural integrity to AI-driven aesthetic explorations, the field of architecture is undergoing a profound transformation.\n\n## Generative Design and Sustainability\n\nOne of the most promising applications of AI in architecture is generative design. By inputting environmental parameters such as solar exposure, wind patterns, and material availability, AI can generate thousands of design iterations that prioritize sustainability...");
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleAIRewrite = () => {
    setIsAISuggesting(true);
    setTimeout(() => {
      setContent(content + "\n\nFurthermore, AI facilitates the integration of smart building systems that adapt to occupant behavior, further reducing energy waste.");
      setIsAISuggesting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen -m-12 bg-[#020617] overflow-hidden">
      {/* Editor Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div>
            <h1 className="text-sm font-bold truncate max-w-[200px]">The Impact of AI on Modern Architecture</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Draft · Saved 2m ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-xs rounded-full glass border-white/5 gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full gap-2 px-4 shadow-lg">
                <Download className="w-4 h-4" /> Export <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass border-white/10">
              <DropdownMenuItem className="gap-2"><FileText className="w-4 h-4" /> Export as PDF</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><FileText className="w-4 h-4" /> Export as DOCX</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><FileText className="w-4 h-4" /> Export as Markdown</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar Left */}
        <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-black/20">
          <Button variant="ghost" size="icon" className="rounded-xl text-primary bg-primary/10">
            <Type className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5">
            <Sparkles className="w-5 h-5 text-gold" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5">
            <Languages className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5">
            <Settings2 className="w-5 h-5" />
          </Button>
          <div className="mt-auto">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5">
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* AI Action Bar */}
          <div className="h-12 border-b border-white/5 bg-primary/5 flex items-center px-6 gap-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2">
              <Zap className="w-3 h-3 fill-current" /> AI Writing Tools:
            </span>
            <div className="flex items-center gap-2">
              <Button onClick={handleAIRewrite} variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/20 hover:text-primary transition-all">Rewrite</Button>
              <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/20 hover:text-primary transition-all">Expand</Button>
              <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/20 hover:text-primary transition-all">Summarize</Button>
              <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/20 hover:text-primary transition-all">Fix Grammar</Button>
              <Button variant="ghost" size="sm" className="text-xs h-8 hover:bg-primary/20 hover:text-primary transition-all">Change Tone</Button>
            </div>
            {isAISuggesting && (
              <div className="ml-auto flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-gold animate-spin" />
                <span className="text-[10px] font-bold text-gold italic">Eloquence is crafting...</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-12 md:p-20 flex justify-center">
            <div className="max-w-3xl w-full">
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full bg-transparent outline-none resize-none text-lg leading-relaxed font-serif text-slate-200 placeholder:text-slate-700"
                placeholder="Start writing or let AI help you..."
              />
            </div>
          </div>

          {/* Editor Footer */}
          <div className="h-10 border-t border-white/5 bg-black/40 flex items-center justify-between px-6 text-[10px] font-medium text-muted-foreground">
            <div className="flex items-center gap-6">
              <span>{content.split(/\s+/).filter(Boolean).length} words</span>
              <span>{content.length} characters</span>
              <span>{Math.ceil(content.split(/\s+/).length / 200)} min read</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Cloud Synced</span>
              <span className="flex items-center gap-1 uppercase tracking-widest font-bold text-primary">English (US)</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Chat / Stats */}
        <div className="w-80 border-l border-white/5 flex flex-col bg-black/20">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b border-white/5 rounded-none p-0">
              <TabsTrigger value="chat" className="flex-1 rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-none">AI Chat</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1 rounded-none data-[state=active]:bg-white/5 data-[state=active]:border-b-2 data-[state=active]:border-primary transition-none">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 m-0 p-6 flex flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs leading-relaxed">
                    How can I help you refine this section? I can suggest more academic vocabulary for the sustainability part.
                  </div>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask Eloquence..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs outline-none focus:border-primary/50 transition-all pr-12"
                />
                <Button size="icon" className="absolute right-1 top-1 w-8 h-8 rounded-xl bg-primary hover:bg-primary/90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="flex-1 m-0 p-6 space-y-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Readability</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-2">
                      <span>Flesch Kincaid Grade</span>
                      <span className="text-primary font-bold">12.4 (College)</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Sentiment Analysis</h4>
                <div className="p-4 rounded-2xl glass border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Analytical & Optimistic</p>
                    <p className="text-[10px] text-muted-foreground">The tone is well-balanced for an academic essay.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

