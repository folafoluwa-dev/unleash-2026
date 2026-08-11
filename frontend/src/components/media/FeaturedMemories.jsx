import galleryImages from "../../data/gallery.js";

const FeaturedMemories = () => {
  const featured = galleryImages.filter((img) => img.featured).slice(0, 5);
  if (featured.length === 0) return null;

  const [main, ...rest] = featured;

  return (
    <section className="py-12 bg-unleash-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-8 text-center">
          FEATURED MEMORIES
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main large image */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-md group cursor-pointer">
              <img
                src={main.src}
                alt={main.alt}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          {/* Side smaller images stacked */}
          <div className="grid grid-rows-2 gap-6">
            {rest.slice(0, 2).map((img) => (
              <div key={img.id} className="aspect-[3/2] overflow-hidden rounded-2xl shadow-md group cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMemories;
