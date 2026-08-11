import { useState, useEffect } from "react";
import { getEventSettings, updateEventSettings } from "../../services/eventSettingsService";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getEventSettings();
        setSettings(data);
      } catch (err) {
        setError("Unable to load settings.");
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      await updateEventSettings(settings);
      setSaveSuccess(true);
    } catch (err) {
      setSaveError("Failed to save settings.");
      console.log(err)
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading settings...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="font-display text-3xl text-unleash-brown mb-6">Event Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {saveSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              Settings saved successfully.
            </div>
          )}
          {saveError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {saveError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input
                type="text"
                name="event_name"
                value={settings.event_name || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <input
                type="text"
                name="theme"
                value={settings.theme || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={settings.start_date || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="end_date"
                value={settings.end_date || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="text"
                name="start_time"
                value={settings.start_time || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input
                type="text"
                name="venue"
                value={settings.venue || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                rows="2"
                value={settings.address || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="registration_open"
                checked={settings.registration_open || false}
                onChange={handleChange}
                className="h-4 w-4 text-unleash-orange rounded"
              />
              <label className="text-sm font-medium text-gray-700">Registration Open</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-unleash-orange text-white px-6 py-2.5 rounded-lg font-bold hover:bg-unleash-brown transition-colors disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}