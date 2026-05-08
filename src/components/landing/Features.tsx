"use client";

import { motion } from "framer-motion";
import { Mic, Zap, PenTool, Layout, FileUp, Sparkles, MessageSquare, Shield, Globe, Clock, Accessibility, RefreshCw } from "lucide-react";

const features = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Voice-First Generation",
    description: "Generate complete essays simply by talking. Our AI understands context, nuances, and intent."
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Conversations",
    description: "Talk with an intelligent assistant that asks follow-up questions to refine your arguments."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Smart Structuring",
    description: "Automatically organize your spoken thoughts into coherent academic or professional structures."
  },
  {
    icon: <FileUp className="w-6 h-6" />,
    title: "Document Analysis",
    description: "Upload rubrics, assignment sheets, or drafts. Eloquence learns your requirements instantly."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Tone & Style Control",
    description: "Switch between academic, professional, or creative tones with a single voice command."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Autosave",
    description: "Never lose a word. Every thought is synced to the cloud in real-time as you speak."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Empowering your <span className="text-primary">Voice</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need to transform your spoken ideas into high-impact written content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl glass border-white/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
