import { useState } from "react";

export default function ItineraryCard({ itinerary }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("days");

  const data = itinerary.itinerary || {};
  const shareUrl = `${window.location.origin}/share/${itinerary.shareToken}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.card}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>{data.title || itinerary.title}</h2>
          <p style={styles.summary}>{data.summary}</p>
        </div>
        <button onClick={handleCopy} style={styles.shareBtn}>
          {copied ? "✅ Copied!" : "🔗 Share"}
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {["days", "flights", "hotels"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent",
              color: activeTab === tab ? "#6366f1" : "#6b7280",
            }}
          >
            {tab === "days" ? "🗓 Day Plan" : tab === "flights" ? "✈️ Flights" : "🏨 Hotels"}
          </button>
        ))}
      </div>

      {/* Day Plan */}
      {activeTab === "days" && (
        <div>
          {(data.days || []).length === 0 ? (
            <p style={styles.empty}>No day plan generated.</p>
          ) : (
            (data.days || []).map((day, i) => (
              <div key={i} style={styles.dayBlock}>
                <div style={styles.dayHeader}>
                  <span style={styles.dayBadge}>Day {day.day}</span>
                  <span style={styles.dayDate}>{day.date} — {day.location}</span>
                </div>
                {(day.activities || []).map((act, j) => (
                  <div key={j} style={styles.activity}>
                    <span style={styles.actTime}>{act.time}</span>
                    <div>
                      <p style={styles.actName}>{act.activity}</p>
                      {act.notes && <p style={styles.actNotes}>{act.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {/* Flights */}
      {activeTab === "flights" && (
        <div>
          {(data.flights || []).length === 0 ? (
            <p style={styles.empty}>No flight details found.</p>
          ) : (
            (data.flights || []).map((f, i) => (
              <div key={i} style={styles.infoCard}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>✈️ Flight</span>
                  <span style={styles.infoValue}>{f.flightNo} — {f.airline}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>📍 Route</span>
                  <span style={styles.infoValue}>{f.from} → {f.to}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>🕐 Departure</span>
                  <span style={styles.infoValue}>{f.departure}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>🕓 Arrival</span>
                  <span style={styles.infoValue}>{f.arrival}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Hotels */}
      {activeTab === "hotels" && (
        <div>
          {(data.hotels || []).length === 0 ? (
            <p style={styles.empty}>No hotel details found.</p>
          ) : (
            (data.hotels || []).map((h, i) => (
              <div key={i} style={styles.infoCard}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>🏨 Hotel</span>
                  <span style={styles.infoValue}>{h.name}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>📍 Location</span>
                  <span style={styles.infoValue}>{h.location}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>📅 Check-in</span>
                  <span style={styles.infoValue}>{h.checkIn}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>📅 Check-out</span>
                  <span style={styles.infoValue}>{h.checkOut}</span>
                </div>
                {h.confirmationNo && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>🔖 Confirmation</span>
                    <span style={styles.infoValue}>{h.confirmationNo}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tips */}
      {(data.tips || []).length > 0 && (
        <div style={styles.tipsBox}>
          <p style={styles.tipsTitle}>💡 Travel Tips</p>
          {data.tips.map((tip, i) => (
            <p key={i} style={styles.tip}>• {tip}</p>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card:        { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" },
  header:      { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", gap: "1rem" },
  title:       { fontSize: "20px", fontWeight: 700, margin: "0 0 4px" },
  summary:     { fontSize: "13px", color: "#6b7280", margin: 0 },
  shareBtn:    { padding: "8px 16px", background: "#eef2ff", color: "#6366f1", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
  tabs:        { display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: "1.25rem" },
  tab:         { flex: 1, padding: "10px 0", fontSize: "13px", fontWeight: 500, border: "none", background: "transparent", cursor: "pointer", marginBottom: "-1px" },
  dayBlock:    { marginBottom: "1.25rem" },
  dayHeader:   { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  dayBadge:    { background: "#eef2ff", color: "#6366f1", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 },
  dayDate:     { fontSize: "13px", color: "#6b7280" },
  activity:    { display: "flex", gap: "12px", padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
  actTime:     { fontSize: "12px", color: "#9ca3af", minWidth: "70px", paddingTop: "2px" },
  actName:     { fontSize: "14px", fontWeight: 500, color: "#111", margin: 0 },
  actNotes:    { fontSize: "12px", color: "#6b7280", margin: "2px 0 0" },
  infoCard:    { background: "#f9fafb", borderRadius: "10px", padding: "14px", marginBottom: "12px" },
  infoRow:     { display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "4px 0" },
  infoLabel:   { color: "#6b7280" },
  infoValue:   { fontWeight: 500, color: "#111", textAlign: "right" },
  tipsBox:     { background: "#fffbeb", borderRadius: "10px", padding: "14px", marginTop: "1.25rem" },
  tipsTitle:   { fontSize: "13px", fontWeight: 600, color: "#92400e", margin: "0 0 8px" },
  tip:         { fontSize: "13px", color: "#78350f", margin: "4px 0" },
  empty:       { color: "#9ca3af", fontSize: "13px", textAlign: "center", padding: "2rem 0" },
};