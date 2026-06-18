import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import ItineraryCard from "../Dashboard/ItineraryCard";

export default function SharedView() {
  const { token } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/itinerary/share/${token}`);
        setItinerary(data);
      } catch {
        setError("This share link is invalid or has expired.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  if (loading) return (
    <div style={styles.center}>
      <p style={styles.loadingText}>🔄 Loading itinerary...</p>
    </div>
  );

  if (error) return (
    <div style={styles.center}>
      <p style={styles.errorText}>❌ {error}</p>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <span style={styles.bannerText}>✈️ Trrip — Shared Itinerary</span>
        <a href="/register" style={styles.bannerLink}>Create your own →</a>
      </div>
      <div style={styles.content}>
        <ItineraryCard itinerary={itinerary} />
      </div>
    </div>
  );
}

const styles = {
  page:        { minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui, sans-serif" },
  center:      { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" },
  loadingText: { fontSize: "16px", color: "#6b7280" },
  errorText:   { fontSize: "16px", color: "#dc2626" },
  banner:      { background: "#6366f1", color: "#fff", padding: "12px 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
  bannerText:  { fontSize: "15px", fontWeight: 600 },
  bannerLink:  { color: "#fff", fontSize: "13px", textDecoration: "underline" },
  content:     { maxWidth: "720px", margin: "2rem auto", padding: "0 1rem" },
};