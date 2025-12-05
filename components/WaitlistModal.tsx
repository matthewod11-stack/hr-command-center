"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrbnlyvl";

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after animation completes
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setName("");
      setErrorMessage("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div
              className="bg-white rounded-2xl shadow-elevated p-6 sm:p-8 relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="waitlist-title"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 transition-colors rounded-full hover:bg-stone-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {status === "success" ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-sage-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-800 mb-2">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-stone-600 mb-6">
                    We&apos;ll notify you as soon as HR Command Center launches in early 2026.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-secondary px-6 py-2.5"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-warm-100 flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-7 h-7 text-warm-600" />
                    </div>
                    <h3
                      id="waitlist-title"
                      className="font-display text-xl font-bold text-stone-800 mb-2"
                    >
                      Join the Waitlist
                    </h3>
                    <p className="text-stone-600 text-sm">
                      Be the first to know when we launch in early 2026.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="waitlist-name"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Name <span className="text-stone-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="waitlist-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-warm-400 focus:ring-2 focus:ring-warm-100 outline-none transition-all text-stone-800 placeholder:text-stone-400"
                        disabled={status === "submitting"}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Email <span className="text-warm-500">*</span>
                      </label>
                      <input
                        ref={inputRef}
                        type="email"
                        id="waitlist-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-warm-400 focus:ring-2 focus:ring-warm-100 outline-none transition-all text-stone-800 placeholder:text-stone-400"
                        disabled={status === "submitting"}
                      />
                    </div>

                    {/* Error message */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "submitting" || !email}
                      className="w-full py-3.5 rounded-full font-medium bg-warm-500 hover:bg-warm-600 disabled:bg-warm-300 text-white shadow-warm transition-colors flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5" />
                          Join Waitlist
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy note */}
                  <p className="text-xs text-stone-400 text-center mt-4">
                    We&apos;ll only email you about the launch. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
