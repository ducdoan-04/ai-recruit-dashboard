import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './guards/AuthGuard';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import PostFacebook from './pages/admin/PostFacebook';
import PostLinkedIn from './pages/admin/PostLinkedIn';
import PostTwitter from './pages/admin/PostTwitter';
import PostWebsite from './pages/admin/PostWebsite';
import InterviewSchedule from './pages/admin/InterviewSchedule';
import Settings from './pages/admin/Settings';

/**
 * Main App Component with React Router
 * Defines all routes and authentication flow
 */
export default function App() {
  return (
    <Routes>
      {/* Root redirect to admin */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Admin Login Route (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        {/* Admin sub-routes */}
        <Route path="home" element={<AdminHome />} />
        <Route path="post-facebook" element={<PostFacebook />} />
        <Route path="post-linkedin" element={<PostLinkedIn />} />
        <Route path="post-twitter" element={<PostTwitter />} />
        <Route path="post-website" element={<PostWebsite />} />
        <Route path="interview-schedule" element={<InterviewSchedule />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 - Redirect to admin home */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
