import churchLogo from '../../assets/logo/love-of-christ-logo.svg';

const AboutChurch = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
            ABOUT US
          </h2>
          <p className="text-lg text-unleash-brown/80 leading-relaxed mb-4">
            Love of Christ Chapel International Ministry is the church behind King's Court Assembly and the home of the UNLEASH youth gathering.
          </p>
          <p className="text-lg text-unleash-brown/80 leading-relaxed">
            Through worship, the Word, fellowship and community, the church provides a place where people can grow in faith and purpose.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={churchLogo}
            alt="Love of Christ Chapel International Ministry logo"
            className="w-48 md:w-64 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutChurch;