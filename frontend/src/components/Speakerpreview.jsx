import { Link } from "react-router-dom";
import { User } from "lucide-react";

const speakers = [1, 2, 3];

const SpeakerPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-2">
          MEET THE SPEAKERS
        </h2>
        <p className="text-unleash-brown/70 text-lg mb-12">
          Powerful voices. One gathering. Names coming soon.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {speakers.map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className="w-28 h-28 bg-unleash-cream rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-unleash-brown/30" />
              </div>
              <p className="text-sm font-bold text-unleash-orange tracking-widest">
                SPEAKER
              </p>
              <p className="text-unleash-brown font-medium">COMING SOON</p>
            </div>
          ))}
        </div>
        <Link
          to="/speakers"
          className="inline-flex items-center gap-2 bg-unleash-brown text-white px-6 py-3 rounded-full font-bold hover:bg-unleash-dark-brown transition-colors"
        >
          VIEW ALL SPEAKERS
        </Link>
      </div>
    </section>
  );
};

export default SpeakerPreview;