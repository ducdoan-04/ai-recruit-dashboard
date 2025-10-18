import React, { useEffect, useState } from "react";
import { getInterviewSchedule } from "../api/n8n";

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
      <h2 className="text-2xl font-bold mb-4">📅 Lịch phỏng vấn tuần này</h2>
      <div className="bg-white rounded-2xl p-4 shadow">
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          events.length === 0 ? (
            <p>Không có lịch phỏng vấn nào.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((e, i) => {
                const start = e?.start?.dateTime || e?.start?.date || e?.start;
                const end = e?.end?.dateTime || e?.end?.date || e?.end;
                const startStr = start ? new Date(start).toLocaleString() : "";
                const endStr = end ? new Date(end).toLocaleString() : "";
                const title = e?.summary || e?.title || "(No title)";
                const location = e?.location || e?.conferenceData?.entryPoints?.[0]?.uri || "";
                return (
                  <li key={e.id || i} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-gray-600">
                      {startStr} → {endStr}
                    </p>
                    {location && (
                      <p className="text-sm text-gray-500">📍 {location}</p>
                    )}
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
