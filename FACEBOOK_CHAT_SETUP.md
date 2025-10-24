# Facebook Customer Chat Setup Guide

## 🚀 Quick Setup

### 1. Environment Variable
Thêm biến môi trường `VITE_FB_PAGE_ID` vào Vercel:

1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm biến mới:
   - **Name**: `VITE_FB_PAGE_ID`
   - **Value**: `your_facebook_page_id_here` (thay bằng Page ID thực tế)
   - **Environment**: Production, Preview, Development

### 2. Facebook Page Configuration
1. Vào Facebook Page → Settings → Messaging → Customer Chat Plugin
2. Thêm domain vào "Allowed domains":
   - `ai-recruit-dashboard.vercel.app` (hoặc domain của bạn)
   - `localhost:3000` (cho development)

### 3. Deploy
1. Deploy lại ứng dụng trên Vercel (rebuild required)
2. Kiểm tra console để đảm bảo không có lỗi
3. Biểu tượng Messenger 💬 sẽ xuất hiện ở góc phải màn hình

## 🔧 Technical Details

### Component Structure
- `src/components/FacebookChat.jsx`: Component chính quản lý Facebook Chat
- Tự động load Facebook SDK khi cần
- Chỉ hiển thị khi `VITE_FB_PAGE_ID` được set

### Integration Points
- Được thêm vào `App.jsx` để hiển thị trên tất cả trang
- Sử dụng Facebook SDK v18.0
- Hỗ trợ tiếng Việt (`vi_VN`)

### Error Handling
- Warning trong console nếu `VITE_FB_PAGE_ID` không được set
- Tự động kiểm tra và load Facebook SDK
- Graceful fallback nếu SDK load thất bại

## 🧪 Testing

### Local Development
1. Tạo file `.env.local`:
   ```
   VITE_FB_PAGE_ID=your_page_id_here
   ```
2. Chạy `npm run dev`
3. Kiểm tra console và chat widget

### Production
1. Đảm bảo environment variable đã được set trên Vercel
2. Deploy và kiểm tra trên domain thực
3. Test chat functionality

## 📱 Features

- ✅ Tự động load Facebook SDK
- ✅ Responsive design
- ✅ Multi-language support (Vietnamese)
- ✅ Error handling và logging
- ✅ Environment-based configuration
- ✅ Integration với n8n bot (nếu Page đã được kết nối)

## 🔗 Integration với n8n

Nếu Facebook Page đã được kết nối với n8n bot:
- Mọi tin nhắn từ chat widget sẽ tự động đi qua n8n flow
- Bot sẽ phản hồi trực tiếp trong chat widget
- Không cần cấu hình thêm

## 🐛 Troubleshooting

### Chat không hiển thị
1. Kiểm tra `VITE_FB_PAGE_ID` đã được set chưa
2. Kiểm tra domain đã được thêm vào Facebook Page settings chưa
3. Kiểm tra console có lỗi gì không

### SDK không load
1. Kiểm tra kết nối internet
2. Kiểm tra Facebook SDK URL có accessible không
3. Thử refresh trang

### Bot không phản hồi
1. Kiểm tra n8n flow có active không
2. Kiểm tra Facebook Page có được kết nối với n8n không
3. Kiểm tra access token có valid không
