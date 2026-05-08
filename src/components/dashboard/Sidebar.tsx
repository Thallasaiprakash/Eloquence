"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Mic, 
  FileUp, 
  History, 
  Settings, 
  CreditCard, 
  LogOut,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusCircle, label: "New Essay", href: "/dashboard/new" },
  { icon: Mic, label: "Voice Writing", href: "/dashboard/voice" },
  { icon: FileUp, label: "Upload Documents", href: "/dashboard/upload" },
  { icon: History, label: "AI History", href: "/dashboard/history" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen glass border-r border-white/5 flex flex-col p-6 fixed left-0 top-0 z-40">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Mic className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-glow">Eloquence</span>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <nav className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-2">Main Menu</p>
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-primary/20 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-2">Account</p>
          {secondaryItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-primary/20 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 p-2">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
          </div>
          <p className="text-xs font-bold mb-1">Upgrade to Pro</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Get unlimited voice essays and premium AI voices.</p>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-3"
          onClick={() => logout()}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
}
