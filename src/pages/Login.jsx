import React, { useState } from "react";

const VALID_EMAIL = "hoducdoan2004@gmail.com";
const VALID_PASSWORD = "Ducdoan123.";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Simple credential check (replace with real API for production)
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        const fakeToken = `token_${Date.now()}`;
        localStorage.setItem("auth_token", fakeToken);
        onSuccess && onSuccess(fakeToken);
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <label className="block text-sm mb-1">Mật khẩu</label>
        <input
          type="password"
          className="w-full border rounded p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}


