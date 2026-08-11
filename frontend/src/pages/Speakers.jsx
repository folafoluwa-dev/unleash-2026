import { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx";
import SpeakersHero from "../components/speakers/SpeakersHero.jsx";
import SpeakerIntro from "../components/speakers/SpeakerIntro.jsx";
import SpeakerGrid from "../components/speakers/SpeakerGrid.jsx";
import ThemeReminder from "../components/speakers/ThemeReminder.jsx";
import RegistrationCTA from "../components/RegistrationCTA.jsx";
import { getPublicSpeakers } from "../services/speakerService.js";

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await getPublicSpeakers();
        const list = data.results || data;
        if (!Array.isArray(list)) {
          setSpeakers([]);
          return;
        }
        // Map API fields to the format expected by SpeakerCard
        const mapped = list.map((speaker) => ({
          id: speaker.id,
          name: speaker.name,
          title: speaker.title || "Speaker",
          ministry: "", // not used but required by card
          bio: speaker.biography || "",
          image: speaker.photo || null,
          status: "announced", // active speakers are always announced
          socials: {},
        }));
        // Sort by display_order (backend may already sort, but just in case)
        mapped.sort((a, b) => a.display_order - b.display_order);
        setSpeakers(mapped);
      } catch (err) {
        setError("Unable to load speakers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  return (
    <>
      <main>
        <SpeakersHero />
        <SpeakerIntro />
        {loading && <div className="py-12 text-center">Loading speakers...</div>}
        {error && (
          <div className="py-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-unleash-orange text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && (
          <SpeakerGrid
            speakers={
              speakers.length > 0
                ? speakers
                : [
                    {
                      id: 0,
                      name: "Coming Soon",
                      title: "Speaker",
                      ministry: "",
                      bio: "",
                      image: null,
                      status: "coming-soon",
                    },
                  ]
            }
          />
        )}
        <ThemeReminder />
        <RegistrationCTA />
      </main>
      <Footer />
    </>
  );
};

export default SpeakersPage;
