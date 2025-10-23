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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-2xl">
          💼
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Auto Posting - LinkedIn</h2>
          <p className="text-gray-600">Đăng tin tuyển dụng lên LinkedIn tự động</p>
        </div>
      </div>
      
      {msg && (
        <div className={`mb-6 p-4 rounded-lg ${
          msg.includes("thành công") || msg.includes("Đã gửi") 
            ? "bg-green-50 border border-green-200 text-green-700" 
            : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{msg.includes("thành công") || msg.includes("Đã gửi") ? "✅" : "❌"}</span>
            <span className="font-semibold">{msg}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề job *</label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
              placeholder="Nhập tiêu đề công việc" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Công ty</label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
              placeholder="Tên công ty" 
              value={company} 
              onChange={(e) => setCompany(e.target.value)} 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link JD</label>
          <input 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
            placeholder="https://..." 
            value={jdUrl} 
            onChange={(e) => setJdUrl(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Yêu cầu công việc</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
            rows="4" 
            placeholder="Mô tả yêu cầu công việc..." 
            value={requirements} 
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quyền lợi</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
            rows="3" 
            placeholder="Mô tả quyền lợi..." 
            value={benefits} 
            onChange={(e) => setBenefits(e.target.value)}
          />
        </div>
        
        <button 
          disabled={loading} 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
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
            "💼 Đăng lên LinkedIn"
          )}
        </button>
      </form>
    </div>
  );
}


