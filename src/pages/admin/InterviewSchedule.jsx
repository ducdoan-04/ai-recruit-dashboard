import React, { useEffect, useState } from "react";
import { getInterviewSchedule } from "../../api/n8n";

export default function InterviewSchedule() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await getInterviewSchedule();
        if (!mounted) return;
        setEvents(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError("Không thể tải lịch phỏng vấn.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
          📅
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lịch phỏng vấn tuần này</h2>
          <p className="text-gray-600">Quản lý lịch phỏng vấn ứng viên</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600">Đang tải lịch phỏng vấn...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">❌</span>
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        )}
        
        {!loading && !error && (
          events.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Không có lịch phỏng vấn</h3>
              <p className="text-gray-600">Chưa có lịch phỏng vấn nào được lên kế hoạch.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {events.map((e, i) => {
                const start = e?.start?.dateTime || e?.start?.date || e?.start;
                const end = e?.end?.dateTime || e?.end?.date || e?.end;
                const startStr = start ? new Date(start).toLocaleString() : "";
                const endStr = end ? new Date(end).toLocaleString() : "";
                const title = e?.summary || e?.title || "(No title)";
                const location = e?.location || e?.conferenceData?.entryPoints?.[0]?.uri || "";
                const hangoutLink = e?.hangoutLink || "";
                return (
                  <li key={e.id || i} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 pl-6 pr-4 py-4 rounded-lg hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-lg">{title}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="text-blue-500">🕐</span>
                            <span>{startStr} - {endStr}</span>
                          </p>
                          {location && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="text-green-500">📍</span>
                              <span>{location}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Phỏng vấn
                        </span>
                        {hangoutLink && (
                          <a
                            href={hangoutLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            Join Room
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
