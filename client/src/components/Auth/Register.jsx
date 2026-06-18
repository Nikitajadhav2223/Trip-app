import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.user, data.token);       // auto login after register
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>✈️ Join Trrip</h2>
        <p style={styles.sub}>Create your account to get started</p>

        {error && <div style={styles.error}>{error}</div>}

        <input
          style={styles.input}
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Password (min. 8 characters)"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <p style={styles.link}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page:  { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" },
  card:  { background: "#fff", padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  title: { margin: 0, fontSize: "22px", fontWeight: 700 },
  sub:   { color: "#6b7280", fontSize: "14px", marginBottom: "1.5rem" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box" },
  btn:   { width: "100%", padding: "11px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" },
  error: { background: "#fef2f2", color: "#dc2626", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "12px" },
  link:  { textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "12px" },
};