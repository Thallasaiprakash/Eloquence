"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X,
  FileSearch,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  interface AnalysisResult {
    title: string;
    type: string;
    keyPoints: string[];
    toneSuggestion: string;
  }
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setAnalysisResult({
          title: files[0].name,
          type: "Assignment Brief",
          keyPoints: [
            "Minimum 2000 words required",
            "Focus on ethical frameworks in AI",
            "Must cite at least 5 academic sources",
            "APA 7th edition formatting"
          ],
          toneSuggestion: "Academic, critical, and analytical"
        });
      }
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold mb-2">Upload <span className="text-primary">Context</span></h1>
        <p className="text-muted-foreground">Upload assignment sheets, rubrics, or existing drafts to help Eloquence understand your goals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="glass border-dashed border-white/20 bg-primary/5 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <FileUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Drop your files here</h3>
              <p className="text-sm text-muted-foreground mb-6">Support for PDF, DOCX, and TXT files (Max 20MB)</p>
              <Button variant="outline" className="rounded-full border-white/10 glass hover:bg-white/5">
                Browse Files
              </Button>
            </CardContent>
          </Card>

          {files.length > 0 && !analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Selected Files</h4>
                <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-destructive">Clear All</Button>
              </div>
              <div className="space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl glass border-white/5 bg-white/5">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {isUploading ? (
                      <div className="w-32">
                        <Progress value={uploadProgress} className="h-1" />
                      </div>
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} />
                    )}
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg font-bold"
              >
                {isUploading ? "Processing..." : "Analyze Documents"}
              </Button>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {analysisResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full"
              >
                <Card className="glass border-primary/20 bg-primary/5 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <FileSearch className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">AI Analysis Complete</h3>
                        <p className="text-xs text-muted-foreground">We&apos;ve extracted the core instructions</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3">Extracted Requirements</p>
                        <div className="space-y-2">
                          {analysisResult.keyPoints.map((point: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gold/10 border border-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-gold" />
                          <p className="text-xs font-bold text-gold">Suggested Tone</p>
                        </div>
                        <p className="text-sm font-medium">{analysisResult.toneSuggestion}</p>
                      </div>

                      <Button className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg group">
                        Start Writing Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-10 text-center opacity-30">
                <AlertCircle className="w-12 h-12 mb-4" />
                <p className="text-sm font-medium">Analysis results will appear here after upload.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
