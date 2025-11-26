import axios from "axios";
import { uploadThreadPostToSupabase } from "./threadPostService.js";

// Read base URL from Vite env (import.meta.env). If not present, fall back to the public domain.
const BASE_URL =
  import.meta.env.VITE_N8N_BASE_URL || "https://n8n.airecruit.io.vn";

const n8n = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gửi dữ liệu job đến workflow Facebook (qua proxy để tránh CORS khi dev)
export const postToFacebook = async (data) => {
  try {
    console.log("Posting to Facebook:", data);
    console.log("Webhook URL:", n8n.defaults.baseURL + "/webhook/job-post");
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
    console.log("Webhook URL:", n8n.defaults.baseURL + "/webhook/post-twitter");
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
    console.log(
      "Fetching schedule from:",
      n8n.defaults.baseURL + "/webhook/get-schedule"
    );
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

// Đăng tin tuyển dụng lên website
export const postToWebsite = async (data) => {
  try {
    console.log("Posting to Website:", data);
    console.log(
      "Webhook URL:",
      n8n.defaults.baseURL + "/webhook/jobPostWebsite"
    );
    const res = await n8n.post("/webhook/jobPostWebsite", data);
    console.log("Website post response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting to Website:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    console.error("Error config:", err.config);
    throw err;
  }
};

// Gửi job post threads đến n8n workflow và tự động upload response lên Supabase
export const postJobThreads = async (data) => {
  try {
    console.log("Posting Job Threads:", data);
    console.log("Webhook URL:", n8n.defaults.baseURL + "/webhook/post-threads");

    // 1️⃣ Gửi dữ liệu tới n8n
    const res = await n8n.post("/webhook/post-threads", data);
    console.log("Job Threads post response:", res.data);

    // 2️⃣ Tự động upload response vào Supabase
    console.log("📤 Tự động upload response vào Supabase...");

    const uploadRes = await uploadThreadPostToSupabase({
      title: res.data?.title || data.title || "",
      company: res.data?.company || data.company || "Airecruit",
      location: res.data?.location || data.location || null,
      requirements: res.data?.requirements || data.requirements || null,
      benefits: res.data?.benefits || data.benefits || null,
      company_website:
        res.data?.company_website || res.data?.link || data.link || null,
      image_url: res.data?.image_url || null,
      caption: res.data?.caption || null,
      status: res.data?.status || "posted",
    });

    console.log("✅ Uploaded to Supabase:", uploadRes);

    return {
      n8nResponse: res.data,
      supabaseResponse: uploadRes,
    };
  } catch (err) {
    console.error("Error posting Job Threads:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    console.error("Error config:", err.config);
    throw err;
  }
};
