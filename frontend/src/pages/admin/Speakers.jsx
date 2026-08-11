import { useState, useEffect } from "react";
import { Plus, Edit, ToggleLeft, ToggleRight, X, Camera, Trash2 } from "lucide-react";
import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../../services/speakerService";

const emptyForm = {
  name: "",
  title: "",
  biography: "",
  display_order: 0,
  is_active: true,
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) setLoading(true);
      if (mounted) setError("");
      try {
        const data = await getSpeakers();
        if (!mounted) return;
        const list = data.results || data;
        setSpeakers(Array.isArray(list) ? list : []);
      } catch (err) {
        if (mounted) setError("Unable to load speakers.");
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setFormData(emptyForm);
    setFormError("");
    setShowModal(true);
  };

  const openEditModal = (speaker) => {
    setEditId(speaker.id);
    setFormData({
      name: speaker.name,
      title: speaker.title || "",
      biography: speaker.biography || "",
      display_order: speaker.display_order || 0,
      is_active: speaker.is_active,
      photo: null, // new file selection
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
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
      fd.append("is_active", formData.is_active);
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

  const toggleActive = async (speaker) => {
    const newStatus = !speaker.is_active;
    try {
      await updateSpeaker(speaker.id, { is_active: newStatus });
      setSpeakers((prev) =>
        prev.map((s) => (s.id === speaker.id ? { ...s, is_active: newStatus } : s))
      );
    } catch {
      // silently fail, could show toast
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSpeaker(id);
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirm(null);
    } catch {
      // error handling
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading speakers...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchSpeakers}
          className="bg-unleash-orange text-white px-6 py-2 rounded-lg hover:bg-unleash-brown transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-unleash-brown">Speakers</h1>
          <p className="text-gray-500 mt-1">Manage speakers for UNLEASH 3.0</p>
        </div>
        <button
          onClick={openAddModal}
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
                        src={speaker.photo}
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
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        speaker.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {speaker.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">{speaker.display_order}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(speaker)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleActive(speaker)}
                      className={`p-1 rounded ${
                        speaker.is_active
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                      title={speaker.is_active ? "Deactivate" : "Activate"}
                    >
                      {speaker.is_active ? (
                        <ToggleRight className="w-4 h-4" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </button>
                    {deleteConfirm === speaker.id ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(speaker.id)}
                          className="p-1 text-red-600 bg-red-50 rounded"
                          title="Confirm delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="p-1 text-gray-600 bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(speaker.id)}
                        className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-unleash-brown">
                {editId ? "Edit Speaker" : "Add Speaker"}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biography
                </label>
                <textarea
                  name="biography"
                  rows={3}
                  value={formData.biography}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
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
                <label className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo {editId && "(leave empty to keep current)"}
                </label>
                {editId && speakers.find((s) => s.id === editId)?.photo && (
                  <img
                    src={speakers.find((s) => s.id === editId).photo}
                    alt="Current"
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                )}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-unleash-orange text-white py-2.5 rounded-lg font-bold hover:bg-unleash-brown transition-colors disabled:opacity-70"
              >
                {submitting ? "Saving..." : editId ? "Update Speaker" : "Add Speaker"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}