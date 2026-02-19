import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      setError("Failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="app-container">
      <div className="grid-container">

        {/* INPUT CARD */}
        <div className="card input-card">
          <h2>Smart Email Assistant</h2>

          <textarea
            placeholder="Original Email Content"
            rows="6"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />

          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="">Select Tone (Optional)</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Friendly">Friendly</option>
          </select>

          <button
            className="generate-btn"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
          >
            {loading ? "Generating..." : "Generate Reply"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        {/* OUTPUT CARD */}
        <div className="card output-card">
          <h3>Generated Reply</h3>

          <div className="output-box">
            {generatedReply ? (
              <ReactMarkdown>{generatedReply}</ReactMarkdown>
            ) : (
              "Your generated reply will appear here..."
            )}
          </div>

          {generatedReply && (
            <button className="copy-btn" onClick={copyText}>
              Copy to Clipboard
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
