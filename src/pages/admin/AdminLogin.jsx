import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

/**
 * AdminLogin - Login page for admin authentication
 * Authenticate using Supabase users table
 */
export default function AdminLogin() {
  const navigate = useNavigate();

  // Role mapping: position → role name
  const roleMap = {
    1: "admin",
    2: "editor",
    3: "viewer",
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: tìm user theo email
      const { data: user, error: queryError } = await supabase
        .from('users')
        .select('id, username, email, password, position')
        .eq('email', form.email)
        .single();


      if (queryError) {
        console.error('Query error:', queryError);
        setError('Email hoặc mật khẩu không chính xác');
        setLoading(false);
        return;
      }

      if (!user) {
        setError('Email hoặc mật khẩu không chính xác');
        setLoading(false);
        return;
      }


      // Step 2: So sánh password (plaintext)
      if (user.password !== form.password) {
        setError('Email hoặc mật khẩu không chính xác');
        setLoading(false);
        return;
      }

      // Step 3: check quyền (position phải là số 1)

      if (roleMap[user.position] !== "admin") {
        setError("Bạn không có quyền truy cập");
        setLoading(false);
        return;
      }

      // Step 4: lưu session
      localStorage.setItem("adminToken", user.id);
      localStorage.setItem("adminUser", JSON.stringify(user));

      navigate("/admin/home");

    } catch (err) {
      console.error('Login error:', err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Recruit Dashboard</h1>
          <p className="text-gray-600">Đăng nhập quản trị viên</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@airecruit.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang đăng nhập...
              </span>
            ) : (
              '🔐 Đăng nhập'
            )}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Chỉ tài khoản có <strong>position = 1</strong> mới được truy cập trang quản trị.
          </p>
        </div>

      </div>
    </div>
  );
}
