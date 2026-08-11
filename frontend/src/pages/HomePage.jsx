import Hero from "../components/Hero.jsx";
import Countdown from "../components/Countdown.jsx";
import EventIntro from "../components/EventIntro.jsx";
import EventDays from "../components/EventDays.jsx";
import SpeakerPreview from "../components/SpeakerPreview.jsx";
import ProgrammePreview from "../components/ProgrammePreview.jsx";
import VenueSection from "../components/VenueSection.jsx";
import RegistrationCTA from "../components/RegistrationCTA.jsx";
import ChurchPreview from "../components/ChurchPreview.jsx";
import Footer from "../components/Footer.jsx";

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
