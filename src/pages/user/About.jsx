export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Chào mừng đến với
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI RECRUIT
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi là công ty công nghệ chuyên cung cấp giải pháp AI cho tuyển dụng, tư vấn chuyển đổi số và phát triển hệ thống quản lý nhân sự thông minh.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Ứng viên đã tuyển</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Công ty đối tác</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Tỷ lệ thành công</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Hỗ trợ AI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Về chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Sứ mệnh</h3>
              <p className="text-gray-700 leading-relaxed">
                Cách mạng hóa quy trình tuyển dụng bằng AI, giúp doanh nghiệp tìm được nhân tài phù hợp một cách nhanh chóng và chính xác.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">Tầm nhìn</h3>
              <p className="text-gray-700 leading-relaxed">
                Trở thành nền tảng AI tuyển dụng hàng đầu tại Việt Nam, kết nối nhân tài với cơ hội việc làm tốt nhất.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Giá trị cốt lõi</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Đổi mới với AI</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Minh bạch và công bằng</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Hiệu quả cao</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Tin cậy và bảo mật</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Đội ngũ chuyên gia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                🤖
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chuyên gia AI</h3>
              <p className="text-gray-600">Đội ngũ chuyên gia AI với kinh nghiệm sâu về machine learning và NLP</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👩‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chuyên gia HR</h3>
              <p className="text-gray-600">Chuyên gia nhân sự với hiểu biết sâu về quy trình tuyển dụng</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                🛠️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hỗ trợ kỹ thuật</h3>
              <p className="text-gray-600">Đội ngũ hỗ trợ 24/7, đảm bảo hệ thống AI vận hành ổn định</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
