"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Sparkles,
  FileText,
  BarChart3,
  Users,
  Send,
  Bell,
} from "lucide-react";
import { WaitlistModal } from "./WaitlistModal";

const stats = [
  { value: "25", label: "AI Skills", suffix: "" },
  { value: "$99", label: "One-Time Cost", suffix: "" },
  { value: "0", label: "Learning Curve", suffix: "" },
];

const chatMessages = [
  {
    type: "user",
    text: "Show me engineering attrition trends this quarter",
    delay: 0,
  },
  {
    type: "ai",
    text: "Engineering attrition is 15% this quarter, up from 12% last quarter. I've prepared a trend analysis showing key drivers...",
    delay: 1.2,
    panel: "analytics",
  },
  {
    type: "user",
    text: "Create a PIP for Marcus Chen who missed quota 3 months",
    delay: 4,
  },
  {
    type: "ai",
    text: "I've drafted a Performance Improvement Plan for Marcus Chen with specific goals and a 60-day timeline. Edit it in the panel or export to Google Docs.",
    delay: 5.2,
    panel: "document",
  },
];

const panelTypes = {
  analytics: {
    icon: BarChart3,
    label: "Analytics",
    color: "text-blue-500",
    border: "border-t-blue-500",
  },
  document: {
    icon: FileText,
    label: "Document Editor",
    color: "text-warm-500",
    border: "border-t-warm-500",
  },
  performance: {
    icon: Users,
    label: "Performance Grid",
    color: "text-sage-500",
    border: "border-t-sage-500",
  },
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-warm-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-warm-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-warm-400 typing-dot" />
    </div>
  );
}

function ChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const runChatSequence = () => {
      setVisibleMessages([]);
      setActivePanel(null);
      setIsTyping(false);

      chatMessages.forEach((msg, index) => {
        // Show typing indicator before AI messages
        if (msg.type === "ai") {
          setTimeout(() => {
            setIsTyping(true);
          }, msg.delay * 1000 - 800);
        }

        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, index]);
          if (msg.panel) {
            setTimeout(() => setActivePanel(msg.panel!), 300);
          }
        }, msg.delay * 1000);
      });
    };

    runChatSequence();
    const interval = setInterval(() => {
      setCycleCount((c) => c + 1);
      runChatSequence();
    }, 12000);

    return () => clearInterval(interval);
  }, [cycleCount]);

  const currentPanel = activePanel ? panelTypes[activePanel as keyof typeof panelTypes] : null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main chat window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-elevated border border-stone-200 overflow-hidden"
      >
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 bg-stone-50/50">
          <div className="w-8 h-8 rounded-full gradient-warm flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-800">HR Command Center</p>
            <p className="text-xs text-stone-500">25 skills ready</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" />
            <span className="text-xs text-stone-500">Online</span>
          </div>
        </div>

        {/* Chat messages */}
        <div className="p-4 space-y-3 min-h-[200px] max-h-[240px] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {chatMessages.map((msg, index) =>
              visibleMessages.includes(index) ? (
                <motion.div
                  key={`${cycleCount}-${index}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm ${
                      msg.type === "user"
                        ? "chat-bubble-user"
                        : "chat-bubble-ai"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="chat-bubble-ai inline-block"
            >
              <TypingIndicator />
            </motion.div>
          )}
        </div>

        {/* Chat input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 rounded-full border border-stone-200">
            <MessageCircle className="w-4 h-4 text-stone-400" />
            <span className="text-sm text-stone-400 flex-1">Ask anything about your workforce...</span>
            <div className="w-8 h-8 rounded-full bg-warm-500 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Context panel preview */}
      <AnimatePresence>
        {currentPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`absolute -right-4 top-12 w-48 bg-white rounded-xl shadow-elevated border border-stone-200 overflow-hidden ${currentPanel.border} border-t-[3px]`}
          >
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <currentPanel.icon className={`w-4 h-4 ${currentPanel.color}`} />
                <span className="text-xs font-medium text-stone-700">{currentPanel.label}</span>
              </div>
              {activePanel === "analytics" && (
                <div className="space-y-1">
                  <div className="flex items-end gap-1 h-12">
                    {[40, 55, 48, 65, 72, 68, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex-1 bg-blue-400 rounded-t"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-500">Q1-Q4 Trend</p>
                </div>
              )}
              {activePanel === "document" && (
                <div className="space-y-1.5">
                  <div className="h-2 bg-stone-100 rounded w-full" />
                  <div className="h-2 bg-stone-100 rounded w-4/5" />
                  <div className="h-2 bg-warm-100 rounded w-3/5" />
                  <div className="h-2 bg-stone-100 rounded w-full" />
                  <p className="text-[10px] text-stone-500 mt-2">PIP_Marcus_Chen.docx</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-warm-200/30 rounded-full blur-2xl -z-10" />
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-sage-200/30 rounded-full blur-2xl -z-10" />
    </div>
  );
}

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    <section ref={ref} className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 gradient-hero">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-warm-200/20 blob blob-animate -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/15 blob blob-animate -z-10" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-warm-100/20 to-transparent rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-badge mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chat-First HR Automation</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.1] mb-6"
            >
              The HR Platform That{" "}
              <span className="text-gradient">Lets You Just Ask</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 text-lg lg:text-xl mb-8 leading-relaxed"
            >
              Skip the clicks. Just chat. HR Command Center replaces endless menus with
              natural, AI-powered conversation
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                type="button"
                onClick={() => setIsWaitlistOpen(true)}
                className="btn-primary text-base px-8 py-4"
              >
                Join Waitlist
                <Bell className="w-4 h-4" />
              </button>
              <Link href="#how-it-works" className="btn-secondary text-base px-8 py-4">
                See It In Action
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-8 lg:gap-12 pt-8 border-t border-stone-200"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-bold text-gradient font-display">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="text-stone-500 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Animated Chat Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative lg:pl-8"
          >
            <ChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
