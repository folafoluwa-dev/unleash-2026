import Hero from "../components/Hero.jsx";
import Countdown from "../components/Countdown.jsx";
import EventIntro from "../components/EventIntro.jsx";
import EventDays from "../components/EventDays.jsx";
import ProgrammePreview from "../components/ProgrammePreview.jsx";
import VenueSection from "../components/VenueSection.jsx";
import RegistrationCTA from "../components/RegistrationCTA.jsx";
import ChurchPreview from "../components/ChurchPreview.jsx";
import Footer from "../components/Footer.jsx";
import SpeakerGrid from "../components/speakers/SpeakerGrid.jsx";
import { useState, useEffect } from "react";
import { getPublicSpeakers } from "../services/speakerService";
import { getMediaUrl } from "../utils/mediaUtils";


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [speakers, setSpeakers] = useState([]);
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
        <Hero />
        <Countdown />
        <EventIntro />
        <EventDays />
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
        )}        <ProgrammePreview />
        <VenueSection />
        <RegistrationCTA />
        <ChurchPreview />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
