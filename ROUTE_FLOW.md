# Route Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Navigation                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    http://localhost:5173/
                              │
                              ▼
                    ┌──────────────────┐
                    │  Root Route (/)  │
                    └──────────────────┘
                              │
                              ▼
                    Redirect to /admin
                              │
                              ▼
                    ┌──────────────────┐
                    │   /admin route   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   AuthGuard      │ ← Check localStorage.getItem('adminToken')
                    └──────────────────┘
                       /            \
                      /              \
            No Token                  Has Token
                    /                  \
                   ▼                    ▼
        ┌────────────────────┐   ┌────────────────────┐
        │  /admin/login      │   │   AdminLayout      │
        │                    │   │   (with Sidebar)   │
        │  • Email input     │   └────────────────────┘
        │  • Password input  │            │
        │  • Submit button   │            ▼
        └────────────────────┘   Redirect to /admin/home
                   │                      │
                   │                      ▼
            Login Success        ┌────────────────────┐
                   │             │   Admin Routes     │
                   │             └────────────────────┘
                   │                      │
                   └──────────────────────┤
                                          │
                    ┌─────────────────────┴───────────────────────┐
                    │                                             │
         ┌──────────▼──────────┐                    ┌────────────▼────────────┐
         │   /admin/home       │                    │  /admin/post-facebook   │
         │   (AdminHome)       │                    │  (PostFacebook)         │
         │                     │                    └─────────────────────────┘
         │  • Stats Cards      │
         │  • Charts           │                    ┌─────────────────────────┐
         │  • Candidate Table  │                    │  /admin/post-linkedin   │
         └─────────────────────┘                    │  (PostLinkedIn)         │
                                                    └─────────────────────────┘
         ┌─────────────────────┐
         │  /admin/post-twitter│                    ┌─────────────────────────┐
         │  (PostTwitter)      │                    │  /admin/post-website    │
         └─────────────────────┘                    │  (PostWebsite)          │
                                                    └─────────────────────────┘
         ┌─────────────────────┐
         │/admin/interview-    │                    ┌─────────────────────────┐
         │schedule             │                    │  /admin/settings        │
         │(InterviewSchedule)  │                    │  (Settings)             │
         └─────────────────────┘                    └─────────────────────────┘
                    │
                    │
                    ▼
         ┌─────────────────────┐
         │   Logout Button     │ ← Click
         │   in Sidebar        │
         └─────────────────────┘
                    │
                    ▼
         Remove adminToken from localStorage
                    │
                    ▼
         Redirect to /admin/login
```

## Authentication State Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Actions                            │
└─────────────────────────────────────────────────────────────┘

1. Initial Visit:
   User → http://localhost:5173
   └─→ No token? → Redirect to /admin/login

2. Login Process:
   User → Enter credentials → Submit form
   └─→ Mock validation passes
       └─→ localStorage.setItem('adminToken', token)
           └─→ navigate('/admin/home')

3. Accessing Protected Routes:
   User → Click menu item (e.g., "Auto Post - Facebook")
   └─→ AuthGuard checks token
       ├─→ Token exists? → Allow access
       └─→ No token? → Redirect to /admin/login

4. Logout:
   User → Click "Đăng xuất" button
   └─→ localStorage.removeItem('adminToken')
       └─→ navigate('/admin/login')
```

## Component Hierarchy

```
main.jsx
  └─ BrowserRouter
      └─ App.jsx (Routes)
          ├─ Route: /admin/login
          │   └─ AdminLogin
          │
          └─ Route: /admin (Protected by AuthGuard)
              └─ AdminLayout
                  ├─ Sidebar (navigation)
                  └─ Outlet (renders child routes)
                      ├─ /admin/home → AdminHome
                      ├─ /admin/post-facebook → PostFacebook
                      ├─ /admin/post-linkedin → PostLinkedIn
                      ├─ /admin/post-twitter → PostTwitter
                      ├─ /admin/post-website → PostWebsite
                      ├─ /admin/interview-schedule → InterviewSchedule
                      └─ /admin/settings → Settings
```

## LocalStorage Structure

```javascript
// After successful login
localStorage = {
  "adminToken": "admin_token_1729756800000"
}

// After logout
localStorage = {
  // adminToken is removed
}
```

## Sidebar Menu Structure

```
┌─────────────────────────────┐
│  🤖 AI Recruit             │
│  Admin Dashboard            │
├─────────────────────────────┤
│  📊 Dashboard               │ ← /admin/home
│  📘 Auto Post - Facebook    │ ← /admin/post-facebook
│  💼 Auto Post - LinkedIn    │ ← /admin/post-linkedin
│  🐦 Auto Post - Twitter     │ ← /admin/post-twitter
│  🌐 Auto Post - Website     │ ← /admin/post-website
│  📅 Interview Schedule      │ ← /admin/interview-schedule
│  ⚙️  Settings               │ ← /admin/settings
├─────────────────────────────┤
│  🚪 Đăng xuất              │
└─────────────────────────────┘
```
