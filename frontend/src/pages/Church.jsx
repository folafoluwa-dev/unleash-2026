import Footer from "../components/Footer.jsx";
import ChurchHero from "../components/church/ChurchHero.jsx";
import AboutChurch from "../components/church/AboutChurch.jsx";
import KingsCourtSection from "../components/church/KingsCourtSection.jsx";
import UnleashConnection from "../components/church/UnleashConnection.jsx";
import LocationPreview from "../components/church/LocationPreview.jsx";
import ChurchCTA from "../components/church/ChurchCTA.jsx";

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
