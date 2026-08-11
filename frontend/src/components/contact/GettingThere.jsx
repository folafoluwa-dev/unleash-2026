import { MapPin } from "lucide-react";

const GettingThere = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-6">
          GETTING HERE
        </h2>
        <p className="text-lg text-unleash-brown/80 leading-relaxed mb-6">
          King's Court Assembly is located along Olowora Road near Olowora Primary School and Olowora Bus Stop, in the Ojodu Berger area of Lagos.
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
    </section>
  );
};

export default GettingThere;