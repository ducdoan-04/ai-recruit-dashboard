import axios from "axios";

const n8n = axios.create({
  baseURL: "/api/n8n", // Use proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// Gửi dữ liệu job đến workflow Facebook (qua proxy để tránh CORS khi dev)
export const postToFacebook = async (data) => {
  try {
    console.log("Posting to Facebook:", data);
    console.log("Proxy URL:", n8n.defaults.baseURL + "/webhook/job-post");
    const res = await n8n.post("/webhook/job-post", data);
    console.log("Facebook post response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting to Facebook:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    console.error("Error config:", err.config);
    throw err;
  }
};

// Gửi dữ liệu job đến workflow Twitter (qua proxy để tránh CORS khi dev)
export const postToTwitter = async (data) => {
  try {
    console.log("Posting to Twitter:", data);
    console.log("Proxy URL:", n8n.defaults.baseURL + "/webhook/post-twitter");
    const res = await n8n.post("/webhook/post-twitter", data);
    console.log("Twitter post response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting to Twitter:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    console.error("Error config:", err.config);
    throw err;
  }
};

// Lấy lịch phỏng vấn tuần này từ n8n (Webhook trả về { events: [...] })
export const getInterviewSchedule = async () => {
  try {
    console.log("Fetching schedule via proxy:", n8n.defaults.baseURL + "/webhook/get-schedule");
    const res = await n8n.get("/webhook/get-schedule");
    const data = res?.data ?? {};
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.events)) return data.events;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  } catch (err) {
    console.error("Error fetching interview schedule:", err);
    throw err;
  }
};

// Lấy danh sách ứng viên
export const getCandidates = async () => {
  try {
    console.log("Fetching candidates from n8n");
    console.log("Base URL:", n8n.defaults.baseURL);
    console.log(
      "Full URL will be:",
      n8n.defaults.baseURL + "/webhook/getCandidates"
    );
    const res = await n8n.get("/webhook/getCandidates");
    console.log("Candidates response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching candidates:", err);
    console.error("Error config:", err.config);
    throw err;
  }
};
