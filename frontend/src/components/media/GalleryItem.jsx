import { Search } from "lucide-react";

const GalleryItem = ({ image, onClick }) => {
  return (
    <div
      className="group cursor-pointer relative overflow-hidden rounded-xl shadow-sm bg-unleash-cream"
      onClick={() => onClick(image.id)}
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-unleash-brown/0 group-hover:bg-unleash-brown/30 transition-colors duration-300 flex items-center justify-center">
        <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default GalleryItem;