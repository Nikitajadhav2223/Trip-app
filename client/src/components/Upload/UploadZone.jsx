import { useState, useCallback } from "react";
import api from "../../api/axios";

export default function UploadZone({ onSuccess }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = [...e.dataTransfer.files];
    setFiles(dropped);
    setError("");
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setError("");
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError("Please select at least one file.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("documents", f));
      const { data } = await api.post("/upload", formData);
      onSuccess(data.itinerary);
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>✈️ Upload Travel Documents</h2>
      <p style={styles.sub}>Upload your flight tickets, hotel bookings, or travel documents</p>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          ...styles.dropZone,
          borderColor: dragging ? "#6366f1" : "#d1d5db",
          background: dragging ? "#eef2ff" : "#fafafa",
        }}
      >
        <div style={styles.dropIcon}>📁</div>
        <p style={styles.dropText}>
          {dragging ? "Drop files here!" : "Drag & drop files here"}
        </p>
        <p style={styles.dropSub}>PDF, JPG, PNG up to 10MB</p>

        <label style={styles.browseBtn}>
          Browse Files
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <div style={styles.fileList}>
          {files.map((f, i) => (
            <div key={i} style={styles.fileItem}>
              <span>{f.type.includes("pdf") ? "📄" : "🖼️"} {f.name}</span>
              <span style={styles.fileSize}>{(f.size / 1024).toFixed(1)} KB</span>
            </div>
          ))}
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}

      <button
        onClick={handleUpload}
        disabled={loading || !files.length}
        style={{
          ...styles.uploadBtn,
          opacity: loading || !files.length ? 0.6 : 1,
          cursor: loading || !files.length ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <span>🤖 Generating itinerary with AI...</span>
        ) : (
          <span>✨ Upload & Generate Itinerary</span>
        )}
      </button>

      {loading && (
        <p style={styles.loadingHint}>
          This may take 15–30 seconds. Please wait...
        </p>
      )}
    </div>
  );
}

const styles = {
  wrapper:     { background: "#fff", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" },
  heading:     { fontSize: "18px", fontWeight: 700, margin: "0 0 4px" },
  sub:         { color: "#6b7280", fontSize: "13px", marginBottom: "1.25rem" },
  dropZone:    { border: "2px dashed", borderRadius: "12px", padding: "2.5rem 1rem", textAlign: "center", transition: "all 0.2s", cursor: "pointer" },
  dropIcon:    { fontSize: "36px", marginBottom: "8px" },
  dropText:    { fontSize: "15px", fontWeight: 600, color: "#374151", margin: "0 0 4px" },
  dropSub:     { fontSize: "12px", color: "#9ca3af", marginBottom: "1rem" },
  browseBtn:   { display: "inline-block", padding: "8px 20px", background: "#6366f1", color: "#fff", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" },
  fileList:    { margin: "1rem 0", background: "#f9fafb", borderRadius: "8px", padding: "10px 14px" },
  fileItem:    { display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "4px 0", color: "#374151" },
  fileSize:    { color: "#9ca3af" },
  error:       { background: "#fef2f2", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", margin: "12px 0" },
  uploadBtn:   { width: "100%", padding: "12px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, marginTop: "12px" },
  loadingHint: { textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "8px" },
};