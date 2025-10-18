import React from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export default function Charts({ candidates }) {
  const COLORS = ["#34d399", "#ef4444"];
  const passCount = candidates.filter(c => c.status === "Pass").length;
  const failCount = candidates.length - passCount;
  const pieData = [
    { name: "Pass", value: passCount },
    { name: "Fail", value: failCount },
  ];

  const scoreData = candidates.map(c => ({
    name: c.name,
    score: parseInt(c.score || 0),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Phân bố điểm ứng viên</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scoreData}>
            <Bar dataKey="score" fill="#6366f1" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Tỷ lệ Pass / Fail</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {pieData.map((e, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
