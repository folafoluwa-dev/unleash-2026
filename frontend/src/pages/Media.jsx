import { useState } from "react";
import Footer from "../components/Footer.jsx";
import MediaHero from "../components/media/MediaHero.jsx";
import MediaIntro from "../components/media/MediaIntro.jsx";
import FeaturedMemories from "../components/media/FeaturedMemories.jsx";
import GalleryGrid from "../components/media/GalleryGrid.jsx";
import GalleryLightbox from "../components/media/GalleryLightbox.jsx";
import MediaCTA from "../components/media/MediaCTA.jsx";
import galleryImages from "../data/gallery.js";

const MediaPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // No filtering – use all images directly
  const handleImageClick = (imageId) => {
    const index = galleryImages.findIndex((img) => img.id === imageId);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const goToPrev = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  const goToNext = () => {
    setLightboxIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <main>
        <MediaHero />
        <MediaIntro />
        <FeaturedMemories />
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-4">
              UNLEASH MOMENTS
            </h2>
            <p className="text-center text-unleash-brown/70 mb-8">
              Highlights from previous gatherings.
            </p>
            <div className="px-4">
              <GalleryGrid images={galleryImages} onImageClick={handleImageClick} />
            </div>
          </div>
        </section>
        <MediaCTA />
      </main>
      <Footer />

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </>
  );
};

export default MediaPage;
