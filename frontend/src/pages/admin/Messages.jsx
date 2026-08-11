import { useApiGet } from "../../hooks/useApiGet";
import { Mail } from "lucide-react"; // keep only used ones

export default function MessagesAdmin() {
  const { data, loading, error, endpointMissing } = useApiGet("/api/messages/");

  const messages = data
    ? Array.isArray(data.results)
      ? data.results
      : Array.isArray(data)
      ? data
      : []
    : [];

  if (loading) {
    return <div className="text-center py-12">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-unleash-brown mb-6">Messages</h1>

      {endpointMissing && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6">
          The messages endpoint is not available yet. Backend development may still be in progress.
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Subject</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t">
                  <td className="p-3">{msg.name}</td>
                  <td className="p-3">{msg.email}</td>
                  <td className="p-3">{msg.subject || "—"}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {msg.status || "New"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-unleash-orange hover:underline font-medium text-xs">
                      View
                    </button>
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