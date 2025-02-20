import { useState } from "react";
import * as Sentry from "@sentry/browser";

export default function FraudSystem() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheckFraud = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      console.log("Sending fraud check for email:", email);
      const response = await fetch("/api/fraudCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      if (!response.ok) {
        throw new Error("Fraud check request failed");
      }
      const data = await response.json();
      console.log("Fraud check response:", data);
      setResult(data.isFraud);
    } catch (err) {
      console.error("Error in fraud check:", err);
      Sentry.captureException(err);
      setError("Failed to perform fraud check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Fraud System</h2>
      <form onSubmit={handleCheckFraud} className="flex flex-col gap-2">
        <label htmlFor="fraud-email" className="text-sm">
          Enter Email:
        </label>
        <input
          id="fraud-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="box-border p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Fraud Status"}
        </button>
      </form>
      {result !== null && (
        <div className="mt-2 text-sm">
          Fraud Check Result:{" "}
          <span className={result ? "text-red-500" : "text-green-500"}>
            {result ? "Fraudulent" : "Not Fraudulent"}
          </span>
        </div>
      )}
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}