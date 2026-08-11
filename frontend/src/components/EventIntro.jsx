const EventIntro = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-unleash-brown mb-6">
          A NEW SEASON. A NEW FIRE.
        </h2>
        <p className="text-lg text-unleash-brown/80 leading-relaxed mb-10">
          UNLEASH 3.0 is a youth‑focused gathering designed to bring young people together
          through worship, prayer, the Word, fellowship and meaningful conversations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {[
            { label: "Theme", value: "ACCELERATE" },
            { label: "Scripture", value: "1 Kings 18:46" },
            { label: "Date", value: "Sept 5–6, 2026" },
            { label: "Registration", value: "FREE" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-unleash-cream p-4 rounded-lg">
              <p className="text-xs uppercase tracking-widest text-unleash-orange font-semibold mb-1">
                {label}
              </p>
              <p className="font-bold text-unleash-brown">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventIntro;