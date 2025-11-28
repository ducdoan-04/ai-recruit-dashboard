import React from "react";

// Hàm format datetime: "13:55:35 | 28-11-2025" (giờ Việt Nam UTC+7)
function formatDateTime(dateString) {
  if (!dateString) return "—";
  
  try {
    const date = new Date(dateString);
    
    // Force timezone Asia/Ho_Chi_Minh (UTC+7)
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const timeStr = date.toLocaleTimeString('en-GB', options);
    
    const dateOptions = {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    
    const dateStr = date.toLocaleDateString('en-GB', dateOptions);
    
    return `${timeStr} | ${dateStr}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export default function CandidatesNoCVTable({ candidates = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⚠️</span>
        <h2 className="font-bold text-lg text-orange-600">
          Ứng viên không có CV hoặc CV lỗi ({candidates.length})
        </h2>
      </div>
      
      <table className="w-full border-collapse text-sm">
        <thead className="bg-orange-50">
          <tr>
            <th className="p-2 text-center border-b-2 border-orange-200">Candidate ID</th>
            <th className="p-2 text-left border-b-2 border-orange-200">Tên</th>
            <th className="p-2 text-left border-b-2 border-orange-200">Email</th>
            <th className="p-2 text-center border-b-2 border-orange-200">Số điện thoại</th>
            <th className="p-2 text-center border-b-2 border-orange-200">Nguồn</th>
            <th className="p-2 text-center border-b-2 border-orange-200">Job ID</th>
            <th className="p-2 text-left border-b-2 border-orange-200">Lý do</th>
            <th className="p-2 text-center border-b-2 border-orange-200">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 text-center text-gray-500">
                ✅ Không có ứng viên nào thiếu CV
              </td>
            </tr>
          ) : (
            candidates.map((c, i) => (
              <tr key={c.candidate_id || i} className="border-b hover:bg-orange-50">
                <td className="p-2 text-center">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                    {c.candidate_id || "UNKNOWN"}
                  </span>
                </td>
                <td className="p-2">{c.full_name || "—"}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2 text-center">{c.phone || "—"}</td>
                <td className="p-2 text-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {c.source || "Gmail"}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                    {c.job_id || "UNKNOWN"}
                  </span>
                </td>
                <td className="p-2">
                  <span className="text-red-600 text-xs">
                    {c.reason || "No attachment or not PDF"}
                  </span>
                </td>
                <td className="p-2 text-center text-xs text-gray-600">
                  {formatDateTime(c.created_at)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}