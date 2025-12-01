"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Brain,
  PanelRight,
  ArrowRight,
  Sparkles,
  CheckCircle,
  FileText,
  Play,
  UserPlus,
  TrendingUp,
  Heart,
  LogOut,
  DollarSign,
  PieChart,
  Shield,
  Briefcase,
} from "lucide-react";

// 25 AI Skills organized by category
const skillCategories = [
  {
    name: "Hiring",
    icon: UserPlus,
    color: "warm",
    skills: ["Job Descriptions", "Interview Guides", "Headcount Planning", "Offer Letters"],
  },
  {
    name: "Performance",
    icon: TrendingUp,
    color: "blue",
    skills: ["PIPs", "1:1 Guides", "Manager Coaching", "Recognition", "Career Pathing", "Review Cycles", "Goal Setting", "Feedback"],
  },
  {
    name: "Employee Relations",
    icon: Heart,
    color: "sage",
    skills: ["ER Case Management", "Benefits Coordination", "Policy Lifecycle"],
  },
  {
    name: "Offboarding",
    icon: LogOut,
    color: "stone",
    skills: ["Exit Processes", "Workforce Reduction", "Communications"],
  },
  {
    name: "Compensation",
    icon: DollarSign,
    color: "orange",
    skills: ["Salary Bands", "Merit Cycles"],
  },
  {
    name: "Analytics",
    icon: PieChart,
    color: "blue",
    skills: ["HR Metrics", "Survey Analysis"],
  },
  {
    name: "Compliance",
    icon: Shield,
    color: "sage",
    skills: ["DEI Programs", "EEO Reporting"],
  },
  {
    name: "Onboarding",
    icon: Briefcase,
    color: "warm",
    skills: ["Onboarding Programs", "Checklists"],
  },
];

const colorClasses = {
  warm: { icon: "bg-warm-100 text-warm-600" },
  blue: { icon: "bg-blue-100 text-blue-600" },
  sage: { icon: "bg-sage-100 text-sage-600" },
  stone: { icon: "bg-stone-100 text-stone-600" },
  orange: { icon: "bg-orange-100 text-orange-600" },
};

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Ask",
    subtitle: "Type naturally, like you would to a colleague",
    description: "No special syntax. No commands to memorize. Just describe what you need in plain English.",
    example: '"Create a performance improvement plan for Marcus Chen in Sales who has missed quota for 3 months"',
    color: "warm",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Understands",
    subtitle: "Intent detection + skill selection in milliseconds",
    description: "The platform detects your intent, selects the right skill from 25 options, and extracts relevant entities.",
    details: [
      { label: "Intent", value: "Document Generation" },
      { label: "Skill", value: "pip-builder-monitor" },
      { label: "Entity", value: "Marcus Chen, Sales, PIP" },
    ],
    color: "blue",
  },
  {
    number: "03",
    icon: PanelRight,
    title: "Context Appears",
    subtitle: "The right panel slides in automatically",
    description: "A contextual panel appears with exactly what you need—edit inline, preview, and export to Google Docs.",
    preview: "document",
    color: "sage",
  },
];

const useCases = [
  {
    category: "Workforce Analytics",
    scenario: "HR Director needs quick insights for leadership meeting",
    userMessage: "What's our attrition rate in engineering this quarter?",
    aiResponse: "Engineering attrition is 15% this quarter, up from 12% last quarter. I've displayed the trend analysis in the context panel. Key drivers appear to be...",
    panelType: "analytics",
  },
  {
    category: "Document Generation",
    scenario: "HR Manager needs to create a job description",
    userMessage: "Write a job description for a Senior Product Manager in our fintech division",
    aiResponse: "I've created an SEO-optimized job description for Senior Product Manager. It includes required qualifications, fintech-specific experience, and our standard benefits language. The document is bias-checked and ready for review.",
    panelType: "document",
  },
  {
    category: "Talent Identification",
    scenario: "CHRO preparing for succession planning",
    userMessage: "Show me our high performers who are flight risks",
    aiResponse: "I've identified 8 employees who score high on performance (4+) but show flight risk indicators. The 9-box grid shows their positions. Top concerns are compensation gaps and tenure...",
    panelType: "performance",
  },
  {
    category: "Employee Engagement",
    scenario: "VP of People analyzing Q4 engagement survey results",
    userMessage: "What are the main themes from our recent employee satisfaction survey?",
    aiResponse: "I've analyzed 1,247 responses and identified 3 key themes: work-life balance concerns (mentioned 342 times), career development opportunities (289 mentions), and recognition programs (201 mentions). The sentiment analysis shows engagement scores dropped 8% in engineering. I've created an action plan in the context panel.",
    panelType: "employee-satisfaction",
  },
];

