import { MapPin } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
            FIND THE VENUE
          </h2>
          <h3 className="text-2xl font-bold text-unleash-brown mb-4">
            King’s Court Assembly
          </h3>
          <p className="text-unleash-brown/80 leading-relaxed mb-8">
            37 Olowora Road, by Deji Olowo Close, <br />
            Beside Olowora Primary School, <br />
            Olowora Bus Stop, Ojodu Berger, Lagos.
          </p>
          <a
            href="https://maps.google.com/?q=37+Olowora+Road+Ojodu+Berger+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-unleash-orange text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-brown transition-colors"
          >
            <MapPin className="w-4 h-4" />
            OPEN IN GOOGLE MAPS
          </a>
        </div>
        <div className="bg-white rounded-2xl h-64 md:h-80 flex items-center justify-center shadow-md overflow-hidden">
          {/* Placeholder for map – could be a static image or iframe later */}
          <div className="text-center text-unleash-brown/30">
            <MapPin className="w-16 h-16 mx-auto mb-2" />
            <p className="font-medium">Map placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;