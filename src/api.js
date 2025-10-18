import axios from "axios";

const BASE_URL = "/api/n8n/webhook/getCandidates"; // API n8n through proxy

export const fetchCandidates = async () => {
  try {
    console.log("Fetching candidates from:", BASE_URL);
    const res = await axios.get(BASE_URL);
    console.log("API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching candidates:", err);
    console.error("Error details:", err.response?.data || err.message);
    return [];
  }
};
