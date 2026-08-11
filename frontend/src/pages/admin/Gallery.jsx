import { useState, useEffect, useCallback } from "react";
import {
  Plus, Edit, Trash2, X, Eye, EyeOff, Image as ImageIcon,
} from "lucide-react";
import {
  getMedia, createMedia, updateMedia, deleteMedia,
} from "../../services/mediaService";

const CATEGORIES = ["event", "youth", "worship", "speakers", "church", "other"];

const emptyForm = {
  image: null,
  title: "",
  caption: "",
  category: "event",
  display_order: 0,
  is_active: true,
};

export default function AdminMedia() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "active", "inactive"
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMedia();
      const list = data.results || data;
      setMediaItems(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Unable to load media.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (mounted) setLoading(true);
      if (mounted) setError("");
      try {
        const data = await getMedia();
        if (!mounted) return;
        const list = data.results || data;
        setMediaItems(Array.isArray(list) ? list : []);
      } catch (err) {
        if (mounted) setError("Unable to load media.");
        console.log(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Filtering
  const filteredMedia = mediaItems.filter((item) => {
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchActive =
      activeFilter === "all" ||
      (activeFilter === "active" && item.is_active) ||
      (activeFilter === "inactive" && !item.is_active);
    return matchCategory && matchActive;
  });

  const openAdd = () => {
    setEditId(null);
    setFormData(emptyForm);
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      image: null,
      title: item.title || "",
      caption: item.caption || "",
      category: item.category || "event",
      display_order: item.display_order || 0,
      is_active: item.is_active,
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !formData.image) {
      setFormError("Please select an image.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("caption", formData.caption);
      fd.append("category", formData.category);
      fd.append("display_order", String(formData.display_order));
      fd.append("is_active", formData.is_active ? "true" : "false");
      if (formData.image) {
        fd.append("image", formData.image);
      }

      if (editId) {
        await updateMedia(editId, fd);
      } else {
        await createMedia(fd);
      }
      closeModal();
      fetchMedia();
    } catch (err) {
      const msg = err.response?.data?.detail || "Failed to save media.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (item) => {
    const newStatus = !item.is_active;
    try {
      await updateMedia(item.id, { is_active: newStatus });
      setMediaItems((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, is_active: newStatus } : m))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="text-center py-12">Loading media...</div>;
  if (error) return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">{error}</p>
      <button onClick={fetchMedia} className="bg-unleash-orange text-white px-6 py-2 rounded-lg">Try Again</button>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-unleash-brown">Media Library</h1>
          <p className="text-gray-500 mt-1">Manage photos and media displayed on the public website.</p>
        </div>
        <button
          onClick={openAdd}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-unleash-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload Media
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-unleash-orange"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeFilter === f ? "bg-white shadow text-unleash-brown" : "text-gray-500 hover:text-unleash-brown"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Hidden"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No media items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-4/3 bg-gray-100 relative">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title || "Media"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(item)}
                    className="bg-white/90 p-2 rounded-full mx-1 hover:bg-white"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => toggleActive(item)}
                    className="bg-white/90 p-2 rounded-full mx-1 hover:bg-white"
                    title={item.is_active ? "Hide" : "Show"}
                  >
                    {item.is_active ? <EyeOff className="w-4 h-4 text-gray-700" /> : <Eye className="w-4 h-4 text-gray-700" />}
                  </button>
                  {deleteConfirm === item.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                        title="Confirm delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="bg-white/90 p-2 rounded-full hover:bg-white"
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      className="bg-white/90 p-2 rounded-full mx-1 hover:bg-white"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-unleash-brown truncate">
                  {item.title || "Untitled"}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-unleash-cream text-unleash-brown px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className={`text-xs ${item.is_active ? "text-green-600" : "text-gray-400"}`}>
                    {item.is_active ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-unleash-brown">
                {editId ? "Edit Media" : "Upload Media"}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              {/* Image preview */}
              {formData.image && (
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="h-40 object-contain rounded-lg"
                  />
                </div>
              )}
              {!formData.image && editId && mediaItems.find((m) => m.id === editId)?.image && (
                <div className="flex justify-center">
                  <img
                    src={mediaItems.find((m) => m.id === editId).image}
                    alt="Current"
                    className="h-40 object-cover rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image {!editId && "*"}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <textarea
                  name="caption"
                  rows={2}
                  value={formData.caption}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-unleash-orange rounded"
                />
                <label className="text-sm font-medium text-gray-700">Active (visible on website)</label>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-unleash-orange text-white py-2.5 rounded-lg font-bold hover:bg-unleash-brown transition-colors disabled:opacity-70"
              >
                {submitting ? "Saving..." : editId ? "Update Media" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}