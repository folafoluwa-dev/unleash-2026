const categories = [
  { label: "ALL", value: "all" },
  { label: "WORSHIP", value: "worship" },
  { label: "PREACHING", value: "preaching" },
  { label: "FELLOWSHIP", value: "fellowship" },
  { label: "EVENT MOMENTS", value: "event-moments" },
];

const GalleryFilters = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto gap-2 px-4 py-4 max-w-6xl mx-auto">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
            activeCategory === cat.value
              ? "bg-unleash-orange text-white"
              : "bg-unleash-cream text-unleash-brown hover:bg-unleash-orange/20"
          }`}
          aria-pressed={activeCategory === cat.value}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilters;