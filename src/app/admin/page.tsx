"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  ShieldAlert,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  { name: "John Doe", email: "john@example.com", plan: "Pro", status: "Active", spent: "$190" },
  { name: "Sarah Smith", email: "sarah@gmail.com", plan: "Free", status: "Active", spent: "$0" },
  { name: "Mike Ross", email: "mike@ross.com", plan: "Premium", status: "Active", spent: "$490" },
  { name: "Emma Watson", email: "emma@w.com", plan: "Pro", status: "Paused", spent: "$38" },
];

export default function AdminPanel() {
  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin <span className="text-primary">Control</span></h1>
          <p className="text-muted-foreground">Platform performance and user management.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-white/5 border border-white/10 rounded-full px-10 py-2 text-sm outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <Button size="icon" variant="ghost" className="rounded-full border border-white/5 glass">
            <ShieldAlert className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$12,450", trend: "+12%", up: true, icon: DollarSign },
          { label: "Active Users", value: "1,204", trend: "+5%", up: true, icon: Users },
          { label: "Avg. Token Use", value: "45k", trend: "-2%", up: false, icon: Activity },
          { label: "Churn Rate", value: "2.4%", trend: "-0.5%", up: true, icon: BarChart3 },
        ].map((stat, i) => (
          <Card key={i} className="glass border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Management Table */}
      <Card className="glass border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-lg">Recent Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total Spent</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.plan === 'Premium' ? 'bg-gold/20 text-gold' : 
                        user.plan === 'Pro' ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium">{user.spent}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
