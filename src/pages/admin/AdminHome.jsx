import { useEffect, useState } from "react";
import { getCandidates } from "../../api/n8n";
import StatsCard from "../../components/StatsCard";
import CandidateTable from "../../components/CandidateTable";
import Charts from "../../components/Charts";

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

      {/* CV Preview Modal */}
      {selectedCV && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setSelectedCV(null)}
        >
          <div
            className="bg-white rounded-xl p-4 w-[90%] h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selectedCV}
              className="w-full h-full rounded-lg"
              title="CV Preview"
              allow="autoplay; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
            <button
              onClick={() => setSelectedCV(null)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg float-right hover:bg-red-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
