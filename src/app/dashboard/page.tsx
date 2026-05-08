"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Mic, 
  History, 
  TrendingUp, 
  Plus,
  MoreVertical,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const recentEssays = [
  { id: 1, title: "The Ethics of Artificial Intelligence", date: "2 hours ago", status: "Draft" },
  { id: 2, title: "Modern Architecture & Sustainability", date: "Yesterday", status: "Completed" },
  { id: 3, title: "The Future of Remote Work", date: "3 days ago", status: "Draft" },
];

const stats = [
  { label: "Total Essays", value: "12", icon: FileText, color: "text-blue-400" },
  { label: "Voice Sessions", value: "48", icon: Mic, color: "text-purple-400" },
  { label: "AI Suggestions", value: "1.2k", icon: Sparkles, color: "text-gold" },
  { label: "Hours Saved", value: "24h", icon: Clock, color: "text-green-400" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, <span className="text-glow text-primary">{user?.displayName?.split(' ')[0] || "Scholar"}</span></h1>
          <p className="text-muted-foreground">Ready to speak your next masterpiece into existence?</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-12 shadow-lg group">
          <Plus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform" /> New Voice Essay
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass border-white/5 hover:border-primary/20 transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Essays */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Essays</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View all</Button>
          </div>
          
          <div className="space-y-4">
            {recentEssays.map((essay, i) => (
              <motion.div
                key={essay.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="group p-4 rounded-2xl glass border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{essay.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{essay.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                      <span className={essay.status === 'Completed' ? 'text-green-400' : 'text-primary'}>{essay.status}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upgrade Card / Tip */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">AI Assistant</h2>
          <Card className="glass border-primary/20 bg-primary/5 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" /> Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                &quot;Try telling me about your audience before we start writing. It helps me tailor the tone and complexity of your essay perfectly.&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/20 p-1">
                  <img src="/avatar.png" alt="AI" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-xs">
                  <p className="font-bold">Eloquence AI</p>
                  <p className="text-muted-foreground">Premium Assistant</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-gold/20 bg-gold/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Usage Stats</h3>
                  <p className="text-xs text-muted-foreground">75% of monthly limit used</p>
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gold w-3/4"></div>
              </div>
              <Button size="sm" className="w-full rounded-full bg-gold text-black hover:bg-gold/90 font-bold">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
