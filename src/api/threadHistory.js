import { supabase } from "../lib/supabaseClient";

/**
 * Lấy lịch sử Thread posts từ Supabase
 * Lọc theo category = "threads"
 * Trả về: caption, image_url, status, linkpost, idpost
 */
export const getThreadPostHistory = async () => {
  try {
    console.log("📥 Lấy lịch sử Thread posts từ Supabase...");

    const { data, error } = await supabase
      .from("job_posts")
      .select("id, caption, image_url, status, created_at, link_post, id_post")
      .eq("category", "threads")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Lỗi Supabase:", error);
      throw error;
    }

    console.log("✅ Lấy dữ liệu thành công:", data);

    // MAP lại tên trường để component dùng: link_post → linkpost, id_post → idpost
    const mappedData =
      data?.map((item) => ({
        ...item,
        linkpost: item.link_post,
        idpost: item.id_post,
      })) || [];

    return mappedData;
  } catch (err) {
    console.error("❌ Error getThreadPostHistory:", err);
    throw err;
  }
};
