import { useState, useEffect, useMemo } from "react";
import Footer from "../components/Footer";
import MediaHero from "../components/media/MediaHero";
import MediaIntro from "../components/media/MediaIntro";
import GalleryFilters from "../components/media/GalleryFilters";
import GalleryGrid from "../components/media/GalleryGrid";
import GalleryLightbox from "../components/media/GalleryLightbox";
import MediaCTA from "../components/media/MediaCTA";
import { getPublicMedia } from "../services/mediaService";

const API_BASE = import.meta.env.VITE_API_URL || "";

const PUBLIC_CATEGORIES = [
  { label: "ALL", value: "all" },
  { label: "EVENT", value: "event" },
  { label: "YOUTH", value: "youth" },
  { label: "WORSHIP", value: "worship" },
  { label: "SPEAKERS", value: "speakers" },
  { label: "CHURCH", value: "church" },
  { label: "OTHER", value: "other" },
];

export default function MediaPage() {
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPublicMedia();
        const list = data.results || data;

        if (!Array.isArray(list)) {

          if (isMounted) setAllMedia([]);
          return;
        }

        // Map API fields to gallery-compatible format, resolve image URLs
        const mapped = list.map((item) => {
          let imageUrl = null;
          if (item.image) {
            imageUrl = item.image.startsWith("http")
              ? item.image
              : `${API_BASE.replace(/\/$/, "")}/${item.image.replace(/^\//, "")}`;
          }

          return {
            id: item.id,
            src: imageUrl,
            alt: item.title || item.caption || "UNLEASH media",
            category: (item.category || "event").toLowerCase(),
          };
        });
        // Add this right before setAllMedia(mapped);
console.log("Fetched and constructed images:", mapped);
        if (isMounted) setAllMedia(mapped);
      } catch (err) {
        if (isMounted) setError("Unable to load the gallery.");
        console.error("Failed to fetch public media:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMedia = useMemo(() => {
    if (activeCategory === "all") return allMedia;
    return allMedia.filter((m) => m.category === activeCategory.toLowerCase());
  }, [allMedia, activeCategory]);

  const handleImageClick = (imageId) => {
    const index = filteredMedia.findIndex((m) => m.id === imageId);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (filteredMedia.length === 0) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (filteredMedia.length === 0) return;
    setLightboxIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <main>
        <MediaHero />
        <MediaIntro />

        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-unleash-orange" />
            <p className="mt-4 text-gray-500">Loading gallery...</p>
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-unleash-orange text-white px-6 py-2 rounded-lg hover:bg-unleash-brown transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-unleash-brown text-center mb-4">
                UNLEASH MOMENTS
              </h2>
              <p className="text-center text-unleash-brown/70 mb-8">
                Highlights from previous gatherings.
              </p>
              <GalleryFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                categories={PUBLIC_CATEGORIES}
              />
              <div className="px-4">
                {filteredMedia.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500">No photos found for this category.</p>
                  </div>
                ) : (
                  <GalleryGrid images={filteredMedia} onImageClick={handleImageClick} />
                )}
              </div>
            </div>
          </section>
        )}

        <MediaCTA />
      </main>
      <Footer />

      {lightboxIndex !== null && filteredMedia.length > 0 && (
        <GalleryLightbox
          images={filteredMedia}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </div>
  );
}