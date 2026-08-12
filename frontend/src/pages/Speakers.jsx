import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import SpeakersHero from "../components/speakers/SpeakersHero";
import SpeakerIntro from "../components/speakers/SpeakerIntro";
import SpeakerGrid from "../components/speakers/SpeakerGrid";
import ThemeReminder from "../components/speakers/ThemeReminder";
import RegistrationCTA from "../components/RegistrationCTA";
import { getPublicSpeakers } from "../services/speakerService";
import { getMediaUrl } from "../utils/mediaUtils";

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
        const mapped = list.map((speaker) => ({
          id: speaker.id,
          name: speaker.name,
          title: speaker.title || "Speaker",
          ministry: "",
          bio: speaker.biography || "",
          image: getMediaUrl(speaker.photo),  // use resolved photo URL
          status: "announced",  // if the speaker is returned, they are active
          socials: {},
        }));
        setSpeakers(mapped);
      } catch (err) {
        setError("Unable to load speakers.");
        console.log(err)
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