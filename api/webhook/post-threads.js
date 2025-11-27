import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://ihtxxwitdibhlocwqhoq.supabase.co",
  process.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlodHh4d2l0ZGliaGxvY3dxaG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjM4MDIsImV4cCI6MjA3Njc5OTgwMn0.ThaJapdkbVQGy1ROYpdoSnpOVz9zkLaHW65n2yKWR74"
);

/**
 * Vercel API Route: Nhận webhook từ n8n - Post Threads
 * POST /api/webhook/post-threads
 *
 * Nhận response từ n8n và upload vào Supabase job_posts table
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
    } = req.body;

    console.log("📥 Nhận webhook từ n8n:", req.body);

    // Validate dữ liệu bắt buộc
    if (!title) {
      console.error("❌ Thiếu tiêu đề job");
      return res.status(400).json({
        success: false,
        message: "❌ Thiếu tiêu đề (title)",
      });
    }

    // Chuẩn bị payload để lưu vào job_posts table
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
      category: "threads",
      created_at: new Date().toISOString(),
    };

    console.log("💾 Chuẩn bị lưu vào Supabase job_posts:", payload);

    // 💾 Lưu vào Supabase table "job_posts"
    const { data, error } = await supabase
      .from("job_posts")
      .insert([payload])
      .select();

    if (error) {
      console.error("❌ Lỗi Supabase:", error);
      return res.status(500).json({
        success: false,
        message: "❌ Lỗi lưu vào Supabase",
        error: error.message,
      });
    }

    console.log("✅ Lưu thành công vào Supabase:", data);

    return res.status(200).json({
      success: true,
      message: "✅ Dữ liệu đã được lưu vào Supabase job_posts",
      data: data,
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({
      success: false,
      message: "❌ Lỗi server xử lý webhook",
      error: err.message,
    });
  }
}
