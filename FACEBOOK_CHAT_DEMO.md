# Facebook Chat Demo & Testing

## 🧪 Test với Page ID giả

Để test Facebook Chat widget, bạn có thể:

### 1. Local Testing
Tạo file `.env.local` trong root project:
```bash
VITE_FB_PAGE_ID=123456789012345
```

### 2. Test Flow
1. Chạy `npm run dev`
2. Mở http://localhost:5173
3. Kiểm tra console:
   - ✅ Nếu có Page ID: "Facebook Chat initialized"
   - ⚠️ Nếu không có Page ID: "VITE_FB_PAGE_ID environment variable is not set"

### 3. Production Testing
1. Set environment variable trên Vercel:
   ```
   VITE_FB_PAGE_ID=your_real_page_id
   ```
2. Deploy và test trên domain thực
3. Thêm domain vào Facebook Page settings

## 🔍 Debug Information

### Console Logs
- `Facebook Chat initialized` - Chat widget đã được khởi tạo
- `VITE_FB_PAGE_ID environment variable is not set` - Cần set environment variable
- `Facebook SDK loaded successfully` - SDK đã load thành công

### Network Tab
Kiểm tra các request:
- `https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js` - Facebook SDK
- Các request đến Facebook API

### Elements Tab
Tìm các element:
- `<div id="fb-root"></div>` - Facebook root container
- `<div id="fb-customer-chat" class="fb-customerchat"></div>` - Chat widget

## 🎯 Expected Behavior

### ✅ Success Case
1. Biểu tượng Messenger 💬 xuất hiện góc phải
2. Click vào mở chat window
3. Có thể gửi tin nhắn
4. Bot phản hồi (nếu đã kết nối n8n)

### ⚠️ Warning Case
1. Console warning về missing Page ID
2. Không có chat widget
3. Ứng dụng vẫn hoạt động bình thường

### ❌ Error Case
1. Console error về Facebook SDK
2. Chat widget không load
3. Cần kiểm tra network và Facebook settings

## 🚀 Production Checklist

- [ ] `VITE_FB_PAGE_ID` đã được set trên Vercel
- [ ] Domain đã được thêm vào Facebook Page settings
- [ ] Facebook Page đã được kết nối với n8n (nếu cần)
- [ ] Test chat functionality trên production
- [ ] Kiểm tra responsive design trên mobile
- [ ] Test với nhiều browser khác nhau

## 📱 Mobile Testing

Facebook Chat widget tự động responsive:
- Desktop: Chat window mở bên phải
- Mobile: Chat window mở full screen
- Touch-friendly interface

## 🔧 Customization

### Styling
Facebook Chat widget có thể customize qua CSS:
```css
.fb-customerchat {
  /* Custom styles */
}
```

### Configuration
Có thể thay đổi trong `FacebookChat.jsx`:
- `version: 'v18.0'` - Facebook SDK version
- `attribution: 'biz_inbox'` - Attribution setting
- `vi_VN` - Language setting
