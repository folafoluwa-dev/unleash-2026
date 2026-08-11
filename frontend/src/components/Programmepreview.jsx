import { Link } from "react-router-dom";
import { Music, Heart, BookOpen, Users, HelpCircle, Wrench, Gamepad2 } from "lucide-react";

const activities = [
  { icon: Music, label: "Praise & Worship" },
  { icon: Heart, label: "Prayer" },
  { icon: BookOpen, label: "Preaching" },
  { icon: Users, label: "Panel Discussion" },
  { icon: HelpCircle, label: "Q&A" },
  { icon: Wrench, label: "Workshops" },
  { icon: Gamepad2, label: "Games" },
];

const ProgrammePreview = () => {
  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-10">
          WHAT'S HAPPENING
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
          {activities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm"
            >
              <Icon className="w-8 h-8 text-unleash-orange" />
              <span className="text-unleash-brown font-medium text-sm">{label}</span>
            </div>
          ))}
        </div>
        <Link
          to="/event#programme"
          className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
        >
          VIEW FULL PROGRAMME
        </Link>
      </div>
    </section>
  );
};

export default ProgrammePreview;