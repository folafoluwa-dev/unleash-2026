import { useState } from "react";

const initialFormData = { name: "", email: "", subject: "", message: "" };

const validate = (data) => {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!data.message || data.message.trim().length < 10) errors.message = "Please enter a message (at least 10 characters).";
  return errors;
};

// Mock submit – replace with real fetch later
const submitContact = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.log("Form submitted:", formData);
  return { success: true };
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate(formData);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitContact(formData);
      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-2">
          SEND US A MESSAGE
        </h2>
        <p className="text-center text-unleash-brown/70 mb-8">
          We'll get back to you as soon as possible.
        </p>

        {submitStatus === "success" ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-display text-2xl text-unleash-brown mb-2">
              MESSAGE SENT
            </h3>
            <p className="text-unleash-brown/80">
              Thank you. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-unleash-brown mb-1">
                  Full Name <span className="text-unleash-orange">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-unleash-cream text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-unleash-brown mb-1">
                  Email Address <span className="text-unleash-orange">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-unleash-cream text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold text-unleash-brown mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-unleash-cream text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold text-unleash-brown mb-1">
                Message <span className="text-unleash-orange">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-unleash-cream text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p id="message-error" className="text-sm text-red-600 mt-1">{errors.message}</p>}
            </div>
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                Something went wrong. Please try again.
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-unleash-orange text-white py-4 rounded-full font-bold text-lg hover:bg-unleash-brown transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  SENDING...
                </>
              ) : (
                "SEND MESSAGE"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;