import { useEffect, useState } from "react";
import { getCandidates } from "../../api/n8n";
import StatsCard from "../../components/StatsCard";
import CandidateTable from "../../components/CandidateTable";
import Charts from "../../components/Charts";
import { XMarkIcon, ArrowsPointingOutIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

/**
 * AdminHome - Main dashboard page showing candidate statistics
 */
export default function AdminHome() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);

  useEffect(() => {
    getCandidates().then((data) => {
      const list = Array.isArray(data)
        ? data
        : (data && (data.candidates || data.items || data.results)) || [];
      setCandidates(list);
      setLoading(false);
    }).catch((err) => {
      console.error("Error loading candidates:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const candidatesList = Array.isArray(candidates) ? candidates : [];
  const total = candidatesList.length || 0;
  const pass = candidatesList.filter((c) => c.status === "Pass").length;
  const avgScore = total
    ? (candidatesList.reduce((a, b) => a + Number(b.score || 0), 0) / total).toFixed(1)
    : "0.0";

  // Lấy URL gốc từ Google Docs Viewer URL
  const getOriginalUrl = (url) => {
    if (!url) return null;
    const match = url.match(/url=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : url;
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">🤖</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Recruit Dashboard</h1>
          <p className="text-gray-600">Quản lý ứng viên và thống kê AI tuyển dụng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard 
          title="Tổng số ứng viên" 
          value={total} 
          color="bg-indigo-500" 
        />
        <StatsCard 
          title="Tỉ lệ Pass" 
          value={`${((pass / total || 0) * 100).toFixed(1)}%`} 
          color="bg-green-500" 
        />
        <StatsCard 
          title="Điểm trung bình" 
          value={avgScore} 
          color="bg-purple-500" 
        />
      </div>

      <Charts candidates={candidatesList} />
      <CandidateTable candidates={candidatesList} onSelectCV={setSelectedCV} />

      {/* CV Preview Modal - Improved UI */}
      {selectedCV && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setSelectedCV(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Xem trước CV</h3>
                  <p className="text-sm text-white/80">Hồ sơ ứng viên</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href={getOriginalUrl(selectedCV)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                  title="Tải xuống CV"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Tải xuống</span>
                </a>

                {/* Open in New Tab */}
                <a
                  href={getOriginalUrl(selectedCV)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                  title="Mở trong tab mới"
                >
                  <ArrowsPointingOutIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Mở rộng</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCV(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition"
                  title="Đóng"
                >
                  <XMarkIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Đóng</span>
                </button>
              </div>
            </div>

            {/* CV Preview Content */}
            <div className="flex-1 bg-gray-100 p-4 overflow-hidden">
              <iframe
                src={selectedCV}
                className="w-full h-full rounded-lg shadow-inner bg-white"
                title="CV Preview"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
