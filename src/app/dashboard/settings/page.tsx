"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Bot, 
  Volume2, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe,
  Settings,
  CreditCard,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-3xl font-bold mb-2">Workspace <span className="text-primary">Settings</span></h1>
        <p className="text-muted-foreground">Customize your AI assistant and writing environment.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary rounded-xl">
            <User className="w-4 h-4" /> Account
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5 rounded-xl">
            <Bot className="w-4 h-4" /> AI Personality
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5 rounded-xl">
            <Volume2 className="w-4 h-4" /> Voice & Audio
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5 rounded-xl">
            <CreditCard className="w-4 h-4" /> Subscription
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-white/5 rounded-xl">
            <Shield className="w-4 h-4" /> Privacy & Security
          </Button>
        </aside>

        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Manage your public information and email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src="/avatar.png" alt="Profile" className="relative w-20 h-20 rounded-full object-cover border-2 border-primary/20" />
                  <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary shadow-lg">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h4 className="font-bold">Evelyn Harper</h4>
                  <p className="text-sm text-muted-foreground">evelyn@example.com</p>
                  <Button variant="outline" size="sm" className="mt-2 rounded-full border-white/10 glass text-[10px] uppercase font-bold">Change Avatar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle>AI Preferences</CardTitle>
              <CardDescription>Tailor the AI's personality and writing style.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <Label>Assistant Voice</Label>
                <Select defaultValue="serena">
                  <SelectTrigger className="glass border-white/10 rounded-xl">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/10">
                    <SelectItem value="serena">Serena (Elegant & Warm)</SelectItem>
                    <SelectItem value="aurea">Aurea (Sophisticated & Calm)</SelectItem>
                    <SelectItem value="nova">Nova (Energetic & Sharp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Creativity Level</Label>
                  <span className="text-[10px] font-bold text-primary">Balanced</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Adaptive Learning</Label>
                    <p className="text-[10px] text-muted-foreground leading-tight">Allow AI to learn from your previous essays.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Real-time Grammar Check</Label>
                    <p className="text-[10px] text-muted-foreground leading-tight">Fix typos as you speak.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" className="rounded-full">Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg font-bold">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
