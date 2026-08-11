import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "When is UNLEASH 3.0?",
    answer: "UNLEASH 3.0 takes place September 5–6, 2026.",
  },
  {
    question: "Where is the event?",
    answer: "King's Court Assembly, 37 Olowora Road, by Deji Olowo Close, beside Olowora Primary School, Olowora Bus Stop, Ojodu Berger, Lagos.",
  },
  {
    question: "What time does it start?",
    answer: "The event starts at 8:00 AM on both days.",
  },
  {
    question: "How can I register?",
    answer: "Visit the Registration page and complete the free registration form.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, registration is completely free.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-10">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-unleash-brown/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center p-5 text-left bg-unleash-cream hover:bg-unleash-orange/5 transition-colors"
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-unleash-brown pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-unleash-brown transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 bg-white">
                  <p className="text-unleash-brown/80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;