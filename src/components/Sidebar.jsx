import React from "react";

export default function Sidebar({ active, onChange, onLogout }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "auto_fb", label: "Auto Posting - Facebook" },
    { id: "auto_linkedin", label: "Auto Posting - LinkedIn" },
    { id: "auto_twitter", label: "Auto Posting - Twitter" },
    { id: "schedule", label: "Interview Schedule" },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 sticky top-0 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <nav className="space-y-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
              active === item.id ? "bg-gray-100 font-semibold" : ""
            }`}
            onClick={() => onChange && onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="mt-4 w-full px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
      >
        Đăng xuất
      </button>
    </aside>
  );
}


