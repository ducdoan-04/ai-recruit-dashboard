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
    { path: '/admin/home', label: 'Dashboard', icon: '📊', color: 'from-blue-500 to-indigo-500' },
    { path: '/admin/post-facebook', label: 'Auto Post - Facebook', icon: '📘', color: 'from-blue-500 to-blue-600' },
    { path: '/admin/post-linkedin', label: 'Auto Post - LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-700' },
    { path: '/admin/post-twitter', label: 'Auto Post - Twitter', icon: '🐦', color: 'from-cyan-400 to-cyan-500' },
    { path: '/admin/job-post-threads', label: 'Job Post Threads', icon: '📱', color: 'from-purple-400 to-purple-500' },
    { path: '/admin/post-website', label: 'Auto Post - Website', icon: '🌐', color: 'from-indigo-400 to-indigo-500' },
    { path: '/admin/interview-schedule', label: 'Interview Schedule', icon: '📅', color: 'from-red-400 to-red-500' },
    { path: '/admin/faq', label: 'Quản lý FAQ', icon: '📋', color: 'from-green-400 to-green-500' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️', color: 'from-gray-400 to-gray-500' },
  ];

  // Redirect /admin to /admin/home
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/home" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r h-screen p-4 sticky top-0 flex flex-col shadow-lg">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Recruit</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 group ${
                currentPath === item.path
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold shadow-md border border-indigo-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
              }`}
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center">
                <span className={`text-xl ${currentPath === item.path ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-sm font-medium ${currentPath === item.path ? 'text-indigo-700' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-red-200 hover:shadow-md"
        >
          <span className="text-lg">🚪</span>
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
