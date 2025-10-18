import React from "react";

export default function StatsCard({ title, value, color }) {
  return (
    <div
      className={`p-4 rounded-2xl shadow-md text-white font-bold ${color} flex flex-col items-center`}
    >
      <span className="text-lg">{title}</span>
      <span className="text-3xl mt-2">{value}</span>
    </div>
  );
}
