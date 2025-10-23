import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const menu = [
  { path: '/about', label: 'Giới thiệu', icon: '🏢' },
  { path: '/services', label: 'Dịch vụ', icon: '⚙️' },
  { path: '/projects', label: 'Dự án', icon: '🚀' },
  { path: '/knowledge', label: 'Kiến thức', icon: '📚' },
  { path: '/careers', label: 'Tuyển dụng', icon: '💼' },
  { path: '/contact', label: 'Liên hệ', icon: '📞' },
];

export default function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/about" className="text-gray-800 text-2xl font-bold hover:text-blue-600 transition-colors">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI RECRUIT
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex gap-8">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-gray-700 text-lg font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50 px-4 py-2 rounded-full shadow-lg' 
                          : 'px-4 py-2 rounded-full hover:bg-gray-50'
                      }`
                    }
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-gray-700 text-lg font-medium transition-all duration-300 hover:text-blue-600 hover:bg-gray-50 ${
                        isActive 
                          ? 'text-blue-600 bg-blue-50' 
                          : ''
                      } px-4 py-3 rounded-lg`
                    }
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
