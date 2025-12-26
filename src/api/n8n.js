import axios from "axios";
import { uploadThreadPostToSupabase } from "./threadPostService.js";
import { supabase } from "../lib/supabaseClient";

// Read base URL from Vite env (import.meta.env). If not present, fall back to the public domain.
const BASE_URL =
  import.meta.env.VITE_N8N_BASE_URL || "https://n8n.airecruit.io.vn";

const n8n = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🆕 Gửi dữ liệu job + ảnh (base64) đến workflow Facebook và upload response lên Supabase
export const postToFacebook = async (data) => {
  try {
    console.log("Posting to Facebook:", data);
    console.log("Webhook URL:", n8n.defaults.baseURL + "/webhook/job-post");

    let payload = {
      title: data.title || '',
      company: data.company || 'Airecruit',
      schedule: data.schedule || '',
      link: data.link || '',
      requirements: data.requirements || '',
      benefits: data.benefits || '',
    };

    // 🆕 Nếu có ảnh, convert sang base64
    if (data.image instanceof File) {
      console.log("📸 Converting image to base64...");
      
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(data.image);
      });

      payload.image = base64; // ✅ Base64 string (với prefix: data:image/png;base64,...)
      payload.imageName = data.image.name; // ✅ Tên file (vd: photo.jpg)
      payload.imageType = data.image.type; // ✅ MIME type (vd: image/png)
      
      console.log("✅ Image converted to base64");
      console.log("Image name:", payload.imageName);
      console.log("Image type:", payload.imageType);
      console.log("Image size:", (base64.length / 1024).toFixed(2), "KB");
    }

    console.log("Sending payload as JSON (with base64 image)");
    const res = await n8n.post("/webhook/job-post", payload);
    console.log("Facebook post response:", res.data);
    console.log("Response type:", typeof res.data);
    console.log("Full response:", res);

    // 📤 Tự động upload response vào bảng fb_posting trên Supabase
    try {
      console.log("📤 Bắt đầu upload vào Supabase...");
      
      const responseData = res.data || res;
      console.log("📝 Response data để insert:", responseData);
      
      const insertData = {
        title: responseData?.title || "",
        company: responseData?.company || "Airecruit",
        jd_link: responseData?.jd_link || null,
        requirements: responseData?.requirements || null,
        benefits: responseData?.benefits || null,
        schedule_time: responseData?.schedule_time || null,
        caption: responseData?.caption || null,
        fb_image_id: responseData?.fb_image_id || null,
        fb_post_id: responseData?.fb_post_id || null,
        raw_fb_response: JSON.stringify(responseData),
        post_url: responseData?.post_url || null,
        status: responseData?.status || "success",
        raw_request: JSON.stringify(payload),
      };

      console.log("📝 Insert data chuẩn bị:", insertData);

      const { data: uploadRes, error: supabaseError } = await supabase
        .from("fb_posting")
        .insert([insertData]);

      if (supabaseError) {
        console.error("❌ Supabase error:", supabaseError);
        console.error("  Code:", supabaseError.code);
        console.error("  Message:", supabaseError.message);
        throw supabaseError;
      }

      console.log("✅ Supabase insert success:", uploadRes);

      return {
        n8nResponse: res.data,
        supabaseResponse: uploadRes,
      };
    } catch (supabaseErr) {
      console.error("❌ Supabase upload failed:", supabaseErr);
      console.error("Error details:", supabaseErr.message);
      throw supabaseErr;
    }

  } catch (err) {
    console.error("❌ Error posting to Facebook:", err);
    console.error("  Message:", err.message);
    if (err.response) {
      console.error("  Status:", err.response.status);
      console.error("  Data:", err.response.data);
    }
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

// Lấy danh sách ứng viên không có CV
export const getCandidatesNoCV = async () => {
  try {
    console.log("Fetching candidates from n8n");
    console.log("Base URL:", n8n.defaults.baseURL);
    console.log(
      "Full URL will be:",
      n8n.defaults.baseURL + "/webhook/getCandidatesNoCV"
    );
    const res = await n8n.get("/webhook/getCandidatesNoCV");
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
    console.log("🌐 [postToWebsite] Bắt đầu...");
    console.log("📋 Data:", data);
    console.log(
      "🔗 Webhook URL:",
      n8n.defaults.baseURL + "/webhook/job-post"
    );
    const res = await n8n.post("/webhook/job-post", data);
    console.log("✅ n8n response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error posting to Website:", err);
    console.error("Error status:", err.response?.status);
    console.error("Error data:", err.response?.data);
    console.error("Error config:", err.config);
    throw err;
  }
};

// Xóa thread post
export const deleteThreadPost = async (idpost) => {
  try {
    if (!idpost) {
      throw new Error("ID post không hợp lệ");
    }

    console.log("🗑️ Xóa thread post:", idpost);
    console.log(
      "Webhook URL:",
      "https://n8n.airecruit.io.vn/webhook/delete-thread"
    );

    const res = await axios.post(
      "https://n8n.airecruit.io.vn/webhook/delete-thread",
      {
        idpost: idpost,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Delete thread response:", res.data);

    // Mặc định success = false nếu không có response
    const responseData = {
      success: res.data?.success || false,
      ...res.data,
    };

    return responseData;
  } catch (err) {
    console.error("Error deleting thread post:", err);
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
      linkpost: res.data?.linkpost || null,
      idpost: res.data?.idpost || null,
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
