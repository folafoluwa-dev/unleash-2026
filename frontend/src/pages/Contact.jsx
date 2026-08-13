import { useState } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";
import churchInfo from "../config/churchInfo";
import { useEventSettings } from "../hooks/useEventSettings";
import { createMessage } from "../services/messageService";

// Inline social icon components (avoiding missing lucide exports)
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const ContactPage = () => {
  const { settings: eventSettings } = useEventSettings();

  const venue = eventSettings?.venue || "King's Court Assembly";
  const address =
    eventSettings?.address ||
    "37 Olowora Road, by Deji Olowo Close, Beside Olowora Primary School, Olowora Bus Stop, Ojodu Berger, Lagos";
  const mapsQuery = encodeURIComponent(`${venue}, ${address}`);
  const mapsUrl = `https://maps.google.com/?q=${mapsQuery}`;

  // Message form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSending(true);
    setSubmitStatus(null);
    setSubmitMessage("");
    try {
      await createMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });
      setSubmitStatus("success");
      setSubmitMessage("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
      if (error.response?.data) {
        const apiErrors = error.response.data;
        const fieldErrors = {};
        for (const [key, messages] of Object.entries(apiErrors)) {
          fieldErrors[key] = Array.isArray(messages)
            ? messages.join(". ")
            : messages;
        }
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
          setSubmitMessage("Please correct the errors below.");
        } else {
          setSubmitMessage("Failed to send message. Please try again.");
        }
      } else {
        setSubmitMessage("Unable to send message. Please try again later.");
      }
    } finally {
      setSending(false);
    }
  };

  const hasPhone = churchInfo.phone && churchInfo.phone.trim().length > 0;
  const hasEmail = churchInfo.email && churchInfo.email.trim().length > 0;
  const hasSocials =
    churchInfo.socials &&
    Object.values(churchInfo.socials).some((v) => v.trim());

  return (
    <>
      <main className="bg-white">
        {/* Hero */}
<section class="relative bg-unleash-cream overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-unleash-orange/5 rounded-bl-[80px]" />
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-unleash-brown mb-4">
              Contact & Location
            </h1>
            <p className="text-lg text-unleash-brown/80 max-w-2xl mx-auto">
              Find us and get in touch. We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Church Info */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-6 text-center">
              {churchInfo.name}
            </h2>
            <p className="text-lg text-unleash-brown/80 leading-relaxed max-w-2xl mx-auto text-center">
              {churchInfo.description}
            </p>
          </div>
        </section>

        {/* Event Location */}
        <section className="py-12 bg-unleash-cream">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-6 text-center">
              Event Venue
            </h2>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm max-w-lg mx-auto">
              <p className="text-xl font-bold text-unleash-brown mb-2">{venue}</p>
              <p className="text-unleash-brown/80 leading-relaxed whitespace-pre-line">
                {address}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-unleash-brown text-unleash-brown px-6 py-3 rounded-full font-bold hover:bg-unleash-brown hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details */}
        {(hasPhone || hasEmail) && (
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-8 text-center">
                Contact Us
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {hasPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-unleash-orange" />
                    <a
                      href={`tel:${churchInfo.phone}`}
                      className="text-unleash-brown font-medium hover:text-unleash-orange transition-colors"
                    >
                      {churchInfo.phone}
                    </a>
                  </div>
                )}
                {hasEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-unleash-orange" />
                    <a
                      href={`mailto:${churchInfo.email}`}
                      className="text-unleash-brown font-medium hover:text-unleash-orange transition-colors"
                    >
                      {churchInfo.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Social Links */}
        {hasSocials && (
          <section className="py-12 bg-unleash-cream">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-8">
                Follow Us
              </h2>
              <div className="flex justify-center gap-6">
                {churchInfo.socials.facebook && (
                  <a
                    href={churchInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-unleash-brown/10 rounded-full flex items-center justify-center hover:bg-unleash-orange hover:text-white transition-colors text-unleash-brown"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {churchInfo.socials.instagram && (
                  <a
                    href={churchInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-unleash-brown/10 rounded-full flex items-center justify-center hover:bg-unleash-orange hover:text-white transition-colors text-unleash-brown"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {churchInfo.socials.youtube && (
                  <a
                    href={churchInfo.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-unleash-brown/10 rounded-full flex items-center justify-center hover:bg-unleash-orange hover:text-white transition-colors text-unleash-brown"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ===== Send Us a Message ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-6">
              Send Us a Message
            </h2>
            <p className="text-center text-unleash-brown/70 mb-8">
              Have a question? Fill out the form below and we'll get back to you.
            </p>

            {submitStatus === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-700 font-medium">{submitMessage}</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 text-unleash-orange font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-unleash-cream rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
              >
                {submitStatus === "error" && submitMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {submitMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-unleash-brown mb-1"
                  >
                    Name <span className="text-unleash-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-white text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-600 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-unleash-brown mb-1"
                  >
                    Email <span className="text-unleash-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-white text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-unleash-brown mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-white text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-unleash-brown mb-1"
                  >
                    Message <span className="text-unleash-orange">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-lg border border-unleash-brown/20 bg-white text-unleash-brown placeholder:text-unleash-brown/40 focus:outline-none focus:ring-2 focus:ring-unleash-orange/60 transition-colors"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-600 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-unleash-orange text-white py-4 rounded-full font-bold text-lg hover:bg-unleash-brown transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;