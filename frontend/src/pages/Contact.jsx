import Footer from "../components/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import LocationSection from "../components/contact/LocationSection";
import GettingThere from "../components/contact/GettingThere";
import ContactForm from "../components/contact/ContactForm";
import FAQ from "../components/contact/FAQ";
import ContactCTA from "../components/contact/ContactCTA";

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