function StepIndicator({ number, isActive, isComplete }: { number: string; isActive: boolean; isComplete: boolean }) {
  return (
    <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
      isComplete
        ? "bg-sage-500"
        : isActive
        ? "bg-warm-500 shadow-glow"
        : "bg-stone-200"
    }`}>
      {isComplete ? (
        <CheckCircle className="w-6 h-6 text-white" />
      ) : (
        <span className={`font-bold ${isActive ? "text-white" : "text-stone-500"}`}>
          {number}
        </span>
      )}
    </div>
  );
}

function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const selectedData = skillCategories.find(c => c.name === selectedCategory);

  return (
    <div className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-1 bg-warm-500 rounded-full" />
        <h3 className="text-sm font-semibold text-warm-600 uppercase tracking-wide">
          25 Specialized AI Skills
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-stone-50 rounded-2xl border border-stone-200 p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-warm-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-warm-600" />
          </div>
          <div>
            <p className="font-semibold text-stone-800">Like having 25 HR specialists available 24/7</p>
            <p className="text-sm text-stone-500">Pre-built AI capabilities trained on HR best practices, workflows, and compliance requirements.</p>
            <p className="text-sm text-stone-500 mt-1">Skills are automatically called through natural conversation—no commands or menus needed.</p>
          </div>
        </div>

        {/* Category Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skillCategories.map((category, catIndex) => {
            const colors = colorClasses[category.color as keyof typeof colorClasses];
            const isSelected = selectedCategory === category.name;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: catIndex * 0.05 }}
                onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                  isSelected
                    ? "border-warm-500 bg-white shadow-warm-lg"
                    : "border-transparent bg-white hover:border-stone-300 hover:shadow-soft"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colors.icon} flex items-center justify-center shrink-0`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-stone-800 truncate">{category.name}</p>
                    <p className="text-xs text-stone-500">{category.skills.length} skills</p>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-warm-500 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Skills Popover */}
        <AnimatePresence mode="wait">
          {selectedData && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${colorClasses[selectedData.color as keyof typeof colorClasses].icon} flex items-center justify-center`}>
                      <selectedData.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-stone-800">{selectedData.name} Skills</h4>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedData.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 text-stone-700 text-sm rounded-lg border border-stone-200"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-sage-500" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-warm-300 hover:shadow-warm-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
        <p className="text-xs font-medium text-warm-600 uppercase tracking-wide mb-1">{useCase.category}</p>
        <p className="text-sm text-stone-600">{useCase.scenario}</p>
      </div>

      {/* Conversation */}
      <div className="p-6 space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] px-4 py-2.5 text-sm chat-bubble-user">
            {useCase.userMessage}
          </div>
        </div>

        {/* AI response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] px-4 py-2.5 text-sm chat-bubble-ai">
            {useCase.aiResponse}
          </div>
        </div>

        {/* Panel indicator */}
        <div className="flex items-center gap-2 pt-2">
          <div className={`w-1 h-4 rounded-full ${
            useCase.panelType === "analytics" ? "bg-blue-500" :
            useCase.panelType === "document" ? "bg-warm-500" :
            useCase.panelType === "employee-satisfaction" ? "bg-purple-500" :
            "bg-sage-500"
          }`} />
          <span className="text-xs text-stone-500">
            {useCase.panelType === "analytics" && "Analytics panel appeared"}
            {useCase.panelType === "document" && "Document editor opened"}
            {useCase.panelType === "performance" && "Performance grid displayed"}
            {useCase.panelType === "employee-satisfaction" && "Employee satisfaction panel appeared"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-progress through steps
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-stone-50 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="section-badge mx-auto mb-6">
            <Play className="w-3.5 h-3.5" />
            <span>How It Works</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
            From Question to Answer in{" "}
            <span className="text-gradient">One Conversation</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Three steps. Under 3 seconds. No training required.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="mb-24">
          {/* Progress bar */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-stone-200" />
            <motion.div
              className="absolute top-6 left-0 h-0.5 bg-warm-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center"
                >
                  <StepIndicator
                    number={step.number}
                    isActive={activeStep === index}
                    isComplete={activeStep > index}
                  />
                  <span className={`mt-3 text-sm font-medium transition-colors ${
                    activeStep === index ? "text-warm-600" : "text-stone-500"
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl border border-stone-200 shadow-elevated overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Left: Description */}
                  <div className="p-8 lg:p-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      steps[activeStep].color === "warm" ? "bg-warm-100" :
                      steps[activeStep].color === "blue" ? "bg-blue-100" :
                      "bg-sage-100"
                    }`}>
                      {(() => {
                        const Icon = steps[activeStep].icon;
                        return <Icon className={`w-7 h-7 ${
                          steps[activeStep].color === "warm" ? "text-warm-600" :
                          steps[activeStep].color === "blue" ? "text-blue-600" :
                          "text-sage-600"
                        }`} />;
                      })()}
                    </div>

                    <h3 className="font-display text-2xl font-bold text-stone-800 mb-2">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-warm-600 font-medium mb-4">
                      {steps[activeStep].subtitle}
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  {/* Right: Visual */}
                  <div className="bg-stone-50 p-8 lg:p-10 flex items-center">
                    {activeStep === 0 && (
                      <div className="w-full">
                        <div className="chat-bubble-user px-4 py-3 text-sm">
                          <p className="font-mono text-stone-300/80 mb-1 text-xs">You typed:</p>
                          {steps[0].example}
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && steps[1].details && (
                      <div className="w-full space-y-3">
                        {steps[1].details.map((detail, i) => (
                          <motion.div
                            key={detail.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex items-center gap-3 bg-white rounded-lg p-3 border border-stone-200"
                          >
                            <span className="text-xs font-medium text-stone-400 uppercase tracking-wide w-16">
                              {detail.label}
                            </span>
                            <span className="text-sm font-medium text-stone-700">
                              {detail.value}
                            </span>
                          </motion.div>
                        ))}
                        <div className="flex items-center gap-2 pt-2 text-blue-600">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-medium">Processing complete</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full"
                      >
                        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-soft">
                          <div className="h-1 bg-warm-500" />
                          <div className="p-4 border-b border-stone-100">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-warm-500" />
                              <span className="text-sm font-medium text-stone-700">Document Editor</span>
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="h-2.5 bg-stone-100 rounded w-full" />
                            <div className="h-2.5 bg-warm-100 rounded w-4/5" />
                            <div className="h-2.5 bg-stone-100 rounded w-3/5" />
                            <div className="flex gap-2 mt-4">
                              <div className="px-2.5 py-1 bg-warm-500 text-white text-xs rounded-full">Export</div>
                              <div className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">Edit</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Use Cases Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-1 bg-warm-500 rounded-full" />
            <h3 className="text-sm font-semibold text-warm-600 uppercase tracking-wide">
              Real-World Use Cases
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={useCase.category} useCase={useCase} index={index} />
            ))}
          </div>
        </div>

        {/* 25 AI Skills Section */}
        <SkillsSection />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="#pricing" className="btn-primary text-base px-8 py-4">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
