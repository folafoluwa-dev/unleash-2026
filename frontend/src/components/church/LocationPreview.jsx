import { MapPin } from "lucide-react";

const LocationPreview = () => {
  return (
    <section className="py-12 bg-unleash-cream">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-6">
          FIND US
        </h2>
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md inline-block max-w-lg mx-auto">
          <p className="font-bold text-unleash-brown text-xl mb-2">
            King's Court Assembly
          </p>
          <p className="text-unleash-brown/80 leading-relaxed mb-6">
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
            GET DIRECTIONS
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationPreview;