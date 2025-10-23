import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';

/**
 * AdminLayout - Main layout for admin pages
 * Contains sidebar navigation and renders child routes via Outlet
 */
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current path to highlight active menu item
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Menu items with their routes
  const menuItems = [
    { path: '/admin/home', label: '🏠 Dashboard', icon: '📊' },
    { path: '/admin/post-facebook', label: '📘 Auto Post - Facebook', icon: '📘' },
    { path: '/admin/post-linkedin', label: '💼 Auto Post - LinkedIn', icon: '💼' },
    { path: '/admin/post-twitter', label: '🐦 Auto Post - Twitter', icon: '🐦' },
    { path: '/admin/post-website', label: '🌐 Auto Post - Website', icon: '🌐' },
    { path: '/admin/interview-schedule', label: '📅 Interview Schedule', icon: '📅' },
    { path: '/admin/settings', label: '⚙️ Settings', icon: '⚙️' },
  ];

  // Redirect /admin to /admin/home
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r h-screen p-4 sticky top-0 flex flex-col shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">🤖 AI Recruit</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                currentPath === item.path
                  ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
