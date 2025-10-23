# AI Recruit Dashboard - Admin Routing System

## 🎯 Overview

This project has been refactored to implement a full admin routing and authentication system using React Router DOM.

## 🏗️ Project Structure

```
src/
├── api/                    # API integration
│   └── n8n.js             # n8n webhook endpoints
├── components/            # Reusable components
│   ├── CandidateTable.jsx
│   ├── Charts.jsx
│   ├── Sidebar.jsx
│   └── StatsCard.jsx
├── guards/                # Route protection
│   └── AuthGuard.jsx      # Protected route guard
├── layouts/               # Layout components
│   └── AdminLayout.jsx    # Admin layout with sidebar
├── pages/                 # Page components
│   ├── admin/            # Admin pages
│   │   ├── AdminHome.jsx         # Dashboard overview
│   │   ├── AdminLogin.jsx        # Login page
│   │   ├── PostFacebook.jsx      # Auto post to Facebook
│   │   ├── PostLinkedIn.jsx      # Auto post to LinkedIn
│   │   ├── PostTwitter.jsx       # Auto post to Twitter
│   │   ├── PostWebsite.jsx       # Auto post to Website
│   │   ├── InterviewSchedule.jsx # Interview schedule
│   │   └── Settings.jsx          # System settings
│   └── Login.jsx          # Old login (kept for reference)
├── App.jsx                # Main app with routing
└── main.jsx              # Entry point with BrowserRouter
```

## 🔐 Authentication Flow

### Login Process
1. User navigates to `http://localhost:5173/admin`
2. Automatically redirects to `/admin/login`
3. User enters email and password (any credentials work for demo)
4. On successful login:
   - Token is stored in `localStorage.getItem('adminToken')`
   - User is redirected to `/admin/home`

### Protected Routes
- All `/admin/*` routes (except `/admin/login`) are protected by `AuthGuard`
- If user tries to access protected route without token → redirect to `/admin/login`
- If user is authenticated → access granted

### Logout
- Click "Đăng xuất" button in sidebar
- Token is removed from localStorage
- User is redirected to `/admin/login`

## 🗺️ Route Structure

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | - | Redirects to `/admin` | No |
| `/admin` | AdminLayout | Redirects to `/admin/home` | Yes |
| `/admin/login` | AdminLogin | Login page | No |
| `/admin/home` | AdminHome | Dashboard with stats & charts | Yes |
| `/admin/post-facebook` | PostFacebook | Auto post to Facebook | Yes |
| `/admin/post-linkedin` | PostLinkedIn | Auto post to LinkedIn | Yes |
| `/admin/post-twitter` | PostTwitter | Auto post to Twitter | Yes |
| `/admin/post-website` | PostWebsite | Auto post to Website | Yes |
| `/admin/interview-schedule` | InterviewSchedule | Interview calendar | Yes |
| `/admin/settings` | Settings | System settings | Yes |

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Access the Application
Open browser and navigate to: `http://localhost:5173`

You will be automatically redirected to `/admin/login`

### Login
- **Email**: any email (e.g., `admin@airecruit.com`)
- **Password**: any password (e.g., `admin123`)

## 🔧 Key Components

### AuthGuard (`src/guards/AuthGuard.jsx`)
Protects admin routes by checking for `adminToken` in localStorage.

```jsx
// Usage
<AuthGuard>
  <AdminLayout />
</AuthGuard>
```

### AdminLayout (`src/layouts/AdminLayout.jsx`)
Main layout for admin pages with:
- Sidebar navigation
- Logout button
- Content area (renders child routes via `<Outlet />`)

### AdminLogin (`src/pages/admin/AdminLogin.jsx`)
Login page with:
- Email & password form
- Mock authentication (any credentials work)
- Auto-redirect to `/admin/home` on success

### AdminHome (`src/pages/admin/AdminHome.jsx`)
Dashboard page with:
- Candidate statistics
- Charts and visualizations
- Candidate table
- CV preview modal

## 🎨 UI Features

- **Beautiful gradient login page** with animations
- **Responsive sidebar** with icon-based navigation
- **Active route highlighting** in sidebar
- **Smooth transitions** and hover effects
- **Loading states** for better UX
- **Success/error messages** for user feedback

## 🔒 Security Notes

⚠️ **Important**: Current implementation uses mock authentication for demonstration purposes.

### For Production:
1. Replace mock login in `AdminLogin.jsx` with actual API call
2. Implement JWT token validation
3. Add token refresh logic
4. Implement proper session management
5. Add HTTPS only cookies
6. Implement rate limiting
7. Add CSRF protection

## 📦 Dependencies

- **react**: ^19.1.1
- **react-dom**: ^19.1.1
- **react-router-dom**: ^7.x (newly installed)
- **axios**: ^1.12.2
- **recharts**: ^3.2.1
- **@fullcalendar/react**: ^6.1.19
- **tailwindcss**: ^3.4.18

## 🛠️ Development

### Adding New Admin Routes

1. Create page component in `src/pages/admin/`
2. Add route in `src/App.jsx`:
```jsx
<Route path="your-route" element={<YourComponent />} />
```
3. Add menu item in `src/layouts/AdminLayout.jsx`:
```jsx
{ path: '/admin/your-route', label: '🎯 Your Label', icon: '🎯' }
```

### Modifying Authentication

Edit `src/guards/AuthGuard.jsx` to change authentication logic.

## 📝 Notes

- All admin pages are under `/admin/*` routes
- Root path `/` automatically redirects to `/admin`
- Invalid routes redirect to `/admin`
- Sidebar navigation uses React Router's `useNavigate` hook
- Active route detection uses `useLocation` hook

## 🎉 Features Implemented

✅ Full admin routing system
✅ Protected routes with AuthGuard
✅ Mock authentication with localStorage
✅ Beautiful login page
✅ Admin layout with sidebar
✅ 7 admin pages (Home, 4 posting pages, Schedule, Settings)
✅ Logout functionality
✅ Auto-redirects
✅ Responsive design
✅ Active route highlighting

## 🚧 Future Enhancements

- [ ] Real backend authentication
- [ ] User profile management
- [ ] Role-based access control
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Activity logs
- [ ] Email notifications

---

**Last Updated**: October 24, 2025
**Version**: 1.0.0
