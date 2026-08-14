import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [allPincodes, setAllPincodes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/pincodes`)
      .then((res) => res.json())
      .then((data) => setAllPincodes(data))
      .catch(() => setAllPincodes([]));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/pincode/${pincode}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data);
        setHistory((prev) => [data, ...prev.filter((h) => h.pincode !== data.pincode)].slice(0, 8));
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>📍 Bangalore Pincode Explorer</h1>
        <p style={styles.subtitle}>Enter a Bangalore pincode to find its area name.</p>

        <form onSubmit={handleSearch} style={styles.form}>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.trim())}
            placeholder="e.g. 560034"
            maxLength={6}
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}

        {result && (
          <div style={styles.result}>
            <span style={styles.resultPincode}>{result.pincode}</span>
            <span style={styles.resultArrow}>→</span>
            <span style={styles.resultArea}>{result.area}</span>
          </div>
        )}

        {history.length > 0 && (
          <div style={styles.historySection}>
            <h2 style={styles.historyTitle}>Recent Searches</h2>
            <ul style={styles.historyList}>
              {history.map((h) => (
                <li key={h.pincode} style={styles.historyItem}>
                  <span style={styles.historyPincode}>{h.pincode}</span>
                  <span>{h.area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <details style={styles.details}>
          <summary style={styles.summary}>
            Browse all {allPincodes.length} pincodes in the dataset
          </summary>
          <ul style={styles.allList}>
            {allPincodes.map((p) => (
              <li key={p.pincode} style={styles.allItem}>
                <span style={styles.historyPincode}>{p.pincode}</span>
                <span>{p.area}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    padding: "48px 16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: 480,
    background: "#1e293b",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 24,
  },
  form: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#f8fafc",
    fontSize: 16,
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "none",
    background: "#6366f1",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    marginTop: 16,
    padding: "10px 14px",
    background: "#450a0a",
    color: "#fca5a5",
    borderRadius: 8,
    fontSize: 14,
  },
  result: {
    marginTop: 20,
    padding: "16px 18px",
    background: "#0f172a",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 18,
    border: "1px solid #334155",
  },
  resultPincode: { color: "#818cf8", fontWeight: 700 },
  resultArrow: { color: "#64748b" },
  resultArea: { color: "#f8fafc", fontWeight: 600 },
  historySection: { marginTop: 28 },
  historyTitle: { color: "#cbd5e1", fontSize: 14, marginBottom: 8 },
  historyList: { listStyle: "none", padding: 0, margin: 0 },
  historyItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #334155",
    color: "#e2e8f0",
    fontSize: 14,
  },
  historyPincode: { color: "#818cf8", fontWeight: 600 },
  details: { marginTop: 24, color: "#94a3b8", fontSize: 13 },
  summary: { cursor: "pointer", color: "#94a3b8", marginBottom: 8 },
  allList: {
    listStyle: "none",
    padding: 0,
    margin: "12px 0 0 0",
    maxHeight: 240,
    overflowY: "auto",
  },
  allItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #1e293b",
    fontSize: 13,
    color: "#cbd5e1",
  },
};

export default App;
