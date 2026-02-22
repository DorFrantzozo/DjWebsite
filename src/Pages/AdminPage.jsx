import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, CalendarDays, MapPin, Clock, X, CheckCircle2 } from "lucide-react";
import { get, post, put, del, ENDPOINTS } from "../services/apiClient";
import Login from "../Components/Login";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  
  const [formData, setFormData] = useState({
    venueName: "",
    date: "",
    time: "",
    ticketsLink: "",
    description: "",
  });

  const fetchGigs = async () => {
    try {
      const data = await get(ENDPOINTS.GIGS);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const showToastMsg = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ venueName: "", date: "", time: "", ticketsLink: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (gig) => {
    setEditingId(gig._id);
    setFormData({
      venueName: gig.venueName || "",
      date: gig.date || "",
      time: gig.time || "",
      ticketsLink: gig.ticketsLink || "",
      description: gig.description || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await put(`${ENDPOINTS.GIGS}/${editingId}`, formData);
        showToastMsg("Gig updated successfully!");
      } else {
        await post(ENDPOINTS.GIGS, formData);
        showToastMsg("New gig added successfully!");
      }
      setShowModal(false);
      fetchGigs(); // Refresh state
    } catch (error) {
      console.error("Error saving gig:", error);
      alert("Failed to save gig.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await del(`${ENDPOINTS.GIGS}/${id}`);
        setEvents((prev) => prev.filter((gig) => gig._id !== id));
        showToastMsg("Gig deleted successfully!");
      } catch (error) {
        console.error("Error deleting gig:", error);
        alert("Failed to delete gig.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-500/90 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 backdrop-blur-md"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Gigs Dashboard
            </h1>
            <p className="text-white/60 mt-1">Manage your upcoming shows</p>
          </div>
          <div className="flex gap-3">
            <button
               onClick={() => {
                sessionStorage.removeItem("adminToken");
                window.location.href = '/admin-login';
              }}
              className="px-4 py-2 border border-white/10 hover:bg-white/10 rounded-xl transition-colors text-sm font-medium"
            >
              Logout
            </button>
            <button 
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-gradient-to-tr from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <Plus className="h-5 w-5" />
              Add New Gig
            </button>
          </div>
        </div>

        {/* List of Gigs */}
        <div className="grid gap-4">
          {events.length === 0 ? (
            <div className="text-center text-white/40 py-10 bg-white/5 rounded-2xl border border-white/5">
              No gigs found. Click 'Add New Gig' to get started.
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={event._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/[0.07] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold text-white/90 group-hover:text-orange-400 transition-colors">
                    {event.venueName}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-orange-400/80" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-orange-400/80" />
                      {event.time}
                    </span>
                    {event.description && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-orange-400/80" />
                        <span className="truncate max-w-[150px]">{event.description}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-2 md:mt-0 pt-4 md:pt-0 border-t border-white/10 md:border-none">
                  <button 
                    onClick={() => openEditModal(event)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal / Form */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-white">
                {editingId ? "Edit Gig" : "Add New Gig"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Venue Name / Title</label>
                  <input
                    type="text"
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Description / Location</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Tickets Link (Optional)</label>
                  <input
                    type="url"
                    name="ticketsLink"
                    value={formData.ticketsLink}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    {editingId ? "Update Event" : "Save Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
