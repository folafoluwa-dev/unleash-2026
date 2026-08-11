import Footer from "../components/Footer";
import ChurchHero from "../components/church/ChurchHero";
import AboutChurch from "../components/church/AboutChurch";
import KingsCourtSection from "../components/church/KingsCourtSection";
import UnleashConnection from "../components/church/UnleashConnection";
import LocationPreview from "../components/church/LocationPreview";
import ChurchCTA from "../components/church/ChurchCTA";

const ChurchPage = () => {
  return (
    <>
      <main>
        <ChurchHero />
        <AboutChurch />
        <KingsCourtSection />
        <UnleashConnection />
        <LocationPreview />
        <ChurchCTA />
      </main>
      <Footer />
    </>
  );
};

export default ChurchPage;