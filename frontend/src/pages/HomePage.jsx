import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import EventIntro from "../components/EventIntro";
import EventDays from "../components/EventDays";
import SpeakerPreview from "../components/SpeakerPreview";
import ProgrammePreview from "../components/ProgrammePreview";
import VenueSection from "../components/VenueSection";
import RegistrationCTA from "../components/RegistrationCTA";
import ChurchPreview from "../components/ChurchPreview";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <main>
        <Hero />
        <Countdown />
        <EventIntro />
        <EventDays />
        <SpeakerPreview />
        <ProgrammePreview />
        <VenueSection />
        <RegistrationCTA />
        <ChurchPreview />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;