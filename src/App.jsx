import React, { useEffect, useState } from "react";
import { getCandidates } from "./api/n8n";
import StatsCard from "./components/StatsCard";
import CandidateTable from "./components/CandidateTable";
import Charts from "./components/Charts";
import Sidebar from "./components/Sidebar";
import AutoPostFacebook from "./pages/AutoPostFacebook";
import AutoPostLinkedIn from "./pages/AutoPostLinkedIn";
import AutoPostTwitter from "./pages/AutoPostTwitter";
import InterviewSchedule from "./pages/InterviewSchedule";
import Login from "./pages/Login";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    getCandidates().then((data) => {
      const list = Array.isArray(data)
        ? data
        : (data && (data.candidates || data.items || data.results)) || [];
      setCandidates(list);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <div className="text-center p-10">Đang tải dữ liệu...</div>;

  const candidatesList = Array.isArray(candidates) ? candidates : [];
  const total = candidatesList.length || 0;
  const pass = candidatesList.filter((c) => c.status === "Pass").length;
  const avgScore = total
    ? (
        candidatesList.reduce((a, b) => a + Number(b.score || 0), 0) / total
      ).toFixed(1)
    : "0.0";

  const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;

  if (!token) {
    return <Login onSuccess={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        active={activeView}
        onChange={setActiveView}
        onLogout={() => {
          localStorage.removeItem("auth_token");
          window.location.reload();
        }}
      />
      <main className="flex-1 p-6">
        {activeView === "home" && (
          <>
            <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
              🤖 AI Recruit Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatsCard title="Tổng số ứng viên" value={total} color="bg-indigo-500" />
              <StatsCard title="Tỉ lệ Pass" value={`${((pass / total || 0) * 100).toFixed(1)}%`} color="bg-green-500" />
              <StatsCard title="Điểm trung bình" value={avgScore} color="bg-purple-500" />
            </div>

            <Charts candidates={candidatesList} />
            <CandidateTable candidates={candidatesList} onSelectCV={setSelectedCV} />
          </>
        )}

        {activeView === "auto_fb" && <AutoPostFacebook />}
        {activeView === "auto_linkedin" && <AutoPostLinkedIn />}
        {activeView === "auto_twitter" && <AutoPostTwitter />}
        {activeView === "schedule" && <InterviewSchedule />}
      </main>

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
          > </iframe>

            <button
              onClick={() => setSelectedCV(null)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg float-right"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
