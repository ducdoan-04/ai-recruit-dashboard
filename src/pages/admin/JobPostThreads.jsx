import React, { useState } from "react";
import { postJobThreads, deleteThreadPost } from "../../api/n8n";
import { getThreadPostHistory } from "../../api/threadHistory";
import { supabase } from "../../lib/supabaseClient";

export default function JobPostThreads() {
  const [activeTab, setActiveTab] = useState("post"); // "post" hoặc "history"
  const [form, setForm] = useState({
    title: "",
    company: "Airecruit",
    location: "",
    requirements: "",
    benefits: "",
    link: "",
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
    const { title, company, location, requirements, benefits, link } = form;

    if (!title.trim()) {
      setPreview("");
      return;
    }

    let previewText = `🚀 ${title}\n\n`;
    previewText += `🏢 ${company}\n`;
    if (location) previewText += `📍 ${location}\n\n`;

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
      location: "",
      requirements: "",
      benefits: "",
      link: "",
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
        location: form.location,
        requirements: form.requirements,
        benefits: form.benefits,
        link: form.link,
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

  return (
    <div className="w-full">
      {/* Sticky Navigation */}
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

      {/* Content */}
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-6xl mx-auto mt-6">
        {/* Tab Content */}
        {activeTab === "post" ? (
          <PostTabContent
            form={form}
            setForm={setForm}
            loading={loading}
            lastError={lastError}
            msg={msg}
            preview={preview}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
          />
        ) : (
          <HistoryTabContent />
        )}
      </div>
    </div>
  );
}

// Component: Tab Đăng bài
function PostTabContent({
  form,
  setForm,
  loading,
  lastError,
  msg,
  preview,
  handleChange,
  handleSubmit,
  resetForm,
}) {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📱 Auto Posting - Threads
        </h2>
        <p className="text-gray-600">
          Đăng tin tuyển dụng tự động lên Threads với format chuyên nghiệp
        </p>
      </div>

      {lastError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{lastError}</p>
        </div>
      )}

      {msg && (
        <div
          className={`mb-4 p-3 rounded ${
            msg.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p className="text-sm">{msg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            📝 Thông tin Job
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề Job *
              </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Công ty
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Tên công ty"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Hồ Chí Minh, Hà Nội..."
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yêu cầu công việc
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quyền lợi
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link ứng tuyển
              </label>
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://careers.company.com/apply"
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
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            👀 Preview Threads Post
          </h3>
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
                <strong>💡 Tip:</strong> Bài viết sẽ được đăng lên Threads với
                định dạng chuyên nghiệp
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Component: Tab Lịch sử post
function HistoryTabContent() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Load dữ liệu từ Supabase khi component mount
  React.useEffect(() => {
    if (!hasLoaded) {
      loadHistoryData();
      setHasLoaded(true);
    }
  }, [hasLoaded]);

  const loadHistoryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getThreadPostHistory();
      setHistoryData(data);
    } catch (err) {
      console.error("Error loading history:", err);
      setError("Không thể tải lịch sử. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (post) => {
    if (!post.idpost) {
      alert("❌ Không tìm thấy ID bài viết");
      return;
    }

    if (!window.confirm("Bạn chắc chắn muốn xóa bài viết này không?")) {
      return;
    }

    setDeleting(post.id);
    try {
      // 1️⃣ Gửi request xóa đến n8n
      const response = await deleteThreadPost(post.idpost);
      console.log("Delete response:", response);

      if (response.success) {
        // 2️⃣ Nếu success, xóa trên Supabase
        const { error: deleteError } = await supabase
          .from("job_posts")
          .delete()
          .eq("id", post.id);

        if (deleteError) {
          console.error("Error deleting from Supabase:", deleteError);
          alert("❌ Xóa trên Supabase thất bại: " + deleteError.message);
        } else {
          alert("✅ Xóa bài viết thành công!");
          // Reload lịch sử sau khi xóa
          loadHistoryData();
        }
      } else {
        alert(
          "❌ Xóa bài viết thất bại: " + (response.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("❌ Lỗi xóa bài viết: " + err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          📊 Lịch sử đăng bài
        </h3>
        <button
          onClick={loadHistoryData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium text-sm transition-colors"
        >
          {loading ? "⏳ Đang tải..." : "🔄 Tải lại"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && !historyData.length ? (
        <div className="text-center py-8">
          <p className="text-gray-600">⏳ Đang tải dữ liệu...</p>
        </div>
      ) : historyData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">📭 Chưa có bài đăng nào</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 flex-1">
                    Caption
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 flex-1">
                    Ảnh
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 w-24">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 w-32">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors align-top"
                  >
                    <td className="px-4 py-3 text-gray-800 align-top flex-1 max-w-xs">
                      {post.caption || "Không"}
                    </td>
                    <td className="px-4 py-3 text-center align-top flex-1">
                      {post.image_url ? (
                        <div className="flex justify-center">
                          <img
                            src={post.image_url}
                            alt="Post"
                            className="w-72 h-72 object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-600">Không</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-center w-24">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium inline-block">
                        {post.status || "posted"}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-center w-32">
                      <div className="flex flex-col gap-2 justify-center">
                        <button
                          onClick={() => {
                            if (post.linkpost) {
                              window.open(post.linkpost, "_blank");
                            } else {
                              alert("❌ Link bài viết không tồn tại");
                            }
                          }}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 font-medium transition-colors"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => {
                            handleDeletePost(post);
                          }}
                          disabled={deleting === post.id}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:bg-gray-400 font-medium transition-colors"
                        >
                          {deleting === post.id ? "⏳ Xóa..." : "Xóa"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
