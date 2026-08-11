import { Calendar, Clock, MapPin, BadgeCheck } from "lucide-react";

const EventSummary = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-unleash-cream rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-display text-2xl text-unleash-brown mb-1">
                UNLEASH 3.0
              </h3>
              <p className="text-unleash-orange font-bold text-lg">ACCELERATE</p>
            </div>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-unleash-orange shrink-0" />
                <span className="text-unleash-brown font-medium">
                  September 5–6, 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-unleash-orange shrink-0" />
                <span className="text-unleash-brown font-medium">8:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-unleash-orange shrink-0" />
                <span className="text-unleash-brown font-medium">
                  King’s Court Assembly, Ojodu Berger, Lagos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-unleash-green shrink-0" />
                <span className="text-unleash-green font-bold">FREE REGISTRATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSummary;