import React, { useState } from "react";
import { postJobThreads } from "../../api/n8n";

export default function JobPostThreads() {
  const [form, setForm] = useState({
    title: "",
    company: "Airecruit",
    link: "",
    requirements: "",
    benefits: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "Full-time",
    schedule: "", // optional schedule
  });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    generatePreview();
  };

  const generatePreview = () => {
    const { title, company, location, salary, experience, jobType, requirements, benefits, link } = form;
    
    if (!title.trim()) {
      setPreview("");
      return;
    }

    let previewText = `🚀 ${title}\n\n`;
    previewText += `🏢 ${company}\n`;
    if (location) previewText += `📍 ${location}\n`;
    if (salary) previewText += `💰 ${salary}\n`;
    if (experience) previewText += `👨‍💼 ${experience}\n`;
    if (jobType) previewText += `⏰ ${jobType}\n\n`;
    
    if (requirements) {
      previewText += `📋 Yêu cầu:\n${requirements}\n\n`;
    }
    
    if (benefits) {
      previewText += `✨ Quyền lợi:\n${benefits}\n\n`;
    }
    
    if (link) {
      previewText += `🔗 Ứng tuyển: ${link}\n\n`;
    }
    
    previewText += `#TuyenDung #Jobs #Career #Vietnam`;
    
    setPreview(previewText);
  };

  const resetForm = () => {
    setForm({
      title: "",
      company: "Airecruit",
      link: "",
      requirements: "",
      benefits: "",
      location: "",
      salary: "",
      experience: "",
      jobType: "Full-time",
      schedule: "",
    });
    setLastError(null);
    setMsg("");
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.title.trim()) {
      alert("⚠️ Vui lòng nhập tiêu đề job!");
      return;
    }

    setLoading(true);
    try {
      // Map to n8n threads workflow expected keys
      const payload = {
        title: form.title,
        company: form.company,
        link: form.link,
        requirements: form.requirements,
        benefits: form.benefits,
        location: form.location,
        salary: form.salary,
        experience: form.experience,
        jobType: form.jobType,
        schedule_time: form.schedule || undefined,
        platform: "threads",
        thread_mode: true, // Enable thread mode
      };

      await postJobThreads(payload);
      setMsg("✅ Đã gửi job thread đến n8n!");
      resetForm();
    } catch (err) {
      console.error("Error posting Job Threads:", err);
      const status = err.response?.status;
      let errorMessage = "Gửi thất bại. Vui lòng thử lại.";
      if (status === 404) errorMessage = "Không tìm thấy webhook n8n (404).";
      else if (status === 500) errorMessage = "Lỗi server n8n (500).";
      else if (err.code === "ERR_NETWORK") errorMessage = "Lỗi kết nối mạng.";
      setLastError(errorMessage);
      setMsg(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const jobTypes = [
    "Full-time",
    "Part-time", 
    "Contract",
    "Internship",
    "Freelance",
    "Remote"
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📱 Job Post Threads - Twitter</h2>
        <p className="text-gray-600">Tạo job posting dạng thread trên Twitter với format chuyên nghiệp</p>
      </div>

      {lastError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{lastError}</p>
        </div>
      )}

      {msg && (
        <div className={`mb-4 p-3 rounded ${msg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <p className="text-sm">{msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📝 Thông tin Job</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Job *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ví dụ: Senior React Developer"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Tên công ty"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Hồ Chí Minh, Hà Nội..."
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
                <input
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="15-25 triệu VNĐ"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm</label>
                <input
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="2-3 năm kinh nghiệm"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình công việc</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yêu cầu công việc</label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="• Kinh nghiệm React, Node.js&#10;• Hiểu biết về database&#10;• Kỹ năng teamwork..."
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quyền lợi</label>
              <textarea
                name="benefits"
                value={form.benefits}
                onChange={handleChange}
                placeholder="• Lương cạnh tranh&#10;• Bảo hiểm đầy đủ&#10;• Môi trường làm việc năng động..."
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link ứng tuyển</label>
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://careers.company.com/apply"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian đăng (tùy chọn)</label>
              <input
                type="datetime-local"
                name="schedule"
                value={form.schedule}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex-1 hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
              >
                {loading ? "⏳ Đang gửi..." : "🚀 Đăng Job Thread"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-400 font-medium transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">👀 Preview Twitter Thread</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[400px]">
            {preview ? (
              <div className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {preview}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>📝 Nhập thông tin job để xem preview</p>
              </div>
            )}
          </div>
          
          {preview && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>💡 Tip:</strong> Thread sẽ được chia thành nhiều tweet để phù hợp với giới hạn ký tự của Twitter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
