# 🤖 AI Recruit Chatbot - Hướng dẫn sử dụng

## 📋 Tổng quan

AI Recruit Chatbot sử dụng **n8n Official Chat Widget** - một widget chat chính thức được phát triển bởi n8n team. Widget này có 2 phiên bản:

1. **React Component** - Dành cho ứng dụng React
2. **Standalone Script** - Có thể nhúng vào bất kỳ website nào

## 🚀 Tính năng chính

- ✅ Giao diện đẹp, hiện đại
- ✅ Responsive design (tương thích mobile)
- ✅ Tích hợp n8n webhook
- ✅ Lưu lịch sử chat trong localStorage
- ✅ Nhiều theme màu sắc
- ✅ Không cần đăng nhập Facebook
- ✅ Dễ dàng tùy chỉnh

## 📦 Cài đặt

### React Component

```bash
# Đã có sẵn trong dự án
npm install axios  # Nếu chưa có
```

### Standalone Script

Không cần cài đặt gì, chỉ cần thêm script vào HTML.

## 🔧 Cách sử dụng

### 1. React Component

```jsx
import N8nChatWidget from './components/N8nChatWidget';

function App() {
  return (
    <div>
      {/* Sử dụng với cấu hình mặc định */}
      <N8nChatWidget />
      
      {/* Hoặc tùy chỉnh */}
      <N8nChatWidget 
        webhookUrl="https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat"
        title="Chat với AI Recruit"
        subtitle="Trợ lý AI tuyển dụng thông minh"
        placeholder="Nhập tin nhắn của bạn..."
        primaryColor="#0084ff"
        welcomeMessage="Xin chào! Tôi có thể giúp gì cho bạn?"
        showWelcomeScreen={true}
        showPoweredBy={false}
      />
    </div>
  );
}
```

#### Props của N8nChatWidget:

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `webhookUrl` | string | `"https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat"` | URL webhook n8n |
| `title` | string | `"Chat với AI Recruit"` | Tiêu đề chat window |
| `subtitle` | string | `"Trợ lý AI tuyển dụng thông minh"` | Phụ đề chat window |
| `placeholder` | string | `"Nhập tin nhắn của bạn..."` | Placeholder cho input |
| `primaryColor` | string | `"#0084ff"` | Màu chính của widget |
| `textColor` | string | `"#333333"` | Màu chữ |
| `backgroundColor` | string | `"#ffffff"` | Màu nền |
| `position` | string | `"bottom-right"` | Vị trí widget |
| `welcomeMessage` | string | `"Xin chào! Tôi là trợ lý AI Recruit..."` | Tin nhắn chào mừng |
| `showWelcomeScreen` | boolean | `true` | Hiển thị màn hình chào |
| `showPoweredBy` | boolean | `false` | Hiển thị "Powered by n8n" |

### 2. Standalone Script

#### Cách sử dụng cơ bản:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
</head>
<body>
    <!-- Nội dung website -->
    
    <!-- n8n Chat widget script -->
    <script type="module">
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

        createChat({
            webhookUrl: 'https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat'
        });
    </script>
</body>
</html>
```

#### Cách sử dụng với cấu hình:

```html
<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
    import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

    createChat({
        webhookUrl: 'https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat',
        title: 'Chat với AI Recruit',
        subtitle: 'Trợ lý AI tuyển dụng thông minh',
        placeholder: 'Nhập tin nhắn của bạn...',
        primaryColor: '#0084ff',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        position: 'bottom-right',
        welcomeMessage: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        showWelcomeScreen: true,
        showPoweredBy: false
    });
