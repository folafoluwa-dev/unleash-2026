import { useState, useEffect } from "react";
import { useApi } from "../../services/api";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function SpeakersAdmin() {
  const authFetch = useApi();
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await authFetch("/api/speakers/");
        setSpeakers(data.results || data || []);
      } catch (err) {
        setError("Unable to load speakers.");
        console.error("Speakers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, [authFetch]);

  if (loading) return <div className="text-center py-12">Loading speakers...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl text-unleash-brown">Speakers</h1>
        <button className="inline-flex items-center gap-2 bg-unleash-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors">
          <Plus className="w-4 h-4" />
          Add Speaker
        </button>
      </div>

      {speakers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No speakers yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {speakers.map((speaker) => (
                <tr key={speaker.id} className="border-t">
                  <td className="p-3">{speaker.name}</td>
                  <td className="p-3">{speaker.title || "—"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      speaker.status === "announced" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {speaker.status || "Coming Soon"}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}