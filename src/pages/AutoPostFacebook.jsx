import React, { useState } from "react";
import { postToFacebook } from "../api/n8n";

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
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Auto Posting - Facebook</h2>
      
      {lastError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Lỗi gần nhất:</p>
          <p className="text-sm">{lastError}</p>
          <button 
            onClick={() => setLastError(null)}
            className="mt-2 text-xs text-red-600 underline hover:text-red-800"
          >
            Đóng
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tiêu đề job"
          className="w-full border p-2 rounded"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Công ty"
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="schedule"
          value={form.schedule}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Chọn thời gian đăng"
          required
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link JD"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Yêu cầu công việc"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="benefits"
          value={form.benefits}
          onChange={handleChange}
          placeholder="Quyền lợi"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded flex-1 hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Đang gửi..." : "Gửi đến n8n"}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
          >
            Clear Form
          </button>
          
          {lastError && (
            <button
              type="button"
              onClick={() => {
                setLastError(null);
                handleSubmit({ preventDefault: () => {} });
              }}
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400"
            >
              Thử lại
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
