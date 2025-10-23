import axios from "axios";

// Lấy base URL từ biến môi trường
const BASE_URL =
  import.meta.env.VITE_N8N_BASE_URL ||
  process.env.NEXT_PUBLIC_N8N_BASE_URL ||
  "https://n8n.airecruit.io.vn"; // fallback nếu chạy local

const ENDPOINT = `${BASE_URL}/webhook/getCandidates`;

export const fetchCandidates = async () => {
  try {
    console.log("Fetching candidates from:", ENDPOINT);
    const res = await axios.get(ENDPOINT);
    console.log("API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching candidates:", err);
    console.error("Error details:", err.response?.data || err.message);
    return [];
  }
};
