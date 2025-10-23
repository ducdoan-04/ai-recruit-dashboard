import { useState } from 'react';

/**
 * Settings - Admin settings page
 */
export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'AI Recruit Dashboard',
    adminEmail: 'admin@airecruit.com',
    notifications: true,
    autoBackup: false,
    theme: 'light',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In production, save to backend API
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⚙️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</h2>
            <p className="text-gray-600">Quản lý cấu hình hệ thống</p>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
            ✅ Đã lưu cài đặt thành công!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Cài đặt chung
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên website
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email quản trị
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={settings.adminEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giao diện
                </label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="auto">Tự động</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Thông báo
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Bật thông báo email</p>
                  <p className="text-sm text-gray-600">Nhận thông báo qua email khi có ứng viên mới</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Sao lưu tự động</p>
                  <p className="text-sm text-gray-600">Tự động sao lưu dữ liệu hàng ngày</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="autoBackup"
                    checked={settings.autoBackup}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg transition transform hover:scale-105"
            >
              💾 Lưu cài đặt
            </button>
          </div>
        </form>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin hệ thống</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Phiên bản</p>
            <p className="text-lg font-semibold text-gray-800">v1.0.0</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Trạng thái</p>
            <p className="text-lg font-semibold text-green-600">🟢 Hoạt động</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Lần sao lưu cuối</p>
            <p className="text-lg font-semibold text-gray-800">24/10/2025</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Dung lượng đã dùng</p>
            <p className="text-lg font-semibold text-gray-800">2.4 GB / 10 GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
