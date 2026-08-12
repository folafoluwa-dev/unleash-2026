import { useState, useEffect } from "react";
import {
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "../../services/messageService";
import { Search, X, Eye, Trash2 } from "lucide-react";

const STATUSES = ["new", "open", "closed"];

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMessages();
      const list = data.results || data;
      setMessages(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Unable to load messages.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };

    loadMessages();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    const matchStatus = statusFilter === "all" || msg.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      (msg.name && msg.name.toLowerCase().includes(q)) ||
      (msg.email && msg.email.toLowerCase().includes(q)) ||
      (msg.subject && msg.subject.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  const openDetail = async (message) => {
    setDetailLoading(true);
    setStatusMessage("");
    try {
      const detail = await getMessage(message.id);
      setSelectedMessage(detail);
      setNewStatus(detail.status);
    } catch {
      setSelectedMessage(message);
      setNewStatus(message.status);
    } finally {
      setDetailLoading(false);
      setShowDetail(true);
    }
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedMessage(null);
    setStatusMessage("");
  };

  const handleStatusChange = async () => {
    if (!selectedMessage || newStatus === selectedMessage.status) return;
    setSavingStatus(true);
    setStatusMessage("");
    try {
      const updated = await updateMessage(selectedMessage.id, {
        status: newStatus,
      });
      setSelectedMessage(updated);
      setMessages((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
      setStatusMessage("Status updated.");
    } catch {
      setStatusMessage("Failed to update status.");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setDeleteConfirm(null);
      if (selectedMessage?.id === id) closeDetail();
    } catch (err){
      console.log(err)
    }
  };

  if (loading)
    return <div className="text-center py-12">Loading messages...</div>;
  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchMessages}
          className="bg-unleash-orange text-white px-6 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div>
      <h1 className="font-display text-3xl text-unleash-brown mb-6">
        Messages
      </h1>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unleash-orange focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-unleash-orange"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Messages Table */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">
                  Email
                </th>
                <th className="text-left p-3 font-medium">Subject</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">
                  Date
                </th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{msg.name}</td>
                  <td className="p-3 hidden sm:table-cell">{msg.email}</td>
                  <td className="p-3">{msg.subject || "—"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        msg.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : msg.status === "open"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-3 hidden md:table-cell text-gray-500">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => openDetail(msg)}
                      className="text-unleash-orange hover:underline font-medium text-xs"
                    >
                      <Eye className="w-4 h-4 inline mr-1" />
                      View
                    </button>
                    {deleteConfirm === msg.id ? (
                      <>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="text-red-600 font-medium text-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-500 text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(msg.id)}
                        className="text-red-400 hover:text-red-600 text-xs"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-unleash-brown">Message</h2>
              <button
                onClick={closeDetail}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {detailLoading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">
                    {selectedMessage.name} ({selectedMessage.email})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p>{selectedMessage.subject || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  Received:{" "}
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </div>

                {/* Status Change */}
                <div className="border-t pt-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-unleash-orange"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleStatusChange}
                      disabled={
                        savingStatus || newStatus === selectedMessage.status
                      }
                      className="bg-unleash-orange text-white px-4 py-2 rounded-lg font-bold hover:bg-unleash-brown transition-colors disabled:opacity-50"
                    >
                      {savingStatus ? "Saving..." : "Save"}
                    </button>
                  </div>
                  {statusMessage && (
                    <p
                      className={`text-sm mt-2 ${
                        statusMessage.includes("Failed")
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {statusMessage}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}