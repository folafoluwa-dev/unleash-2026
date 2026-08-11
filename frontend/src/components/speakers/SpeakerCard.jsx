import { User } from "lucide-react";

const SpeakerCard = ({ speaker }) => {
  if (speaker.status === "announced") {
    // Future real speaker layout
    return (
      <div className="bg-unleash-cream rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="aspect-4/5 overflow-hidden bg-unleash-brown/10">
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-unleash-brown/30" />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl text-unleash-brown mb-1">
            {speaker.name}
          </h3>
          {speaker.title && (
            <p className="text-unleash-orange font-medium text-sm mb-1">
              {speaker.title}
            </p>
          )}
          {speaker.ministry && (
            <p className="text-unleash-brown/70 text-sm mb-4">
              {speaker.ministry}
            </p>
          )}
          {speaker.bio && (
            <p className="text-unleash-brown/80 text-sm mb-4 flex-1">
              {speaker.bio.length > 120
                ? `${speaker.bio.substring(0, 120)}...`
                : speaker.bio}
            </p>
          )}
          {/* Learn More button if needed (optional) */}
          <button className="mt-auto self-start text-unleash-orange font-bold text-sm hover:underline">
            VIEW PROFILE →
          </button>
        </div>
      </div>
    );
  }

  // Coming Soon card
  return (
    <div className="bg-unleash-cream rounded-2xl shadow-md p-8 flex flex-col items-center justify-center text-center h-full">
      <div className="w-28 h-28 bg-unleash-brown/5 rounded-full flex items-center justify-center mb-6">
        <User className="w-12 h-12 text-unleash-brown/20" />
      </div>
      <h3 className="font-display text-2xl text-unleash-brown/50 mb-2">
        COMING SOON
      </h3>
      <p className="text-unleash-brown/50 text-sm">
        Speaker details will be revealed soon.
      </p>
    </div>
  );
};

export default SpeakerCard;