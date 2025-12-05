"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  Sparkles,
  Bell,
  Key,
  HardDrive,
  Calendar,
} from "lucide-react";
import { WaitlistModal } from "./WaitlistModal";

const features = [
  "Full HR Command Center software",
  "All 25 AI skills included",
  "Unlimited employees",
  "Works with Anthropic, OpenAI, or Gemini",
  "Easy setup guide included",
  "Lifetime updates",
  "Your data stays on your machine",
  "No recurring fees ever",
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
      <section
      id="pricing"
      ref={ref}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-warm-50/50 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-sage-50/50 to-transparent -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-badge mx-auto mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
            One Price. No Surprises.{" "}
            <span className="text-gradient">Yours Forever.</span>
          </h2>
          <p className="text-lg text-stone-600">
            Pay once, own it forever. No subscriptions. No per-seat fees.
            No enterprise upsells. No gotchas.
          </p>
        </motion.div>

        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-white rounded-2xl border-2 border-warm-200 p-8 lg:p-12 shadow-warm-lg max-w-2xl mx-auto mb-16"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-warm-600" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Launching Early 2026
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-800 mb-2">
              HR Command Center
            </h3>
            <p className="text-stone-500">
              Join the waitlist to be first in line when we launch.
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-8 pb-8 border-b border-stone-200">
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-display text-6xl font-bold text-stone-800">
                $99
              </span>
              <span className="text-stone-500 text-lg">one-time</span>
            </div>
            <p className="text-sm text-stone-500 mt-3">
              + your AI provider costs (typically $2-8/month)
            </p>
          </div>

          {/* Features */}
          <ul className="grid sm:grid-cols-2 gap-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5" />
                <span className="text-stone-600">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setIsWaitlistOpen(true)}
            className="block w-full text-center py-4 rounded-full font-medium bg-warm-500 hover:bg-warm-600 text-white shadow-warm transition-colors text-lg cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <Bell className="w-5 h-5" />
              Join the Waitlist
            </span>
          </button>

          {/* Notes */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl">
              <Key className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-500">
                Works with <span className="text-stone-700">Anthropic</span>,{" "}
                <span className="text-stone-700">OpenAI</span>, or{" "}
                <span className="text-stone-700">Gemini</span>. Setup guide included.
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl">
              <HardDrive className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-500">
                Runs entirely on your computer. Your data never touches our servers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-stone-400 text-sm mt-12"
        >
          Questions?{" "}
          <a href="mailto:hello@hrcommandcenter.com" className="text-warm-600 hover:underline">
            Email us
          </a>{" "}
          — we respond in minutes, not days.
        </motion.p>
      </div>
    </section>
    </>
  );
}
