"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Laptop,
  Hand,
  Check,
  X,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

const securityCards = [
  {
    icon: Laptop,
    title: "Your Data Stays Local",
    description:
      "Employee records are stored in a database on your computer. No cloud sync, no server uploads, no third-party access. Uninstall the app and your data goes with it.",
    color: "sage",
  },
  {
    icon: Shield,
    title: "Catches the Dangerous Stuff",
    description:
      "Before any message reaches AI, we scan for high-risk data—Social Security numbers, credit card numbers, and bank account details. If we find something, you'll know before it's sent.",
    details: [
      "Social Security Numbers",
      "Credit card numbers",
      "Bank account/routing numbers",
      "Dates of birth (in context)",
    ],
    color: "sage",
  },
  {
    icon: Hand,
    title: "Warning Before Sending",
    description:
      "When sensitive data is detected, a warning appears. You can edit your message to remove it, or proceed if you're sure. Nothing goes to AI without your okay.",
    color: "amber",
  },
];

const comparisonItems = [
  {
    chatgpt: "No filter—everything goes straight to AI",
    hrcc: "High-risk data scanned before sending",
  },
  {
    chatgpt: "Data stored on external servers",
    hrcc: "Data stored locally on your machine",
  },
  {
    chatgpt: "Easy to accidentally paste SSNs, bank info",
    hrcc: "Warning prompts catch SSNs and financial data",
  },
  {
    chatgpt: "No record of what was shared",
    hrcc: "You see exactly what's being sent",
  },
];

export function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <section
      id="security"
      ref={ref}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-sage-50/50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="section-badge mx-auto mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Security & Privacy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
            A Safer Way to Use AI{" "}
            <span className="text-gradient">with HR Data</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            HR Command Center adds a protective layer between your employee data
            and AI—something you don't get when pasting spreadsheets into
            ChatGPT.
          </p>
        </motion.div>

        {/* Three Security Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {securityCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border ${
                card.color === "amber"
                  ? "bg-amber-50/50 border-amber-200"
                  : "bg-sage-50/50 border-sage-200"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  card.color === "amber"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-sage-100 text-sage-600"
                }`}
              >
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-800 mb-3">
                {card.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                {card.description}
              </p>
              {card.details && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                    What we detect:
                  </p>
                  <ul className="space-y-1">
                    {card.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-stone-600"
                      >
                        <Check className="w-3.5 h-3.5 text-sage-500 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comparison Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-50 rounded-2xl border border-stone-200 p-8 mb-12"
        >
          <h3 className="font-display text-xl font-bold text-stone-800 mb-6 text-center">
            Why This Matters
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ChatGPT Column */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
                  <X className="w-4 h-4 text-stone-500" />
                </div>
                <span className="font-medium text-stone-500">
                  Pasting into ChatGPT
                </span>
              </div>
              <ul className="space-y-3">
                {comparisonItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-stone-600">
                      {item.chatgpt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HR Command Center Column */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-sage-200">
                <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-sage-600" />
                </div>
                <span className="font-medium text-sage-700">
                  HR Command Center
                </span>
              </div>
              <ul className="space-y-3">
                {comparisonItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-sage-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-stone-700">{item.hrcc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Honest Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <button
            onClick={() => setShowDisclosure(!showDisclosure)}
            className="w-full flex items-center justify-between p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-left group"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span className="font-medium text-stone-700">
                What We Don't Claim
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
                showDisclosure ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {showDisclosure && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white border border-t-0 border-amber-200 rounded-b-xl">
                  <p className="text-sm text-stone-600 leading-relaxed mb-3">
                    HR Command Center helps catch the most dangerous data before
                    it reaches AI, but it's not a complete filter. When you ask
                    questions about specific employees, relevant details (like
                    names, departments, or performance data) are included in the
                    AI request—that's how the platform works.
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Our goal is to prevent accidental exposure of high-risk
                    information (SSNs, financial data) and keep your employee
                    database off cloud servers. For truly sensitive operations,
                    always review what you're asking before you send.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-stone-600 max-w-2xl mx-auto">
            Built for cautious HR professionals. We know you handle sensitive
            data. HR Command Center doesn't make that responsibility
            disappear—it gives you better tools to manage it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
