"use client";

import { Download, CheckCircle, ArrowRight, Mail, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── EmailJS Configuration ──────────────────────────────────────────────────
// To get these values:
// 1. Go to https://www.emailjs.com and sign up for FREE
// 2. Add an Email Service (Gmail) → copy the SERVICE ID
// 3. Create an Email Template → copy the TEMPLATE ID
//    (In the template use variables: {{student_name}}, {{father_name}},
//     {{mobile}}, {{email}}, {{dob}}, {{course}}, {{qualification}}, {{address}})
// 4. Copy your PUBLIC KEY from Account > API Keys
const EMAILJS_SERVICE_ID = "service_9jcelwm";
const EMAILJS_TEMPLATE_ID = "template_p06jod8";
const EMAILJS_PUBLIC_KEY  = "pIAjZDuVNUXitlPDO";

// ─── WhatsApp Configuration ───────────────────────────────────────────────────
// Your institute WhatsApp number (with country code, no +)
const WHATSAPP_NUMBER = "919424927574";

export default function ApplyPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    student_name: "",
    father_name: "",
    mobile: "",
    email: "",
    dob: "",
    course: "",
    qualification: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openWhatsApp = (data: typeof formData) => {
    const msg = encodeURIComponent(
      `🎓 *New Admission Application*\n\n` +
      `👤 *Name:* ${data.student_name}\n` +
      `👨 *Father's Name:* ${data.father_name}\n` +
      `📱 *Mobile:* ${data.mobile}\n` +
      `📧 *Email:* ${data.email || "N/A"}\n` +
      `🎂 *DOB:* ${data.dob}\n` +
      `📚 *Course:* ${data.course.toUpperCase()}\n` +
      `🏫 *Qualification:* ${data.qualification}\n` +
      `🏠 *Address:* ${data.address}\n\n` +
      `_Sent from Shri Amar Computer Institution Website_`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Guard: check if credentials are still placeholders
    if (
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      setError("EmailJS is not configured yet. Please add your Template ID and Public Key.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send Email via EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:      "Saics8657@gmail.com",
          student_name:  formData.student_name,
          father_name:   formData.father_name,
          mobile:        formData.mobile,
          email:         formData.email || "Not Provided",
          dob:           formData.dob,
          course:        formData.course.toUpperCase(),
          qualification: formData.qualification,
          address:       formData.address,
        },
        EMAILJS_PUBLIC_KEY
      );
      console.log("EmailJS Success:", result.status, result.text);

      setSubmitted(true);

      // Open WhatsApp with pre-filled message
      openWhatsApp(formData);
    } catch (err: unknown) {
      // Log full error details
      if (err && typeof err === "object") {
        const e = err as { status?: number; text?: string; message?: string };
        console.error("EmailJS Error details:", {
          status:  e.status,
          text:    e.text,
          message: e.message,
        });
        setError(
          `Email failed (${e.status ?? "unknown"}): ${e.text ?? e.message ?? "Check console for details"}`
        );
      } else {
        console.error("EmailJS unknown error:", err);
        setError("Failed to send email. Please check console for details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1e40af] to-[#0f172a] text-white py-20 mb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Admission Application
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 max-w-2xl mx-auto text-lg"
          >
            Start your journey towards a bright career in technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-6 text-sm text-blue-200"
          >
            <span className="flex items-center gap-2">
              <Mail size={16} /> Email notification to institute
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp alert sent
            </span>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Offline Admission</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Prefer offline submission? Download the admission form, print, fill it, and
                submit at our Lalgaon office with required documents.
              </p>
              <a
                href="/admission-form"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-colors"
              >
                <Download size={18} />
                Download Form (PDF)
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-50 p-8 rounded-2xl border border-blue-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "10th / 12th Marksheet (Copy)",
                  "Graduation Marksheet (For PGDCA)",
                  "Aadhar Card (Copy)",
                  "4 Passport Size Photographs",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[var(--color-primary)] mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 p-6 rounded-2xl border border-green-200"
            >
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MessageCircle size={18} className="text-green-600" />
                Instant Notification
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                On form submission, the institute receives an <strong>email</strong> at{" "}
                <span className="text-[var(--color-primary)] font-medium">Saics8657@gmail.com</span>{" "}
                and a <strong>WhatsApp message</strong> on{" "}
                <span className="text-green-700 font-medium">+91 9424927574</span>.
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Online Registration Form</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 text-green-800 p-10 rounded-xl text-center border border-green-200"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-green-600 w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Registration Successful! 🎉</h3>
                    <p className="mb-2 text-green-700">
                      Your application has been submitted. An email notification was sent to the institute.
                    </p>
                    <p className="mb-6 text-green-700 text-sm">
                      A WhatsApp message window has also been opened — please send it to complete your registration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/courses"
                        className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
                      >
                        Explore Courses <ArrowRight size={16} />
                      </Link>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center justify-center gap-2 border border-green-300 text-green-700 px-6 py-3 rounded-xl font-medium hover:bg-green-100 transition"
                      >
                        Submit Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Student&apos;s Full Name *</label>
                        <input name="student_name" type="text" required value={formData.student_name} onChange={handleChange} placeholder="Enter full name" className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Father&apos;s Name *</label>
                        <input name="father_name" type="text" required value={formData.father_name} onChange={handleChange} placeholder="Enter father's name" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Mobile Number *</label>
                        <input name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email Address (Optional)</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="student@email.com" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Date of Birth *</label>
                        <input name="dob" type="date" required value={formData.dob} onChange={handleChange} className={inputClass} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Select Course *</label>
                        <select name="course" required value={formData.course} onChange={handleChange} className={inputClass}>
                          <option value="">-- Choose Course --</option>
                          <option value="pgdca">PGDCA (1 Year)</option>
                          <option value="dca">DCA (1 Year)</option>
                          <option value="cpct">CPCT Preparation</option>
                          <option value="basic">Basic Computer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Highest Qualification *</label>
                      <select name="qualification" required value={formData.qualification} onChange={handleChange} className={inputClass}>
                        <option value="">-- Select Qualification --</option>
                        <option value="10th Pass">10th Pass</option>
                        <option value="12th Pass">12th Pass</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Full Address *</label>
                      <textarea name="address" rows={3} required value={formData.address} onChange={handleChange} placeholder="Village / Ward, District, State, PIN" className={`${inputClass} resize-none`} />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                        ⚠️ {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={22} className="animate-spin" />
                          Sending Notifications...
                        </>
                      ) : (
                        <>
                          <Mail size={20} />
                          Submit & Notify via Email + WhatsApp
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-400 mt-3">
                      By submitting, you agree to our terms. Your data is used solely for admission purposes.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
