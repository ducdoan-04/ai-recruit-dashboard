export default function Services() {
  const services = [
    {
      icon: '🤖',
      title: 'AI Tuyển dụng thông minh',
      description: 'Sử dụng AI để phân tích CV, đánh giá ứng viên và đề xuất ứng viên phù hợp nhất.',
      features: ['CV Analysis', 'Skill Matching', 'Candidate Ranking', 'Interview Scheduling'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📊',
      title: 'Phân tích dữ liệu HR',
      description: 'Phân tích dữ liệu nhân sự để đưa ra insights và cải thiện quy trình tuyển dụng.',
      features: ['HR Analytics', 'Performance Metrics', 'Trend Analysis', 'Predictive Insights'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🎯',
      title: 'Tìm kiếm ứng viên chính xác',
      description: 'Sử dụng AI để tìm kiếm và lọc ứng viên phù hợp từ các nguồn khác nhau.',
      features: ['Smart Search', 'Talent Sourcing', 'Profile Matching', 'Quality Filtering'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💬',
      title: 'Chatbot tuyển dụng',
      description: 'Chatbot AI tự động trả lời câu hỏi của ứng viên và hỗ trợ quy trình tuyển dụng.',
      features: ['24/7 Support', 'FAQ Automation', 'Application Guidance', 'Status Updates'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📱',
      title: 'Ứng dụng di động',
      description: 'Phát triển ứng dụng di động cho ứng viên và nhà tuyển dụng.',
      features: ['Mobile App', 'Push Notifications', 'Offline Access', 'User Experience'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🔒',
      title: 'Bảo mật dữ liệu',
      description: 'Đảm bảo bảo mật và quyền riêng tư cho dữ liệu ứng viên và doanh nghiệp.',
      features: ['Data Encryption', 'Privacy Protection', 'Access Control', 'Compliance'],
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cung cấp các giải pháp AI tuyển dụng toàn diện để cách mạng hóa quy trình nhân sự
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Tính năng chính:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20 bg-white rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Quy trình AI tuyển dụng</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phân tích yêu cầu</h3>
              <p className="text-gray-600">AI phân tích job description và yêu cầu tuyển dụng</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tìm kiếm ứng viên</h3>
              <p className="text-gray-600">AI tìm kiếm và lọc ứng viên phù hợp từ nhiều nguồn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Đánh giá AI</h3>
              <p className="text-gray-600">AI đánh giá và xếp hạng ứng viên theo độ phù hợp</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Đề xuất ứng viên</h3>
              <p className="text-gray-600">Đề xuất danh sách ứng viên tốt nhất cho nhà tuyển dụng</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl p-12 border border-blue-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Sẵn sàng cách mạng hóa tuyển dụng?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí về giải pháp AI tuyển dụng phù hợp nhất cho doanh nghiệp của bạn.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg">
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
