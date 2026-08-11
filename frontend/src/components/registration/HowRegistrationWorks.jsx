import { CheckCircle, Smartphone, ClipboardCheck, MapPin, QrCode } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "REGISTER ONLINE",
    description: "Fill in your details and submit the registration form.",
  },
  {
    icon: QrCode,
    title: "GET YOUR QR CODE & ID",
    description: "After successful registration, you will receive a unique registration code and a QR code.",
  },
  {
    icon: CheckCircle,
    title: "SAVE YOUR CODE",
    description: "Copy your code, download the QR image, or save the registration confirmation to your device.",
  },
  {
    icon: MapPin,
    title: "COME TO UNLEASH 3.0",
    description: "Bring your registration code or QR code with you on the event day.",
  },
  {
    icon: Smartphone,
    title: "CHECK IN",
    description: "Show your QR code or registration ID to the registration/check‑in team. They will quickly find your registration and confirm your attendance.",
  },
];

export default function HowRegistrationWorks() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown text-center mb-12">
          HOW REGISTRATION WORKS
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full bg-unleash-cream flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-unleash-orange" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-unleash-orange text-white text-xs font-bold flex items-center justify-center">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-bold text-unleash-brown text-sm mb-2">{step.title}</h3>
              <p className="text-unleash-brown/70 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* On the Day Card */}
        <div className="bg-unleash-cream rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="font-display text-2xl text-unleash-brown mb-4">ON THE DAY</h3>
          <p className="text-unleash-brown/80 leading-relaxed mb-3">
            Keep your registration code or QR code accessible.
          </p>
          <p className="text-unleash-brown/80 leading-relaxed mb-3">
            When you arrive at UNLEASH 3.0, show your QR code or registration ID to the registration team.
            Your code helps the team quickly find your registration and check you in.
          </p>
          <p className="text-unleash-brown/80 leading-relaxed flex items-start gap-2">
            <Smartphone className="w-5 h-5 text-unleash-orange shrink-0 mt-0.5" />
            <span>You don't need to print anything. Just show the QR code from your phone.</span>
          </p>
        </div>
      </div>
    </section>
  );
}