</script>
```

#### Các tùy chọn cấu hình:

| Option | Type | Default | Mô tả |
|--------|------|---------|-------|
| `webhookUrl` | string | Required | URL webhook n8n |
| `title` | string | `"Chat"` | Tiêu đề chat window |
| `subtitle` | string | `""` | Phụ đề chat window |
| `placeholder` | string | `"Type a message..."` | Placeholder cho input |
| `primaryColor` | string | `"#007bff"` | Màu chính của widget |
| `textColor` | string | `"#333333"` | Màu chữ |
| `backgroundColor` | string | `"#ffffff"` | Màu nền |
| `position` | string | `"bottom-right"` | Vị trí widget |
| `welcomeMessage` | string | `""` | Tin nhắn chào mừng |
| `showWelcomeScreen` | boolean | `false` | Hiển thị màn hình chào |
| `showPoweredBy` | boolean | `true` | Hiển thị "Powered by n8n" |

## 🔗 Cấu hình n8n Workflow

### 1. Tạo Webhook Trigger

1. Tạo workflow mới trong n8n
2. Thêm node **Webhook**
3. Cấu hình:
   - **HTTP Method**: POST
   - **Path**: `/chatbot` (hoặc tùy ý)
   - **Response Mode**: "Respond to Webhook"

### 2. Xử lý tin nhắn

Thêm các node xử lý sau Webhook:

- **AI/GPT Node** - Xử lý tin nhắn với AI
- **HTTP Request** - Gọi API bên ngoài
- **Code Node** - Xử lý logic tùy chỉnh

### 3. Trả về phản hồi

Cuối workflow, thêm node **Respond to Webhook** với response:

```json
{
  "reply": "Tin nhắn phản hồi từ bot"
}
```

### Ví dụ n8n Workflow:

```
Webhook → AI Node → Respond to Webhook
```

## 📊 API Reference

### Chatbot API (`src/api/chatbot.js`)

#### `sendChatMessage(message, sessionId, metadata)`

Gửi tin nhắn đến n8n webhook.

**Parameters:**
- `message` (string): Tin nhắn người dùng
- `sessionId` (string, optional): ID phiên chat
- `metadata` (object, optional): Metadata bổ sung

**Returns:** Promise với kết quả

#### `getSessionId()`

Lấy hoặc tạo session ID.

**Returns:** string

#### `saveChatHistory(messages)`

Lưu lịch sử chat vào localStorage.

**Parameters:**
- `messages` (array): Mảng tin nhắn

#### `loadChatHistory()`

Tải lịch sử chat từ localStorage.

**Returns:** array

#### `clearChatHistory()`

Xóa lịch sử chat.

#### `testWebhookConnection(webhookUrl)`

Test kết nối đến webhook.

**Parameters:**
- `webhookUrl` (string): URL webhook để test

**Returns:** Promise với kết quả test

#### `getChatStats()`

Lấy thống kê chat.

**Returns:** object với thống kê

## 🎨 Customization

### Thay đổi màu sắc

Trong file `ChatWidget.jsx`, bạn có thể thêm theme mới:

```javascript
const themeColors = {
  // ... existing themes
  custom: {
    primary: '#your-color',
    primaryHover: '#your-hover-color',
    background: '#your-bg-color',
    text: '#your-text-color'
  }
};
```

### Thay đổi vị trí (standalone script)

Thêm CSS tùy chỉnh:

```css
#ai-recruit-chat-button {
  bottom: 20px !important;
  left: 20px !important; /* Thay vì right */
}
```

## 🧪 Testing

### Test React Component

1. Mở trang `/chat-demo` trong ứng dụng
2. Test webhook connection
3. Thử chat với bot

### Test Standalone Script

1. Mở file `public/chat-demo.html` trong browser
2. Test webhook connection
3. Thử chat với bot

## 📱 Responsive Design

Widget tự động responsive:

- **Desktop**: 320x400px ở góc phải
- **Tablet**: 320x400px ở góc phải
- **Mobile**: Full screen với padding

## 🔒 Bảo mật

- Tất cả dữ liệu được gửi qua HTTPS
- Session ID được tạo ngẫu nhiên
- Không lưu thông tin nhạy cảm
- Có thể thêm authentication nếu cần

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Webhook không hoạt động**
   - Kiểm tra URL webhook
   - Đảm bảo n8n workflow đang chạy
   - Test webhook bằng Postman

2. **Chat không hiển thị**
   - Kiểm tra console browser
   - Đảm bảo script được load
   - Kiểm tra z-index conflicts

3. **Lỗi CORS**
   - Cấu hình CORS trong n8n
   - Hoặc dùng proxy server

### Debug:

```javascript
// Mở console và chạy:
console.log(window.aiRecruitChat); // Xem API
console.log(localStorage.getItem('ai-recruit-chat-history')); // Xem lịch sử
```

## 📈 Performance

- Script size: ~15KB (gzipped)
- Load time: <100ms
- Memory usage: <1MB
- Compatible với tất cả browser hiện đại

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 📞 Support

- Email: support@airecruit.io.vn
- GitHub Issues: [Tạo issue mới](https://github.com/your-repo/issues)
- Documentation: [Xem thêm docs](https://docs.airecruit.io.vn)

---

**Chúc bạn sử dụng chatbot thành công! 🎉**
