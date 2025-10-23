import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import companyLogo from "../../uploads/logo.png";
import coverWeb from "../../uploads/coverWeb.png";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧠 Lấy dữ liệu từ Supabase job_posts
  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase
        .from("job_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-green-500";
      case "Part-time":
        return "bg-blue-500";
      case "Contract":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Cơ hội nghề nghiệp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tham gia đội ngũ AI của chúng tôi và cùng xây dựng những sản phẩm tuyển dụng thông minh nhất.
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center text-gray-500">Đang tải danh sách việc làm...</div>
        ) : jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl">
                    💼
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(
                      job.jobType || "Full-time"
                    )}`}
                  >
                    {job.jobType || "Full-time"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {job.caption || job.description}
                </p>

                <div className="text-gray-500 text-sm">
                  <p>🏢 {job.company}</p>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Chưa có tin tuyển dụng nào.</div>
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col animate-fadeIn">
              {/* Header Image */}
              {selectedJob.image_url && (
                <div className="h-56 bg-gradient-to-br from-indigo-500 to-purple-600 relative shrink-0">
                  <img
                    src={coverWeb}
                    alt={selectedJob.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                    <p className="text-sm opacity-90">
                      {selectedJob.company} • {selectedJob.location || "Việt Nam"}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto max-h-[70vh] space-y-6">
                <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                    💼 {selectedJob.company}
                  </span>
                  {selectedJob.salary && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      💰 {selectedJob.salary}
                    </span>
                  )}
                  {selectedJob.jobType && (
                    <span className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                      🕓 {selectedJob.jobType}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    📝 Mô tả công việc
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.description || selectedJob.caption || "Chưa có mô tả chi tiết."}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    🎯 Yêu cầu
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.requirements || "Chưa cập nhật yêu cầu."}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    💎 Quyền lợi
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedJob.benefits || "Chưa cập nhật quyền lợi."}
                  </p>
                </div>

                {/* Footer Image */}
                {selectedJob.image_url && (
                  <div className="mt-8 -mx-8 mb-0 overflow-hidden rounded-b-3xl">
                    <img
                      src={selectedJob.image_url}
                      alt="Job Banner"
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02] animate-fadeIn"
                      style={{
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="p-6 flex gap-4 border-t border-gray-100 shrink-0">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  Ứng tuyển ngay
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-2xl w-full border border-white/20">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Ứng tuyển {selectedJob?.title}
                  </h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Họ tên *
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập họ tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Kinh nghiệm
                      </label>
                      <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Chọn kinh nghiệm</option>
                        <option value="0-1">0-1 năm</option>
                        <option value="1-3">1-3 năm</option>
                        <option value="3-5">3-5 năm</option>
                        <option value="5+">5+ năm</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Thư xin việc
                    </label>
                    <textarea
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                      placeholder="Viết thư xin việc của bạn..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      CV/Resume
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      Gửi ứng tuyển
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Why Work With Us */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚀",
                title: "Môi trường AI",
                text: "Làm việc trong môi trường AI sáng tạo với các dự án thú vị",
              },
              {
                icon: "📈",
                title: "Phát triển bản thân",
                text: "Cơ hội học hỏi và phát triển kỹ năng AI với công nghệ mới nhất",
              },
              {
                icon: "💰",
                title: "Lương cạnh tranh",
                text: "Mức lương hấp dẫn và các phúc lợi tốt nhất trong ngành",
              },
              {
                icon: "🤝",
                title: "Đội ngũ chuyên nghiệp",
                text: "Làm việc với đội ngũ AI chuyên nghiệp, thân thiện và hỗ trợ",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
