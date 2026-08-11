import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import RegistrationHero from "../components/registration/RegistrationHero";
import EventSummary from "../components/registration/EventSummary";
import HowRegistrationWorks from "../components/registration/HowRegistrationWorks";
import RegistrationForm from "../components/registration/RegistrationForm";
import RegistrationConfirmation from "../components/registration/RegistrationConfirmation";
import { getEventSettings } from "../services/eventSettingsService";

const getInitialRegistration = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem("registration");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const RegisterPage = () => {
  const [registration, setRegistration] = useState(getInitialRegistration);
  const [step, setStep] = useState(() => (registration ? "confirmation" : "form"));
  const [registrationOpen, setRegistrationOpen] = useState(null); // null = loading

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const settings = await getEventSettings();
        setRegistrationOpen(settings.registration_open);
      } catch {
        setRegistrationOpen(false); // fallback closed
      }
    };
    checkRegistrationStatus();
  }, []);

  const handleRegistrationSuccess = (regData) => {
    setRegistration(regData);
    setStep("confirmation");
    try {
      window.localStorage.setItem("registration", JSON.stringify(regData));
    } catch {
      // ignore localStorage errors
    }
  };

  const handleRegisterAnother = () => {
    setRegistration(null);
    setStep("form");
    try {
      window.localStorage.removeItem("registration");
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <>
      <main>
        <RegistrationHero />
        <EventSummary />
        <HowRegistrationWorks />

        {registrationOpen === null ? (
          <div className="text-center py-12">Loading...</div>
        ) : step === "confirmation" && registration ? (
          <RegistrationConfirmation
            registration={registration}
            onRegisterAnother={handleRegisterAnother}
          />
        ) : step === "form" && registrationOpen ? (
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        ) : step === "form" && !registrationOpen ? (
          <div className="py-16 text-center max-w-2xl mx-auto px-4">
            <h2 className="font-display text-4xl text-unleash-brown mb-4">Registration Closed</h2>
            <p className="text-lg text-unleash-brown/80">
              Registration for UNLEASH 3.0 has ended. Thank you for your interest.
            </p>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;