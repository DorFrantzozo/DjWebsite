import { useState, useEffect } from "react";
import Login from "../Components/Login";
import { get, post, ENDPOINTS } from "../services/apiClient";

const PrivateDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("adminToken")
  );
  const [gigs, setGigs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    venueName: "",
    date: "",
    time: "",
    ticketsLink: "",
    description: "",
  });

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("adminToken", token);
  };

  const fetchGigs = async () => {
    try {
      const data = await get(ENDPOINTS.GIGS);
      setGigs(data);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchGigs();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post(ENDPOINTS.GIGS, formData);
      setShowForm(false);
      setFormData({ venueName: "", date: "", time: "", ticketsLink: "", description: "" });
      fetchGigs();
    } catch (error) {
      console.error("Error saving gig:", error);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("adminAuth");
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
          >
            {showForm ? "Cancel" : "Add New Event"}
          </button>
          
          <a
            href="/"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Go to Main Site
          </a>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">New Event Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                  <input
                    type="text"
                    name="venueName"
                    value={formData.venueName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tickets Link</label>
                  <input
                    type="url"
                    name="ticketsLink"
                    value={formData.ticketsLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="py-3 px-6 border-b">Venue</th>
                <th className="py-3 px-6 border-b">Date</th>
                <th className="py-3 px-6 border-b">Time</th>
                <th className="py-3 px-6 border-b">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {gigs.length > 0 ? (
                gigs.map((gig) => (
                  <tr key={gig._id} className="hover:bg-gray-50 border-b last:border-0 transition">
                    <td className="py-4 px-6 text-gray-800 font-medium">{gig.venueName}</td>
                    <td className="py-4 px-6 text-gray-600">{gig.date}</td>
                    <td className="py-4 px-6 text-gray-600">{gig.time}</td>
                    <td className="py-4 px-6">
                      {gig.ticketsLink ? (
                        <a
                          href={gig.ticketsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No events found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrivateDashboard;
