import { useState, useEffect } from "react";
import { useApi } from "../../services/api.js";

export default function EventAdmin() {
  const authFetch = useApi();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await authFetch("/api/event-settings/");
        setEvent(data);
      } catch (err) {
        setError("Unable to load event details.");
        console.error("Event fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [authFetch]);

  const handleSave = async () => {
    // Placeholder: will send PUT request later
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="text-center py-12">Loading event...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="font-display text-3xl text-unleash-brown mb-6">Event Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-bold text-unleash-brown mb-4">Event Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input type="text" defaultValue={event?.name || "UNLEASH 3.0"} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <input type="text" defaultValue={event?.theme || "ACCELERATE"} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bible Reference</label>
              <input type="text" defaultValue={event?.bible_ref || "1 Kings 18:46"} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="text" defaultValue="September 5–6, 2026" className="w-full px-3 py-2 border rounded-lg" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="text" defaultValue="8:00 AM" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input type="text" defaultValue="King's Court Assembly" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea rows="3" defaultValue="37 Olowora Road, by Deji Olowo Close..." className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Registration Settings */}
        <div>
          <h2 className="text-xl font-bold text-unleash-brown mb-4">Registration Settings</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span className="text-sm">Registration Open</span>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-unleash-orange text-white px-6 py-2.5 rounded-lg font-bold hover:bg-unleash-brown transition-colors"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
