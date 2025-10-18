import React from "react";

// Hàm chuẩn hóa link Drive hoặc PDF để nhúng xem
function getEmbedLink(url) {
    if (!url) return null;
  
    // Nếu là link Drive kiểu https://drive.google.com/file/d/<id>/view
    const byPath = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (byPath && byPath[1]) {
      // Dùng link preview chính thức (không auto-download)
      return `https://drive.google.com/file/d/${byPath[1]}/preview`;
    }
  
    // Nếu là link kiểu https://drive.google.com/open?id=<id>
    const byQuery = url.match(/[?&]id=([^&]+)/);
    if (byQuery && byQuery[1]) {
      return `https://drive.google.com/file/d/${byQuery[1]}/preview`;
    }
  
    // Nếu là PDF ngoài Drive (kiểm tra đơn giản bằng regex, tránh try/catch)
    const basePath = String(url).split("?")[0].toLowerCase();
    if (/\.pdf$/.test(basePath)) {
      return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
        url
      )}`;
    }
  
    // fallback
    return url;
  }

export default function CandidateTable({ candidates = [], onSelectCV }) {
  console.log("CandidateTable received candidates:", candidates);

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="font-bold mb-3 text-lg">Danh sách ứng viên</h2>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Tên</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-center">Điểm</th>
            <th className="p-2 text-center">Trạng thái</th>
            <th className="p-2 text-center">Nguồn</th>
            <th className="p-2 text-center">CV</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-3 text-center text-gray-500">
                Không có dữ liệu ứng viên.
              </td>
            </tr>
          ) : (
            candidates.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name || c.Name}</td>
                <td className="p-2">{c.email || c.Email}</td>
                <td className="p-2 text-center font-semibold">{c.score || c.Score || "—"}</td>
                <td
                  className={`p-2 text-center font-semibold ${
                    (c.status === "Pass" || c.Status === "Pass") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {c.status || c.Status || "—"}
                </td>
                <td className="p-2 text-center">{c.source || c.Source || c.job_id || "—"}</td>
                <td className="p-2 text-center">
                  {c.cv_url || c.CV_Link ? (
                    <button
                      onClick={() =>
                        onSelectCV && onSelectCV(getEmbedLink(c.cv_url || c.CV_Link))
                      }
                      className="text-indigo-500 underline hover:text-indigo-700"
                    >
                      Xem CV
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
