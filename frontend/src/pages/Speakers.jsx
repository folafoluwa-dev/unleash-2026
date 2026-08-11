import Footer from "../components/Footer";
import SpeakersHero from "../components/speakers/SpeakersHero";
import SpeakerIntro from "../components/speakers/SpeakerIntro";
import SpeakerGrid from "../components/speakers/SpeakerGrid";
import ThemeReminder from "../components/speakers/ThemeReminder";
import RegistrationCTA from "../components/RegistrationCTA";
import speakers from "../data/speakers";

const SpeakersPage = () => {
  return (
    <>
      <main>
        <SpeakersHero />
        <SpeakerIntro />
        <SpeakerGrid speakers={speakers} />
        <ThemeReminder />
        <RegistrationCTA />
      </main>
      <Footer />
    </>
  );
};

export default SpeakersPage;