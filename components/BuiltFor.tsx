"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Users,
  Heart,
  Store,
  Briefcase,
  Coffee,
  ArrowRight,
} from "lucide-react";

const personas = [
  {
    icon: Rocket,
    title: "The Founder Without HR",
    subtitle: "You built the product. Now you're building the team.",
    description:
      "You want to do right by your people, but between product, fundraising, and customers, learning HR compliance feels impossible. You shouldn't need an HR degree to treat employees well.",
    color: "warm",
  },
  {
    icon: Users,
    title: "The Accidental People Person",
    subtitle: "You were hired to recruit. Now you're running HR.",
    description:
      "The company grew faster than expected, and suddenly you're the 'people team.' Benefits questions, policy docs, performance reviews—you're figuring it out as you go. You need backup.",
    color: "blue",
  },
  {
    icon: Heart,
    title: "The Solo HR Hero",
    subtitle: "One person. 200 employees. Zero budget for help.",
    description:
      "You're buried in admin work while strategic projects collect dust. Every 'quick question' derails your day. You're not looking for more headcount—you're looking for leverage.",
    color: "sage",
  },
  {
    icon: Store,
    title: "The Small Business Owner",
    subtitle: "You run a bookstore, not a bureaucracy.",
    description:
      "You have 12 employees and no idea if your handbook is compliant. HR software costs more than your rent. You just want simple answers to simple questions without the enterprise price tag.",
    color: "orange",
  },
  {
    icon: Coffee,
    title: "The Growing Restaurant Group",
    subtitle: "Three locations. 45 staff. Constant turnover.",
    description:
      "Managing schedules, handling tips correctly, staying compliant across locations—hospitality HR is its own beast. You need something that gets your industry, not generic corporate advice.",
    color: "warm",
  },
  {
    icon: Briefcase,
    title: "The Non-Technical HR Pro",
    subtitle: "You're great with people. Not with software.",
    description:
      "Every HR tool seems designed for IT departments. Dashboards, integrations, configurations—you just want to ask a question and get an answer. In plain English. Is that too much to ask?",
    color: "blue",
  },
];

const colorClasses = {
  warm: {
    iconBg: "bg-warm-100",
    iconText: "text-warm-600",
    accent: "bg-warm-500",
  },
  blue: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    accent: "bg-blue-500",
  },
  sage: {
    iconBg: "bg-sage-100",
    iconText: "text-sage-600",
    accent: "bg-sage-500",
  },
  orange: {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    accent: "bg-orange-500",
  },
};

export function BuiltFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="built-for" className="py-24 lg:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-100 text-warm-700 text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            Built for real people
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6"
          >
            We see you.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-lg lg:text-xl max-w-3xl mx-auto"
          >
            HR Command Center wasn't built for Fortune 500 HR teams with
            unlimited budgets. It was built for the practitioners doing the actual work—the ones who need the tools but don't always have the budget.
          </motion.p>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, index) => {
            const colors = colorClasses[persona.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                {/* Accent bar */}
                <div
                  className={`absolute top-0 left-6 right-6 h-1 ${colors.accent} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center mb-5`}
                >
                  <persona.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-stone-800 mb-2">
                  {persona.title}
                </h3>
                <p className="text-warm-600 font-medium text-sm mb-4">
                  {persona.subtitle}
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {persona.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-stone-600 text-lg mb-6">
            Sound familiar? You're exactly who we built this for.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-base"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
