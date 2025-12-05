// import { createClient } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

// Khởi tạo Supabase client
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL || "https://ihtxxwitdibhlocwqhoq.supabase.co",
//   import.meta.env.VITE_SUPABASE_ANON_KEY ||
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlodHh4d2l0ZGliaGxvY3dxaG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjM4MDIsImV4cCI6MjA3Njc5OTgwMn0.ThaJapdkbVQGy1ROYpdoSnpOVz9zkLaHW65n2yKWR74"
// );

/**
 * Upload webhook response từ n8n vào Supabase
 *
 * n8n gửi dữ liệu JSON:
 * {
 *   "title": "Senior React Developer",
 *   "company": "Airecruit",
 *   "location": "Ho Chi Minh",
 *   "requirements": "React, Node.js",
 *   "benefits": "Competitive salary",
 *   "company_website": "https://careers.airecruit.com",
 *   "image_url": "https://...",
 *   "caption": "Job description",
 *   "status": "posted"
 * }
 */
export const uploadThreadPostToSupabase = async (data) => {
  try {
    const {
      title,
      company,
      location,
      requirements,
      benefits,
      company_website,
      image_url,
      caption,
      status,
      linkpost,
      idpost,
    } = data;

    console.log("📥 Nhận dữ liệu từ n8n webhook:", data);

    // Validate dữ liệu bắt buộc
    if (!title) {
      console.error("❌ Thiếu tiêu đề job");
      throw new Error("Thiếu tiêu đề (title)");
    }

    // Chuẩn bị payload để lưu vào job_posts table - MAP ĐÚNG CÁC TRƯỜNG
    const payload = {
      title: title,
      company: company || "Airecruit",
      location: location || null,
      requirements: requirements || null,
      benefits: benefits || null,
      company_website: company_website || null,
      image_url: image_url || null,
      caption: caption || null,
      status: status || "posted",
      category: "threads", // Mark as thread posting
      created_at: new Date().toISOString(),
      link_post: linkpost || null,
      id_post: idpost || null,
    };

    console.log("💾 Chuẩn bị lưu vào Supabase job_posts:", payload);

    // 💾 Lưu vào Supabase table "job_posts"
    const { data: result, error } = await supabase
      .from("job_posts")
      .insert([payload])
      .select();

    if (error) {
      console.error("❌ Lỗi Supabase:", error);
      throw error;
    }

    console.log("✅ Lưu thành công vào Supabase:", result);
    return {
      success: true,
      message: "✅ Dữ liệu đã được lưu vào Supabase job_posts",
      data: result,
    };
  } catch (err) {
    console.error("❌ Error uploadThreadPostToSupabase:", err);
    throw err;
  }
};
