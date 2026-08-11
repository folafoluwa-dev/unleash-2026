import GalleryItem from "./GalleryItem";

const GalleryGrid = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="font-display text-2xl text-unleash-brown/50 mb-2">
          NO MOMENTS HERE YET
        </h3>
        <p className="text-unleash-brown/50">More photos will be added soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <GalleryItem key={image.id} image={image} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default GalleryGrid;