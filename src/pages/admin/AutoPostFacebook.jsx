import React, { useState } from "react";
import { postToFacebook } from "../../api/n8n";
import { supabase } from "../../lib/supabaseClient";
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AutoPostFacebook() {
  const [activeTab, setActiveTab] = useState("post");
  const [form, setForm] = useState({
    title: "",
    company: "Airecruit",
    schedule: "",
    link: "",
    requirements: "",
    benefits: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      company: "Airecruit",
      schedule: "",
      link: "",
      requirements: "",
      benefits: "",
      image: null,
    });
    setImagePreview(null);
    setLastError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('❌ Chỉ chấp nhận file ảnh (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('❌ File ảnh không được vượt quá 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setForm({ ...form, image: file });
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      alert("⚠️ Vui lòng nhập tiêu đề job!");
      return;
    }
    if (!form.schedule.trim()) {
      alert("⚠️ Vui lòng chọn thời gian đăng!");
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        company: form.company,
        schedule: form.schedule,
        link: form.link,
        requirements: form.requirements,
        benefits: form.benefits,
        image: form.image,
        imageName: form.image?.name,
        imageType: form.image?.type,
      };
      
      console.log("Sending payload:", payload);
      await postToFacebook(payload);
      
      resetForm();
      
      alert("✅ Gửi job thành công! Bài sẽ được đăng theo lịch bạn đã chọn.");
    } catch (err) {
      console.error("Full error:", err);
      
      let errorMessage = "Lỗi không xác định";
      if (err.response?.status === 500) {
        errorMessage = "Lỗi server n8n (500).";
      } else if (err.response?.status === 404) {
        errorMessage = "Không tìm thấy endpoint n8n (404).";
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = "Lỗi kết nối mạng.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setLastError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-2 p-6 max-w-6xl mx-auto">
          <button
            onClick={() => setActiveTab("post")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "post"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📝 Đăng bài
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === "history"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📊 Lịch sử post
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
        {activeTab === "post" ? (
          <PostTab form={form} loading={loading} lastError={lastError} imagePreview={imagePreview} handleChange={handleChange} handleImageChange={handleImageChange} removeImage={removeImage} handleSubmit={handleSubmit} resetForm={resetForm} setLastError={setLastError} />
        ) : (
          <HistoryTab />
        )}
      </div>
    </div>
  );
}

function PostTab({ form, loading, lastError, imagePreview, handleChange, handleImageChange, removeImage, handleSubmit, resetForm, setLastError }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl">📘</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Auto Posting - Facebook</h2>
          <p className="text-gray-600">Đăng tin tuyển dụng lên Facebook tự động</p>
        </div>
      </div>
      
      {lastError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <p className="font-semibold">{lastError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📌 Tiêu đề Job *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Nhập tiêu đề công việc" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">🏢 Tên Công Ty</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Nhập tên công ty" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Ngày & Giờ Đăng *</label>
          <input type="datetime-local" name="schedule" value={form.schedule} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">🔗 Link JD </label>
          <input name="link" value={form.link} onChange={handleChange} placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">✅ Yêu Cầu Công Việc</label>
          <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="VD: 3+ năm kinh nghiệm, Tiếng Anh thành thạo,..." rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Quyền Lợi</label>
          <textarea name="benefits" value={form.benefits} onChange={handleChange} placeholder="VD: Lương cạnh tranh, làm việc linh hoạt, bảo hiểm đầy đủ,..." rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📸 Upload ảnh(Tùy Chọn)</label>
          {imagePreview ? (
            <div className="relative inline-block">
              <img src={imagePreview} alt="Preview" className="w-80 h-48 object-cover rounded-lg" />
              <button type="button" onClick={removeImage} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <PhotoIcon className="w-8 h-8 text-blue-600 mx-auto" />
              <p className="text-gray-700 font-semibold">Click để chọn ảnh</p>
            </label>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? "Đang gửi..." : "📘 Đăng Facebook"}
          </button>
          <button type="button" onClick={resetForm} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg">Làm mới</button>
        </div>
      </form>
    </>
  );
}

function HistoryTab() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [deleting, setDeleting] = useState(null);

  React.useEffect(() => {
    if (!hasLoaded) {
      loadData();
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log("🔄 Loading fb_posting data from Supabase...");
      const { data, error } = await supabase.from("fb_posting").select("*").order("created_at", { ascending: false }).limit(50);
      
      if (error) {
        console.error("❌ Supabase Select Error:", error);
        console.error("  Code:", error.code);
        console.error("  Message:", error.message);
        alert(`❌ Lỗi tải dữ liệu: ${error.message}`);
      } else {
        console.log("✅ Data loaded successfully:", data);
        setHistoryData(data || []);
      }
    } catch (err) {
      console.error("❌ Catch Error:", err);
      alert(`❌ Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa bài đăng này không?")) {
      return;
    }

    setDeleting(postId);
    try {
      console.log("🗑️ Deleting post with id:", postId);
      const { data, error } = await supabase.from("fb_posting").delete().eq("id", postId);
      
      console.log("Delete response:", { data, error });
      
      if (error) {
        console.error("❌ Delete Error:", error);
        console.error("  Code:", error.code);
        console.error("  Message:", error.message);
        alert(`❌ Xóa thất bại: ${error.message}`);
      } else {
        console.log("✅ Delete success!");
        alert("✅ Xóa thành công!");
        loadData();
      }
    } catch (err) {
      console.error("❌ Catch Error:", err);
      alert(`❌ Lỗi: ${err.message}`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">📊 Lịch sử post Facebook</h3>
        <button onClick={loadData} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          {loading ? "Đang tải..." : "Tải lại"}
        </button>
      </div>

      {loading && !historyData.length ? (
        <p className="text-center py-8 text-gray-600">Đang tải...</p>
      ) : historyData.length === 0 ? (
        <p className="text-center py-8 text-gray-600">Chưa có bài đăng</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{post.title || "N/A"}</td>
                <td className="px-4 py-3">{post.company || "N/A"}</td>
                <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-green-100 rounded text-xs">{post.status || "success"}</span></td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => handleDelete(post.id)} disabled={deleting === post.id} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:bg-gray-400 font-medium">
                    {deleting === post.id ? "⏳ Xóa..." : "🗑️ Xóa"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
