import { useState, useEffect } from "react";
import {
  Plus, Edit, ToggleLeft, ToggleRight, X, Camera, Trash2,
} from "lucide-react";
import {
  getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker,
} from "../../services/speakerService";
import { getMediaUrl } from "../../utils/mediaUtils";

const emptyForm = {
  name: "",
  title: "",
  biography: "",
  display_order: 0,
  is_active: true,   // still keep in form for future use
  photo: null,
};

export default function SpeakersAdmin() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchSpeakers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSpeakers();
      const list = data.results || data;
      setSpeakers(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Unable to load speakers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSpeakers = async () => {
      await fetchSpeakers();
    };

    loadSpeakers();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setFormData(emptyForm);
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (speaker) => {
    setEditId(speaker.id);
    setFormData({
      name: speaker.name,
      title: speaker.title || "",
      biography: speaker.biography || "",
      display_order: speaker.display_order || 0,
      is_active: speaker.is_active ?? true,   // use ?? to default to true if undefined
      photo: null,
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
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Name is required.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("title", formData.title);
      fd.append("biography", formData.biography);
      fd.append("display_order", formData.display_order);
      // Only include is_active if the backend supports it; otherwise it's harmless but may be ignored
      fd.append("is_active", formData.is_active ? "true" : "false");
      if (formData.photo) {
        fd.append("photo", formData.photo);
      }

      if (editId) {
        await updateSpeaker(editId, fd);
      } else {
        await createSpeaker(fd);
      }
      closeModal();
      fetchSpeakers();
    } catch (err) {
      const msg = err.response?.data?.detail || "Failed to save speaker.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle active – only functional if is_active exists in API.
  // We'll still attempt PATCH, but if it fails, revert UI and show error.
  const toggleActive = async (speaker) => {
    const newStatus = !speaker.is_active;
    // Optimistic UI update
    setSpeakers(prev =>
      prev.map(s => (s.id === speaker.id ? { ...s, is_active: newStatus } : s))
    );
    try {
      await updateSpeaker(speaker.id, { is_active: newStatus });
    } catch (err) {
      // Revert
      setSpeakers(prev =>
        prev.map(s => (s.id === speaker.id ? { ...s, is_active: speaker.is_active } : s))
      );
      alert("Failed to update active status. Backend may not support it yet.");
      console.error("Toggle active failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSpeaker(id);
      setSpeakers(prev => prev.filter(s => s.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete speaker failed:", err);
    }
  };

  if (loading) return <div className="text-center py-12">Loading speakers...</div>;
  if (error) return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">{error}</p>
      <button onClick={fetchSpeakers} className="bg-unleash-orange text-white px-6 py-2 rounded-lg">Try Again</button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-unleash-brown">Speakers</h1>
          <p className="text-gray-500 mt-1">Manage speakers for UNLEASH 3.0</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-unleash-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Speaker
        </button>
      </div>

      {speakers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No speakers added yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Photo</th>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Order</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((speaker) => (
                <tr key={speaker.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {speaker.photo ? (
                      <img
                        src={getMediaUrl(speaker.photo)}
                        alt={speaker.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-unleash-cream flex items-center justify-center">
                        <Camera className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{speaker.name}</td>
                  <td className="p-3">{speaker.title || "—"}</td>
                  <td className="p-3">
                    {Object.prototype.hasOwnProperty.call(speaker, 'is_active') ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${speaker.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {speaker.is_active ? "Active" : "Inactive"}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3">{speaker.display_order}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEdit(speaker)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* Only show toggle if is_active exists */}
                    {Object.prototype.hasOwnProperty.call(speaker, 'is_active') && (
                      <button
                        onClick={() => toggleActive(speaker)}
                        className={`p-1 rounded ${speaker.is_active ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                        title={speaker.is_active ? "Deactivate" : "Activate"}
                      >
                        {speaker.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                    )}
                    {deleteConfirm === speaker.id ? (
                      <div className="inline-flex items-center gap-1">
                        <button onClick={() => handleDelete(speaker.id)} className="p-1 text-red-600 bg-red-50 rounded" title="Confirm delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(null)} className="p-1 text-gray-600 bg-gray-100 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(speaker.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-unleash-brown">
                  {editId ? "Edit Speaker" : "Add Speaker"}
                </h2>
                <p className="text-sm text-gray-500">Manage speaker details for UNLEASH 3.0.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-unleash-brown">Name</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-unleash-orange"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-unleash-brown">Title</span>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-unleash-orange"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-unleash-brown">Biography</span>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-unleash-orange"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-unleash-brown">Order</span>
                  <input
                    name="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-unleash-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-unleash-brown">Active</span>
                  <input
                    name="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="mt-3 h-5 w-5 text-unleash-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-unleash-brown">Photo</span>
                  <input
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-2 block w-full text-sm text-gray-600"
                  />
                </label>
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex flex-col md:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-full border border-gray-200 text-unleash-brown hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 rounded-full bg-unleash-orange text-white font-bold hover:bg-unleash-brown disabled:opacity-70"
                >
                  {submitting ? "Saving..." : editId ? "Update Speaker" : "Create Speaker"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}