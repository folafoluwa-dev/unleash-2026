import { MapPin } from "lucide-react";

const KingsCourtSection = () => {
  return (
    <section className="py-16 bg-unleash-cream">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
          KING'S COURT ASSEMBLY
        </h2>
        <p className="text-lg text-unleash-brown/80 mb-8 max-w-2xl mx-auto">
          Where the UNLEASH journey begins.
        </p>
        <div className="bg-white rounded-2xl p-8 shadow-md inline-block text-left max-w-lg mx-auto">
          <p className="font-bold text-unleash-brown text-xl mb-2">
            King's Court Assembly
          </p>
          <p className="text-unleash-brown/80 leading-relaxed">
            37 Olowora Road, by Deji Olowo Close, <br />
            beside Olowora Primary School, <br />
            Olowora Bus Stop, Ojodu Berger, Lagos.
          </p>
          <div className="mt-6">
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
      </div>
    </section>
  );
};

export default KingsCourtSection;