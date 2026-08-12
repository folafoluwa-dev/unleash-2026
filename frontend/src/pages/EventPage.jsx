import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Heart,
  BookOpen,
  Users,
  HelpCircle,
  Wrench,
} from "lucide-react";
import VenueSection from "../components/Venuesection.jsx";
import RegistrationCTA from "../components/Registrationcta.jsx";

// Reusable sub-components for this page
const EventHero = () => (
  <section className="relative bg-unleash-cream overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-unleash-orange/5 rounded-bl-[80px]" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="relative text-center md:text-left">
        <p className="text-sm md:text-base font-semibold text-unleash-orange tracking-widest uppercase mb-3">
          Love of Christ Chapel International Ministry presents
        </p>
        <h1 className="font-display text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-[0.9] text-unleash-brown mb-4">
          UNLEASH <span className="text-unleash-orange">3.0</span>
        </h1>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-unleash-brown/90 mb-8">
          ACCELERATE
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/register"
            className="bg-unleash-orange text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-unleash-brown transition-colors text-center"
          >
            REGISTER NOW
          </Link>
          <a
            href="#event-details"
            className="border-2 border-unleash-brown text-unleash-brown px-8 py-3.5 rounded-full text-base font-bold hover:bg-unleash-brown hover:text-white transition-colors text-center"
          >
            LEARN MORE
          </a>
        </div>
      </div>
    </div>
  </section>
);

const AboutUnleash = () => (
  <section className="py-16 bg-white">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
        ABOUT UNLEASH 3.0
      </h2>
      <p className="text-lg text-unleash-brown/80 leading-relaxed">
        UNLEASH 3.0 is more than an event — it’s a divine appointment for young people
        to encounter God, be ignited by His Word, and sent forth with power. Over two
        transformative days, we’ll dive deep into worship, prayer, and teaching that
        accelerates our walk with Christ.
      </p>
    </div>
  </section>
);

const EventDetails = () => (
  <section id="event-details" className="py-16 bg-unleash-cream">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-12">
        EVENT DETAILS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Calendar,
            title: "Day 1",
            desc: "Saturday, September 5, 2026",
          },
          {
            icon: Calendar,
            title: "Day 2",
            desc: "Sunday, September 6, 2026",
          },
          {
            icon: Clock,
            title: "Time",
            desc: "8:00 AM Daily",
          },
          {
            icon: MapPin,
            title: "Venue",
            desc: "King’s Court Assembly, Ojodu Berger, Lagos",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
            <Icon className="w-8 h-8 text-unleash-orange mx-auto mb-4" />
            <h3 className="font-bold text-unleash-brown mb-1">{title}</h3>
            <p className="text-unleash-brown/70">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TwoDayExperience = () => {
  const days = [
    {
      day: "SATURDAY",
      date: "SEPTEMBER 5, 2026",
      title: "UNLEASH",
      desc: "The main gathering. A full day of worship, the Word, prayer, and impartation. Come ready to encounter God and be equipped for greater works.",
    },
    {
      day: "SUNDAY",
      date: "SEPTEMBER 6, 2026",
      title: "PRAISE UNLEASHED",
      desc: "A dedicated praise and worship experience. Lift your voice, celebrate His goodness, and step into a new season of acceleration through high praise.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown text-center mb-12">
          TWO-DAY EXPERIENCE
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {days.map((d) => (
            <div
              key={d.title}
              className="bg-unleash-cream rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="inline-block bg-unleash-orange/10 text-unleash-orange text-sm font-bold px-3 py-1 rounded-full mb-4">
                {d.day}
              </span>
              <p className="text-unleash-brown/70 font-medium mb-2">{d.date}</p>
              <h3 className="font-display text-3xl md:text-4xl text-unleash-brown mb-4">
                {d.title}
              </h3>
              <p className="text-unleash-brown/80">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgrammeSection = () => {
  // Placeholder programme – times not final
  const saturdaySlots = [
    { time: "8:00 AM", activity: "Doors Open / Registration" },
    { time: "9:00 AM", activity: "Praise & Worship" },
    { time: "10:00 AM", activity: "Opening Charge / Prayer" },
    { time: "11:00 AM", activity: "Word Session 1" },
    { time: "12:30 PM", activity: "Panel Discussion / Q&A" },
    { time: "2:00 PM", activity: "Workshops / Breakout Sessions" },
    { time: "4:00 PM", activity: "Games & Fellowship" },
    { time: "5:00 PM", activity: "Closing" },
  ];

  const sundaySlots = [
    { time: "8:00 AM", activity: "Praise & Worship" },
    { time: "9:30 AM", activity: "Prayer Session" },
    { time: "10:30 AM", activity: "Word Session 2" },
    { time: "12:00 PM", activity: "Praise Unleashed (Special Ministration)" },
    { time: "1:30 PM", activity: "Thanksgiving / Offering" },
    { time: "2:00 PM", activity: "Fellowship & Departure" },
  ];

  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown text-center mb-12">
          PROGRAMME
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Saturday */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-2xl text-unleash-orange mb-4">
              SATURDAY – UNLEASH
            </h3>
            <ul className="space-y-4">
              {saturdaySlots.map((slot, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-unleash-brown/90"
                >
                  <span className="font-bold text-sm w-16 shrink-0">
                    {slot.time}
                  </span>
                  <span>{slot.activity}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Sunday */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-display text-2xl text-unleash-orange mb-4">
              SUNDAY – PRAISE UNLEASHED
            </h3>
            <ul className="space-y-4">
              {sundaySlots.map((slot, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-unleash-brown/90"
                >
                  <span className="font-bold text-sm w-16 shrink-0">
                    {slot.time}
                  </span>
                  <span>{slot.activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-unleash-brown/60 mt-6">
          *Times are approximate and subject to change
        </p>
      </div>
    </section>
  );
};

const WhatToExpect = () => {
  const items = [
    { icon: Music, label: "Worship" },
    { icon: Heart, label: "Prayer" },
    { icon: BookOpen, label: "Word" },
    { icon: Users, label: "Panel" },
    { icon: HelpCircle, label: "Q&A" },
    { icon: Wrench, label: "Workshops" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-10">
          WHAT TO EXPECT
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 bg-unleash-cream rounded-xl shadow-sm"
            >
              <Icon className="w-8 h-8 text-unleash-orange" />
              <span className="text-unleash-brown font-medium text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Event Page
const EventPage = () => {
  return (
    <>
      <EventHero />
      <AboutUnleash />
      <EventDetails />
      <TwoDayExperience />
      <ProgrammeSection />
      <WhatToExpect />
      <VenueSection />
      <RegistrationCTA />
    </>
  );
};

export default EventPage;
