"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for students just starting out.",
    features: [
      "3 AI Voice Essays per month",
      "Standard AI model",
      "Web-based editor",
      "Export as TXT"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    description: "For serious writers and researchers.",
    features: [
      "Unlimited AI Voice Essays",
      "Advanced GPT-4 Models",
      "Document Analysis (PDF/Docx)",
      "Premium AI Voices",
      "Priority Support",
      "Export as PDF/DOCX"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$49",
    description: "For agencies and large teams.",
    features: [
      "Everything in Pro",
      "Custom AI Personalities",
      "API Access",
      "Team Collaboration",
      "Bulk Document Uploads",
      "SSO & Advanced Security"
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, <span className="text-primary">Transparent</span> Pricing</h2>
          <p className="text-muted-foreground">Choose the plan that fits your writing needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl glass border-white/5 flex flex-col ${
                tier.popular ? 'border-primary/50 shadow-[0_0_40px_rgba(126,34,206,0.1)] scale-105 z-10' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{tier.description}</p>
              </div>
              
              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={tier.popular ? "default" : "outline"} 
                className={`w-full rounded-full h-12 font-bold ${
                  tier.popular ? 'bg-primary hover:bg-primary/90' : 'hover:bg-white/5'
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
