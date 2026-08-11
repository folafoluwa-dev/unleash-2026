import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GalleryLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close image"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        <p className="text-white/80 mt-4 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};

export default GalleryLightbox;