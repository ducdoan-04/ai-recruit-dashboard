import React, { useState } from "react";
import { postToFacebook } from "../../api/n8n";

export default function AutoPostFacebook() {
  const [form, setForm] = useState({
    title: "",
    company: "Airecruit",
    schedule: "",
    link: "",
    requirements: "",
    benefits: "",
  });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);

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
    });
    setLastError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
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
      // Map form data to match n8n expected format
      const payload = {
        title: form.title,
        company: form.company,
        schedule_time: form.schedule, // Map schedule to schedule_time
        link: form.link,
        requirements: form.requirements,
        benefits: form.benefits,
      };
      
      console.log("Sending payload:", payload);
      await postToFacebook(payload);
      
      // Clear form after successful post
      resetForm();
      
      alert("✅ Gửi job thành công! Bài sẽ được đăng theo lịch bạn đã chọn.");
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      
      // Handle different types of errors
      let errorMessage = "Lỗi không xác định";
      
      if (err.response?.status === 500) {
        errorMessage = "Lỗi server n8n (500). Có thể workflow n8n đang gặp vấn đề. Vui lòng thử lại sau hoặc liên hệ admin.";
      } else if (err.response?.status === 404) {
        // Check if it's a specific n8n webhook error
        if (err.response?.data?.message?.includes("webhook") && err.response?.data?.message?.includes("not registered")) {
          errorMessage = `Webhook n8n chưa được kích hoạt! ${err.response.data.message}. Vui lòng đảm bảo workflow n8n đã được active.`;
        } else {
          errorMessage = "Không tìm thấy endpoint n8n (404). Vui lòng kiểm tra cấu hình.";
        }
      } else if (err.response?.status === 400) {
        errorMessage = "Dữ liệu không hợp lệ (400). Vui lòng kiểm tra lại thông tin.";
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
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
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto mt-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-2xl">
          📘
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Auto Posting - Facebook</h2>
          <p className="text-gray-600">Đăng tin tuyển dụng lên Facebook tự động</p>
        </div>
      </div>
      
      {lastError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <p className="font-semibold text-red-800">Lỗi gần nhất:</p>
              <p className="text-sm text-red-600 mt-1">{lastError}</p>
              <button 
                onClick={() => setLastError(null)}
                className="mt-2 text-xs text-red-600 underline hover:text-red-800 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề job *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề công việc"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Công ty</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Tên công ty"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Thời gian đăng *</label>
          <input
            type="datetime-local"
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link JD</label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Yêu cầu công việc</label>
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Mô tả yêu cầu công việc..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quyền lợi</label>
          <textarea
            name="benefits"
            value={form.benefits}
            onChange={handleChange}
            placeholder="Mô tả quyền lợi..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang gửi...
              </span>
            ) : (
              "📘 Đăng lên Facebook"
            )}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
          >
            🔄 Làm mới
          </button>
          
          {lastError && (
            <button
              type="button"
              onClick={() => {
                setLastError(null);
                handleSubmit({ preventDefault: () => {} });
              }}
              disabled={loading}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
              🔄 Thử lại
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
