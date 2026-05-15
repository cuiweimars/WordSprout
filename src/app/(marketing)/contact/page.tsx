"use client";

import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sprout-50 to-sun-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-sprout-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Questions, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-800 mb-4">
                  Let&apos;s Connect
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Whether you&apos;re a parent with feedback, a teacher looking for classroom
                  resources, or a partner interested in collaboration — we&apos;re here.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sprout-100 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-sprout-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Email</p>
                    <p className="text-gray-600 text-sm">hello@sightwordskid.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sprout-100 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-sprout-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Response Time</p>
                    <p className="text-gray-600 text-sm">Within 24 hours on business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sprout-100 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} className="text-sprout-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Social</p>
                    <div className="flex gap-3 mt-1">
                      <a
                        href="https://twitter.com/wordsprout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sprout-600 text-sm hover:underline"
                      >
                        Twitter
                      </a>
                      <a
                        href="https://pinterest.com/wordsprout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sprout-600 text-sm hover:underline"
                      >
                        Pinterest
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-cream rounded-2xl p-6 md:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout-300 focus:border-sprout-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout-300 focus:border-sprout-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout-300 focus:border-sprout-400"
                  >
                    <option value="">Select a topic</option>
                    <option value="feedback">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="teacher">Teacher / School Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout-300 focus:border-sprout-400 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {status === "sent" ? (
                  <div className="flex items-center justify-center gap-2 text-sprout-600 font-medium py-3">
                    <CheckCircle size={20} />
                    Message sent! We&apos;ll get back to you soon.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-sprout-500 text-white font-heading font-bold py-3 rounded-full hover:bg-sprout-600 transition-colors text-lg disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                )}

                {status === "error" && (
                  <p className="text-center text-red-500 text-sm">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 mb-10">
            Common Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is WordSprout really free?",
                a: "Yes! Our core sight word lists, flashcards, and several games are completely free. Pro and Teacher plans unlock additional features like unlimited printing and progress tracking.",
              },
              {
                q: "Can I use WordSprout in my classroom?",
                a: "Absolutely. Our Teacher plan includes up to 40 student profiles, class progress dashboards, and batch printing for worksheets and flashcards.",
              },
              {
                q: "What grade levels do you cover?",
                a: "We cover Pre-K through 3rd grade with Dolch and Fry sight word lists. That includes over 1,000 of the most common English words children encounter in early reading.",
              },
              {
                q: "Do you collect data from children?",
                a: "We take privacy seriously. We only collect the minimum data needed to provide the service. We never sell data or show ads to children. See our Privacy Policy for details.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-heading font-bold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
