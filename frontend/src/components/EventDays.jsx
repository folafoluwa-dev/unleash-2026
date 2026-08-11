import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const dayData = [
  {
    day: "SATURDAY",
    date: "SEPTEMBER 5, 2026",
    title: "UNLEASH",
    desc: "The main Unleash gathering.",
    link: "/event#day1",
  },
  {
    day: "SUNDAY",
    date: "SEPTEMBER 6, 2026",
    title: "PRAISE UNLEASHED",
    desc: "A dedicated praise and worship experience.",
    link: "/event#day2",
  },
];

const EventDays = () => {
  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {dayData.map((d) => (
          <div
            key={d.day}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <span className="inline-block bg-unleash-orange/10 text-unleash-orange text-sm font-bold px-3 py-1 rounded-full mb-4">
                {d.day}
              </span>
              <p className="text-unleash-brown/70 font-medium mb-2">{d.date}</p>
              <h3 className="font-display text-3xl md:text-4xl text-unleash-brown mb-4">
                {d.title}
              </h3>
              <p className="text-unleash-brown/80 mb-6">{d.desc}</p>
            </div>
            <Link
              to={d.link}
              className="inline-flex items-center gap-2 text-unleash-orange font-bold hover:gap-3 transition-all"
            >
              VIEW PROGRAMME <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventDays;