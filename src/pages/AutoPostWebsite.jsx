import { useState } from "react";
import { postToWebsite } from "../api/n8n";

export default function AutoPostWebsite() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    experience: "",
    deadline: "",
    contactEmail: "",
    contactPhone: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await postToWebsite(form);
      setMessage({ type: "success", text: "✅ Đăng tin tuyển dụng thành công!" });
      console.log("Post result:", result);
      
      // Reset form after successful submission
      setTimeout(() => {
        setForm({
          title: "",
          company: "",
          description: "",
          requirements: "",
          responsibilities: "",
          benefits: "",
          salary: "",
          location: "",
          jobType: "Full-time",
          experience: "",
          deadline: "",
          contactEmail: "",
          contactPhone: "",
          link: "",
        });
        setMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Error posting to website:", err);
      setMessage({ 
        type: "error", 
        text: "❌ Đăng tin thất bại: " + (err.response?.data?.message || err.message) 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Đăng tin tuyển dụng</h2>
            <p className="text-gray-600">Đăng tin tuyển dụng lên website công ty</p>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-800 border border-green-300" 
              : "bg-red-100 text-red-800 border border-red-300"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên công ty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                placeholder="VD: Công ty TNHH ABC"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vị trí tuyển dụng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="VD: Senior Frontend Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loại hình công việc
              </label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kinh nghiệm
              </label>
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="VD: 2-3 năm"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Địa điểm
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="VD: Hà Nội"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Salary and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mức lương
              </label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="VD: 15-25 triệu VNĐ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hạn nộp hồ sơ
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả công việc <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Mô tả chi tiết về công việc..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trách nhiệm công việc
            </label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              rows="4"
              placeholder="- Phát triển và bảo trì ứng dụng web&#10;- Làm việc với team để thiết kế giải pháp&#10;- Code review và tối ưu hiệu suất"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yêu cầu ứng viên <span className="text-red-500">*</span>
            </label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              required
              rows="4"
              placeholder="- Tốt nghiệp đại học chuyên ngành CNTT&#10;- Có kinh nghiệm với React, Node.js&#10;- Kỹ năng giao tiếp tốt"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quyền lợi
            </label>
            <textarea
              name="benefits"
              value={form.benefits}
              onChange={handleChange}
              rows="4"
              placeholder="- Lương tháng 13, thưởng hiệu suất&#10;- Bảo hiểm đầy đủ&#10;- Du lịch hàng năm&#10;- Môi trường làm việc chuyên nghiệp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email liên hệ
              </label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="hr@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="0123456789"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Job Description Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔗 Link JD (Job Description)
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://example.com/job-description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setForm({
                title: "",
                company: "",
                description: "",
                requirements: "",
                responsibilities: "",
                benefits: "",
                salary: "",
                location: "",
                jobType: "Full-time",
                experience: "",
                deadline: "",
                contactEmail: "",
                contactPhone: "",
                link: "",
              })}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Xóa form
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang đăng...
                </span>
              ) : (
                "🌐 Đăng tin tuyển dụng"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          👁️ Xem trước
        </h3>
        <div className="bg-white rounded-lg p-6 space-y-4">
          {form.title && (
            <div>
              <h4 className="text-2xl font-bold text-indigo-600">{form.title}</h4>
              {form.company && <p className="text-gray-600 font-semibold mt-1">{form.company}</p>}
            </div>
          )}
          {(form.location || form.salary || form.jobType) && (
            <div className="flex flex-wrap gap-3">
              {form.location && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">📍 {form.location}</span>}
              {form.salary && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💰 {form.salary}</span>}
              {form.jobType && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">💼 {form.jobType}</span>}
            </div>
          )}
          {form.description && (
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Mô tả công việc:</h5>
              <p className="text-gray-600 whitespace-pre-line">{form.description}</p>
            </div>
          )}
          {form.link && (
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">🔗 Link JD:</h5>
              <a 
                href={form.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {form.link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
