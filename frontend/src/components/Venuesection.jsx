import { MapPin, Clock, Calendar } from "lucide-react";

const VenueSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Map placeholder */}
        <div className="bg-unleash-cream rounded-2xl h-64 md:h-full flex items-center justify-center">
          <div className="text-center text-unleash-brown/30">
            <MapPin className="w-16 h-16 mx-auto mb-2" />
            <p className="font-medium">Map placeholder</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
            WHERE TO FIND US
          </h2>
          <h3 className="text-2xl font-bold text-unleash-brown mb-4">
            King’s Court Assembly
          </h3>
          <p className="text-unleash-brown/80 leading-relaxed mb-4">
            37 Olowora Road, by Deji Olowo Close, <br />
            beside Olowora Primary School, <br />
            Olowora Bus Stop, Ojodu Berger, Lagos.
          </p>
          <div className="flex flex-col gap-2 text-unleash-brown/80 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-unleash-orange" />
              <span>8:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-unleash-orange" />
              <span>September 5–6, 2026</span>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=37+Olowora+Road+Ojodu+Berger+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
          >
            GET DIRECTIONS
          </a>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;