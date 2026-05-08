"use client";

import { Mic, Twitter, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-glow">Eloquence</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming the way the world writes through the power of voice and advanced artificial intelligence.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass border-white/5 flex items-center justify-center hover:border-primary/50 transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass border-white/5 flex items-center justify-center hover:border-primary/50 transition-all">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass border-white/5 flex items-center justify-center hover:border-primary/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full glass border-white/5 flex items-center justify-center hover:border-primary/50 transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-muted-foreground gap-4">
          <p>© 2026 Eloquence AI. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-primary transition-colors">English (US)</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
