"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Can it connect to our existing HR data?",
    answer: "We don't integrate with other HR tools—you control what goes in. Import your data via CSV/Excel, and the platform captures what it can for analysis. Good data in, good insights out.",
  },
  {
    question: "Do you have access to my employee data?",
    answer: "No. Your database is stored locally on your computer. We never see it, and it never leaves your machine.",
  },
  {
    question: "Does employee data go to AI?",
    answer: "When you ask about specific employees, relevant details are sent to AI to answer your question. High-risk data (SSNs, credit cards, bank info) triggers a warning first so you can review before sending.",
  },
  {
    question: "What happens if I accidentally include an SSN?",
    answer: "You'll see a warning before anything is sent. You can edit the message to remove it, or choose to proceed if you're sure. Nothing goes to AI without your okay.",
  },
  {
    question: "Is this more secure than ChatGPT?",
    answer: "It's a safer workflow. Your database stays local on your machine, and you get warnings before sending high-risk data like SSNs or financial info. ChatGPT has neither of these protections.",
  },
  {
    question: "What if the AI gives a wrong answer?",
    answer: "The AI is guided by 25 specialized HR prompts and connected to your real data—not generic internet knowledge. All generated documents can be reviewed and edited before you use them. You're always in control.",
  },
  {
    question: "How much does it cost?",
    answer: "$99 one-time. That's it. Bring your own API key from Anthropic, OpenAI, or Google (typically $2-8/month in usage). No subscriptions, no per-seat fees, no enterprise upsells.",
  },
  {
    question: "What makes this different from ChatGPT?",
    answer: "ChatGPT is a general-purpose AI with no access to your workforce data. HR Command Center has 25 specialized HR skills, connects directly to your employee data, keeps your database local, and warns you before sensitive data is sent. It's purpose-built for HR.",
  },
  {
    question: "How long does implementation take?",
    answer: "Most teams are up and running in a single day. Add your API key, import your employee data, and start chatting. No complex implementation, no months-long rollout.",
  },
  {
    question: "Can I try it before committing?",
    answer: "Yes. Schedule a demo call and we'll walk you through the platform with your actual use cases. You'll meet with the founder—an HR consultant who built this for practitioners like you.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-stone-200 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-warm-500 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-medium text-stone-800 group-hover:text-warm-700 transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-10 text-stone-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-24 lg:py-32 bg-stone-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
            Questions?{" "}
            <span className="text-gradient">We've Got Answers.</span>
          </h2>
          <p className="text-lg text-stone-600">
            Everything you need to know about HR Command Center.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-stone-200 shadow-soft px-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-stone-600 mb-4">Still have questions?</p>
          <a
            href="mailto:hello@hrcommandcenter.com"
            className="btn-secondary inline-flex"
          >
            <MessageCircle className="w-4 h-4" />
            Talk to Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
