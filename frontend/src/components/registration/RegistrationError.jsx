import { AlertTriangle } from "lucide-react";

const RegistrationError = ({ onTryAgain }) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="w-20 h-20 text-red-500" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-4">
          REGISTRATION COULDN'T BE COMPLETED
        </h2>
        <p className="text-lg text-unleash-brown/80 mb-8">
          Something went wrong while submitting your registration. Please try again.
        </p>
        <button
          onClick={onTryAgain}
          className="px-10 py-4 bg-unleash-orange text-white rounded-full font-bold text-lg hover:bg-unleash-brown transition-colors"
        >
          TRY AGAIN
        </button>
      </div>
    </section>
  );
};

export default RegistrationError;