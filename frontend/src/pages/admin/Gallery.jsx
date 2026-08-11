import { useState, useEffect } from "react";
import { useApi } from "../../services/api.js";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function GalleryAdmin() {
  const authFetch = useApi();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await authFetch("/api/gallery/");
        setImages(data.results || data || []);
      } catch (err) {
        setError("Unable to load gallery.");
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [authFetch]);

  if (loading) return <div className="text-center py-12">Loading gallery...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-unleash-brown">Gallery</h1>
        <button className="inline-flex items-center gap-2 bg-unleash-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors">
          <Plus className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No gallery images yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-3/2 bg-gray-100 relative">
                {img.image_url ? (
                  <img src={img.image_url} alt={img.title || "Gallery"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 text-sm">
                <p className="font-medium text-unleash-brown truncate">{img.title || "Untitled"}</p>
                <p className="text-gray-500">{img.category || "No category"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
