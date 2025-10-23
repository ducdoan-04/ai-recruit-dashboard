import React, { useState } from "react";
import { postToTwitter } from "../../api/n8n";

export default function AutoPostTwitter() {
  const [form, setForm] = useState({
    title: "",
    company: "Airecruit",
    link: "",
    requirements: "",
    benefits: "",
    schedule: "", // optional schedule
  });
  const [loading, setLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      company: "Airecruit",
      link: "",
      requirements: "",
      benefits: "",
      schedule: "",
    });
    setLastError(null);
    setMsg("");
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
      // Map to n8n twitter workflow expected keys
      const payload = {
        title: form.title,
        company: form.company,
        link: form.link,
        requirements: form.requirements,
        benefits: form.benefits,
        schedule_time: form.schedule || undefined,
        platform: "twitter",
      };

      await postToTwitter(payload);
      setMsg("✅ Đã gửi job đến n8n (Twitter)!");
      resetForm();
    } catch (err) {
      console.error("Error posting to Twitter:", err);
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
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Auto Posting - Twitter</h2>

      {lastError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">{lastError}</p>
        </div>
      )}

      {msg && <div className="mb-3 text-sm">{msg}</div>}

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
        <input
          type="datetime-local"
          name="schedule"
          value={form.schedule}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Thời gian đăng (tùy chọn)"
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
        </div>
      </form>
    </div>
  );
}
