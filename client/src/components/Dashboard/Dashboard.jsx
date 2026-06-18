import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api/axios";
import UploadZone    from "../Upload/UploadZone";
import ItineraryCard from "./ItineraryCard";

export default function Dashboard() {
  const { user, logout }          = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);

  const fetchItineraries = async () => {
    try {
      const { data } = await api.get("/itinerary");
      setItineraries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItineraries(); }, []);

  const handleNewItinerary = (itinerary) => {
    setItineraries((prev) => [itinerary, ...prev]);
    setSelected(itinerary);
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>✈️ Trrip</div>
        <p style={styles.welcome}>Hello, {user.name}!</p>

        <h4 style={styles.sidebarLabel}>Your Itineraries</h4>
        {loading ? (
          <p style={styles.hint}>Loading...</p>
        ) : itineraries.length === 0 ? (
          <p style={styles.hint}>No itineraries yet. Upload a document!</p>
        ) : (
          itineraries.map((it) => (
            <div
              key={it._id}
              onClick={() => setSelected(it)}
              style={{
                ...styles.sidebarItem,
                background: selected?._id === it._id ? "#eef2ff" : "transparent",
                color:      selected?._id === it._id ? "#6366f1" : "#374151",
              }}
            >
              🗺️ {it.title}
              <span style={styles.date}>
                {new Date(it.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
        <button style={styles.logoutBtn} onClick={logout}>Log out</button>
      </aside>

      {/* Main area */}
      <main style={styles.main}>
        <UploadZone onSuccess={handleNewItinerary} />

        {selected && (
          <ItineraryCard itinerary={selected} />
        )}
      </main>
    </div>
  );
}

const styles = {
  layout:      { display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" },
  sidebar:     { width: "260px", background: "#fff", borderRight: "1px solid #e5e7eb", padding: "1.5rem 1rem", display: "flex", flexDirection: "column" },
  logo:        { fontSize: "22px", fontWeight: 700, marginBottom: "0.5rem" },
  welcome:     { color: "#6b7280", fontSize: "13px", marginBottom: "1.5rem" },
  sidebarLabel:{ fontSize: "11px", textTransform: "uppercase", color: "#9ca3af", letterSpacing: "0.05em", margin: "0 0 8px" },
  sidebarItem: { padding: "10px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 500, marginBottom: "4px", display: "flex", flexDirection: "column", gap: "2px" },
  date:        { fontSize: "11px", color: "#9ca3af", fontWeight: 400 },
  hint:        { fontSize: "13px", color: "#9ca3af" },
  logoutBtn:   { marginTop: "auto", padding: "10px", background: "#f3f4f6", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 500 },
  main:        { flex: 1, padding: "2rem", background: "#f9fafb", overflowY: "auto" },
};