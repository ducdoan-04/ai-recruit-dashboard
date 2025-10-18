import React, { useState } from "react";
import axios from "axios";

export default function AutoPostLinkedIn() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("Airecruit");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const formData = {
        job_title: jobTitle,
        company_name: company,
        requirements,
        benefits,
        jd_url: jdUrl,
        platform: "linkedin",
      };
      await axios.post("https://n8n.airecruit.io.vn/webhook-test/job-post", formData);
      setMsg("Đã gửi job đến n8n!");
    } catch (err) {
      console.error("LinkedIn post error:", err);
      setMsg("Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-3">Auto Posting - LinkedIn</h2>
      <p className="text-gray-600 mb-4">Gửi job đến n8n để xử lý đăng LinkedIn.</p>
      {msg && <div className="mb-3 text-sm">{msg}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border rounded p-2" placeholder="Tiêu đề job" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        <input className="border rounded p-2" placeholder="Công ty" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input className="border rounded p-2 md:col-span-2" placeholder="Link JD" value={jdUrl} onChange={(e) => setJdUrl(e.target.value)} />
        <textarea className="border rounded p-2 md:col-span-2" rows="4" placeholder="Yêu cầu" value={requirements} onChange={(e) => setRequirements(e.target.value)}></textarea>
        <textarea className="border rounded p-2 md:col-span-2" rows="3" placeholder="Quyền lợi" value={benefits} onChange={(e) => setBenefits(e.target.value)}></textarea>
        <button disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded md:col-span-2 disabled:opacity-60">
          {loading ? "Đang gửi..." : "Gửi đến n8n"}
        </button>
      </form>
    </div>
  );
}


