import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, X, Download, RefreshCw, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { getRegistrations, getRegistration, updateRegistrationStatus } from "../../services/registrationService";

const STATUS_OPTIONS = ["all", "pending", "confirmed", "attended", "cancelled"];
const ITEMS_PER_PAGE = 10;

export default function Registrations() {
  // Data & UI state
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Detail modal state
  const [selectedId, setSelectedId] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusChangeMessage, setStatusChangeMessage] = useState("");

  // Cancel confirmation
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRegistrations();
      // normalise: expect { results: [...] } or array
      const list = data.results || data;
      setAllRegistrations(Array.isArray(list) ? list : []);
    } catch {
      setError("Unable to load registrations.");
      setAllRegistrations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRegistrations();
        const list = data.results || data;
        if (isMounted) {
          setAllRegistrations(Array.isArray(list) ? list : []);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load registrations.");
          setAllRegistrations([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ── Filtering + searching ──────────────────
  const filteredRegistrations = useMemo(() => {
    let result = allRegistrations;
    // status filter
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }
    // search (case-insensitive)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.registration_id.toLowerCase().includes(q) ||
          r.full_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          (r.phone_number && r.phone_number.includes(q)) ||
          r.city.toLowerCase().includes(q)
      );
    }
    // sort by newest first
    return [...result].sort((a, b) => new Date(b.registered_at) - new Date(a.registered_at));
  }, [allRegistrations, statusFilter, search]);

  // ── Pagination ──────────────────────────────
  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRegistrations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRegistrations, currentPage]);

  // ── Detail modal logic ──────────────────────
  const openDetail = async (registration) => {
    setSelectedId(registration.id);
    setDetailLoading(true);
    setDetailError("");
    try {
      const detail = await getRegistration(registration.id);
      setDetailData(detail);
    } catch {
      // fallback to table data
      setDetailData(registration);
      setDetailError("Could not load full details – showing available data.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedId(null);
    setDetailData(null);
    setDetailError("");
    setStatusChangeMessage("");
    setConfirmCancelId(null);
  };

  const handleStatusChange = async (newStatus) => {
    if (!detailData) return;

    // If cancelling, require confirmation
    if (newStatus === "cancelled" && confirmCancelId !== detailData.id) {
      setConfirmCancelId(detailData.id);
      return;
    }

    setUpdatingStatus(true);
    setStatusChangeMessage("");
    try {
      const updated = await updateRegistrationStatus(detailData.id, newStatus);
      // Update detail view
      setDetailData(updated);
      // Update the master list without refetching everything
      setAllRegistrations((prev) =>
        prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
      );
      setStatusChangeMessage("Registration status updated.");
      setConfirmCancelId(null);
    } catch {
      setStatusChangeMessage("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ── CSV Export ──────────────────────────────
  const exportCSV = () => {
    const headers = [
      "Registration ID",
      "Full Name",
      "Email",
      "Phone Number",
      "Age",
      "City",
      "Status",
      "Registered At",
    ];
    const rows = allRegistrations.map((r) => [
      r.registration_id,
      r.full_name,
      r.email,
      r.phone_number ?? "",
      r.age,
      r.city,
      r.status,
      new Date(r.registered_at).toLocaleString(),
    ]);
    const csvContent =
      [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "unleash-2026-registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ── Render helpers ─────────────────────────
  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      attended: "bg-purple-100 text-purple-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  // ── Loading / Error / Empty states ─────────
  if (loading && allRegistrations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-unleash-orange" />
        <p className="mt-4 text-gray-500">Loading registrations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchRegistrations}
          className="bg-unleash-orange text-white px-6 py-2 rounded-lg hover:bg-unleash-brown transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (allRegistrations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No registrations yet.</p>
        <p className="text-gray-400 text-sm mt-2">
          Registrations will appear here when attendees register for UNLEASH 3.0.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="font-display text-3xl text-unleash-brown">Registrations</h1>
          <p className="text-gray-500 mt-1">Manage attendees registered for UNLEASH 3.0.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <span className="text-sm font-medium bg-unleash-cream px-3 py-1 rounded-full">
            Total: {allRegistrations.length}
          </span>
          <button
            onClick={fetchRegistrations}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent bg-white"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "all" ? "All Statuses" : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium whitespace-nowrap">Registration ID</th>
              <th className="text-left p-3 font-medium whitespace-nowrap">Full Name</th>
              <th className="text-left p-3 font-medium whitespace-nowrap hidden md:table-cell">Email</th>
              <th className="text-left p-3 font-medium whitespace-nowrap hidden md:table-cell">Phone</th>
              <th className="text-left p-3 font-medium whitespace-nowrap">Age</th>
              <th className="text-left p-3 font-medium whitespace-nowrap hidden sm:table-cell">City</th>
              <th className="text-left p-3 font-medium whitespace-nowrap">Status</th>
              <th className="text-left p-3 font-medium whitespace-nowrap hidden lg:table-cell">Registered</th>
              <th className="text-right p-3 font-medium whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRegistrations.map((reg) => (
              <tr key={reg.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono text-xs whitespace-nowrap">{reg.registration_id}</td>
                <td className="p-3 whitespace-nowrap">{reg.full_name}</td>
                <td className="p-3 hidden md:table-cell">{reg.email}</td>
                <td className="p-3 hidden md:table-cell">{reg.phone_number || "—"}</td>
                <td className="p-3">{reg.age}</td>
                <td className="p-3 hidden sm:table-cell">{reg.city}</td>
                <td className="p-3 whitespace-nowrap">{statusBadge(reg.status)}</td>
                <td className="p-3 hidden lg:table-cell text-gray-500 whitespace-nowrap">
                  {new Date(reg.registered_at).toLocaleDateString()}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => openDetail(reg)}
                    className="inline-flex items-center gap-1 text-unleash-orange hover:underline font-medium text-xs"
                    aria-label="View registration"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing {Math.min(ITEMS_PER_PAGE, paginatedRegistrations.length)} of {filteredRegistrations.length} registrations
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                  page === currentPage
                    ? "bg-unleash-orange text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-unleash-brown">Registration Details</h2>
              <button onClick={closeDetail} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : detailData ? (
              <div className="p-6 space-y-4">
                {detailError && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-sm">
                    {detailError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Registration ID</p>
                    <p className="font-mono font-medium">{detailData.registration_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    {statusBadge(detailData.status)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{detailData.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{detailData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p>{detailData.phone_number || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p>{detailData.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{detailData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Additional Information</p>
                    <p>{detailData.additional_information || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registered At</p>
                    <p>{new Date(detailData.registered_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Updated At</p>
                    <p>{new Date(detailData.updated_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Status Change */}
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium mb-2">Change Status</p>
                  <div className="flex flex-wrap gap-2">
                    {["pending", "confirmed", "attended", "cancelled"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(s)}
                        disabled={updatingStatus || detailData.status === s}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          detailData.status === s
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : s === "cancelled"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-unleash-orange text-white hover:bg-unleash-brown"
                        } disabled:opacity-50`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                  {confirmCancelId === detailData.id && (
                    <div className="mt-3 bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-800">
                      Are you sure you want to cancel this registration?
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          Keep Registration
                        </button>
                        <button
                          onClick={() => handleStatusChange("cancelled")}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Cancel Registration
                        </button>
                      </div>
                    </div>
                  )}
                  {updatingStatus && (
                    <p className="text-sm text-gray-500 mt-2">Updating...</p>
                  )}
                  {statusChangeMessage && (
                    <p className="text-sm text-green-700 mt-2">{statusChangeMessage}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-red-600">Failed to load registration details.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}