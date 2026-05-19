"use client";

import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "919424927574";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name:  "",
    email:      "",
    phone:      "",
    message:    "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = encodeURIComponent(
      `📩 *New Contact Message*\n\n` +
      `👤 *Name:* ${formData.first_name} ${formData.last_name}\n` +
      `📱 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || "N/A"}\n\n` +
      `💬 *Message:*\n${formData.message}\n\n` +
      `_Sent from Shri Amar Computer Institution Website_`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] outline-none transition-all bg-gray-50 focus:bg-white";

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-[var(--color-primary)] text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            We&apos;re here to answer any questions you may have.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-blue-200">
            <MessageCircle size={16} />
            <span>Your message will be sent directly via WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">N.H. 135 B.D. Kyoti Road,<br />New Bus Stand, Lalgaon,<br />Rewa (M.P.)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+91 9424927574<br />+91 7000685215</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                    <p className="text-gray-600">Saics8657@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3621.2483552879817!2d81.535225!3d24.821179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQ5JzE2LjIiTiA4McKwMzInMDYuOCJF!5e0!3m2!1sen!2sin!4v1779174772112!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Shri Amar Computer Institution Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full transform translate-x-10 -translate-y-10" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 text-green-800 p-8 rounded-xl text-center border border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Opened! 🎉</h3>
                <p className="text-green-700 text-sm mb-6">
                  A WhatsApp window has opened with your message pre-filled. Please press <strong>Send</strong> to complete.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ first_name: "", last_name: "", email: "", phone: "", message: "" });
                  }}
                  className="text-green-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">First Name *</label>
                    <input
                      name="first_name" type="text" required
                      value={formData.first_name} onChange={handleChange}
                      placeholder="John" className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Last Name *</label>
                    <input
                      name="last_name" type="text" required
                      value={formData.last_name} onChange={handleChange}
                      placeholder="Doe" className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email Address (Optional)</label>
                  <input
                    name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="john@example.com" className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input
                    name="phone" type="tel" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Your Message *</label>
                  <textarea
                    name="message" rows={4} required
                    value={formData.message} onChange={handleChange}
                    placeholder="How can we help you?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <MessageCircle size={22} />
                  Send via WhatsApp
                </button>

                <p className="text-xs text-center text-gray-400 mt-2">
                  Clicking the button will open WhatsApp with your message pre-filled.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
