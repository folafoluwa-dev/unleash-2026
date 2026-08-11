import Footer from "../components/Footer.jsx";
import ContactHero from "../components/contact/ContactHero.jsx";
import ContactInfo from "../components/contact/ContactInfo.jsx";
import LocationSection from "../components/contact/LocationSection.jsx";
import GettingThere from "../components/contact/GettingThere.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import FAQ from "../components/contact/FAQ.jsx";
import ContactCTA from "../components/contact/ContactCTA.jsx";

const ContactPage = () => {
    return (
        <>
            <main>
                <ContactHero />
                <ContactInfo />
                <LocationSection />
                <GettingThere />
                <ContactForm />
                <FAQ />
                <ContactCTA />
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
