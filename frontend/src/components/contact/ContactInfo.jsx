import { Phone, Mail, MessageCircle } from "lucide-react";

// Inline social icons (compatible with any lucide version)
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const contactData = {
  phone: "",
  email: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  youtube: "",
};

const ContactInfo = () => {
  const hasAny = Object.values(contactData).some((v) => v);

  if (!hasAny) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-6">
            CONTACT US
          </h2>
          <p className="text-lg text-unleash-brown/70">
            Contact details coming soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-12">
          CONTACT US
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactData.phone && (
            <div className="bg-unleash-cream rounded-xl p-6 text-center shadow-sm">
              <Phone className="w-8 h-8 text-unleash-orange mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-unleash-brown/60 mb-1">
                Phone
              </p>
              <a
                href={`tel:${contactData.phone}`}
                className="text-unleash-brown font-medium hover:text-unleash-orange transition-colors"
              >
                {contactData.phone}
              </a>
            </div>
          )}
          {contactData.email && (
            <div className="bg-unleash-cream rounded-xl p-6 text-center shadow-sm">
              <Mail className="w-8 h-8 text-unleash-orange mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-unleash-brown/60 mb-1">
                Email
              </p>
              <a
                href={`mailto:${contactData.email}`}
                className="text-unleash-brown font-medium hover:text-unleash-orange transition-colors"
              >
                {contactData.email}
              </a>
            </div>
          )}
          {contactData.whatsapp && (
            <div className="bg-unleash-cream rounded-xl p-6 text-center shadow-sm">
              <MessageCircle className="w-8 h-8 text-unleash-orange mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-unleash-brown/60 mb-1">
                WhatsApp
              </p>
              <a
                href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, "")}`}
                className="text-unleash-brown font-medium hover:text-unleash-orange transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactData.whatsapp}
              </a>
            </div>
          )}
          {(contactData.instagram || contactData.facebook || contactData.youtube) && (
            <div className="bg-unleash-cream rounded-xl p-6 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-unleash-brown/60 mb-3">
                Follow Us
              </p>
              <div className="flex justify-center gap-4">
                {contactData.instagram && (
                  <a
                    href={contactData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-unleash-brown hover:text-unleash-orange transition-colors"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {contactData.facebook && (
                  <a
                    href={contactData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-unleash-brown hover:text-unleash-orange transition-colors"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {contactData.youtube && (
                  <a
                    href={contactData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="text-unleash-brown hover:text-unleash-orange transition-colors"
                  >
                    <YoutubeIcon />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;