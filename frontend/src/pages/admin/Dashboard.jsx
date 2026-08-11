import { Link } from "react-router-dom";
import { Users, CheckCircle, Clock, UserCheck, XCircle } from "lucide-react";
import { useApiGet } from "../../hooks/useApiGet";

export default function Dashboard() {
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    endpointMissing: statsMissing,
  } = useApiGet("/api/registrations/admin/stats/");

  const {
    data: registrationsData,
    loading: regsLoading,
    error: regsError,
    endpointMissing: regsMissing,
  } = useApiGet("/api/registrations/admin/?ordering=-registered_at&limit=5");

  const loading = statsLoading || regsLoading;
  const error = statsError || regsError;
  const anyMissing = statsMissing || regsMissing;

  // Transform registrations data if needed
  const recentRegistrations = registrationsData
    ? Array.isArray(registrationsData.results)
      ? registrationsData.results.slice(0, 5)
      : Array.isArray(registrationsData)
      ? registrationsData.slice(0, 5)
      : []
    : [];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-unleash-orange" />
        <p className="mt-4 text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-unleash-orange text-white px-6 py-2 rounded-lg hover:bg-unleash-brown transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const cards = [
    { label: "Total Registrations", value: stats?.total ?? "—", icon: Users, color: "bg-blue-500" },
    { label: "Pending", value: stats?.pending ?? "—", icon: Clock, color: "bg-yellow-500" },
    { label: "Confirmed", value: stats?.confirmed ?? "—", icon: CheckCircle, color: "bg-green-500" },
    { label: "Attended", value: stats?.attended ?? "—", icon: UserCheck, color: "bg-purple-500" },
    { label: "Cancelled", value: stats?.cancelled ?? "—", icon: XCircle, color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-unleash-brown mb-6">Dashboard</h1>

      {anyMissing && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6">
          Some statistics are not yet available. The backend may still be under development.
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`${card.color} p-3 rounded-lg text-white`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-unleash-brown">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-unleash-brown">Recent Registrations</h2>
          <Link
            to="/admin/registrations"
            className="text-unleash-orange hover:underline font-medium text-sm"
          >
            View all →
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No registrations yet, or the data source is unavailable.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-medium">Registration ID</th>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Age</th>
                  <th className="text-left p-3 font-medium">City</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{reg.registration_id}</td>
                    <td className="p-3">{reg.full_name}</td>
                    <td className="p-3">{reg.email}</td>
                    <td className="p-3">{reg.age}</td>
                    <td className="p-3">{reg.city}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          reg.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : reg.status === "attended"
                            ? "bg-purple-100 text-purple-700"
                            : reg.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}