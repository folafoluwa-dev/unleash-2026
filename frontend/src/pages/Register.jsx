// src/pages/Register.jsx

import { useState } from "react";
import Footer from "../components/Footer";
import RegistrationHero from "../components/registration/RegistrationHero";
import EventSummary from "../components/registration/EventSummary";
import RegistrationForm from "../components/registration/RegistrationForm";
import RegistrationConfirmation from "../components/registration/RegistrationConfirmation";
import HowRegistrationWorks from "../components/registration/HowRegistrationWorks";


// Lazy initializer – reads localStorage once
const getInitialRegistration = () => {
  try {
    const saved = localStorage.getItem("unleash_registration");
    return saved ? JSON.parse(saved) : null;
  } catch {
    localStorage.removeItem("unleash_registration");
    return null;
  }
};

const RegisterPage = () => {
  const [registration, setRegistration] = useState(getInitialRegistration);
  const [step, setStep] = useState(() => (registration ? "confirmation" : "form"));

  const handleRegistrationSuccess = (regData) => {
    setRegistration(regData);
    setStep("confirmation");
    localStorage.setItem("unleash_registration", JSON.stringify(regData));
  };

  const handleRegisterAnother = () => {
    setRegistration(null);
    setStep("form");
    localStorage.removeItem("unleash_registration");
  };

  // If there's a stored registration but step was manually changed, keep in sync
  // (not needed since step is derived from registration presence)

  return (
    <>
      <main>
        <RegistrationHero />
        <EventSummary />
        <HowRegistrationWorks />   {/* ← new */}
        {step === "form" && (
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        )}
        {step === "confirmation" && registration && (
          <RegistrationConfirmation
            registration={registration}
            onRegisterAnother={handleRegisterAnother}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;