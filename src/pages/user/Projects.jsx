export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'AI Matching Platform',
      description: 'Nền tảng AI kết nối ứng viên và nhà tuyển dụng với độ chính xác cao, sử dụng machine learning để phân tích và đề xuất phù hợp.',
      image: '🤖',
      tags: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
      status: 'Hoàn thành',
      client: 'TechCorp Vietnam',
      duration: '8 tháng',
      features: ['AI Matching', 'CV Analysis', 'Skill Assessment', 'Real-time Chat'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Smart Interview System',
      description: 'Hệ thống phỏng vấn thông minh sử dụng AI để đánh giá ứng viên qua video, phân tích ngôn ngữ cơ thể và giọng nói.',
      image: '🎥',
      tags: ['OpenCV', 'NLP', 'Vue.js', 'Node.js'],
      status: 'Hoàn thành',
      client: 'HR Solutions Inc',
      duration: '6 tháng',
      features: ['Video Analysis', 'Sentiment Analysis', 'Auto Scoring', 'Report Generation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'AI Talent Sourcing',
      description: 'Công cụ tìm kiếm nhân tài thông minh, quét các nền tảng tuyển dụng và mạng xã hội để tìm ứng viên phù hợp.',
      image: '🔍',
      tags: ['Web Scraping', 'NLP', 'React', 'MongoDB'],
      status: 'Đang triển khai',
      client: 'Recruitment Agency',
      duration: '4 tháng',
      features: ['Auto Sourcing', 'Profile Analysis', 'Contact Discovery', 'Lead Scoring'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Predictive Analytics HR',
      description: 'Hệ thống dự đoán xu hướng nhân sự, tỷ lệ nghỉ việc và nhu cầu tuyển dụng dựa trên dữ liệu lịch sử.',
      image: '📊',
      tags: ['Python', 'Scikit-learn', 'Django', 'PostgreSQL'],
      status: 'Hoàn thành',
      client: 'Enterprise Corp',
      duration: '10 tháng',
      features: ['Predictive Models', 'Dashboard Analytics', 'Trend Analysis', 'Alert System'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 5,
      title: 'AI Chatbot Recruitment',
      description: 'Chatbot AI hỗ trợ tuyển dụng 24/7, trả lời câu hỏi ứng viên, sàng lọc hồ sơ và lên lịch phỏng vấn tự động.',
      image: '💬',
      tags: ['NLP', 'Dialogflow', 'React', 'Firebase'],
      status: 'Hoàn thành',
      client: 'Startup Hub',
      duration: '3 tháng',
      features: ['Natural Language', 'Auto Screening', 'Schedule Management', 'Multi-language'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      title: 'Blockchain HR Verification',
      description: 'Hệ thống xác thực thông tin ứng viên bằng blockchain, đảm bảo tính minh bạch và chống gian lận.',
      image: '⛓️',
      tags: ['Blockchain', 'Solidity', 'React', 'Web3'],
      status: 'Đang phát triển',
      client: 'FinTech Company',
      duration: '6 tháng',
      features: ['Blockchain Storage', 'Smart Contracts', 'Verification System', 'Immutable Records'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-green-500';
      case 'Đang triển khai': return 'bg-yellow-500';
      case 'Đang phát triển': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Dự án đã thực hiện
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các dự án AI tuyển dụng tiêu biểu mà chúng tôi đã hoàn thành, thể hiện năng lực và kinh nghiệm trong lĩnh vực AI
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              {/* Project Image */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300`}>
                {project.image}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">{project.duration}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Client */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Khách hàng: </span>
                  <span className="text-sm text-gray-800 font-medium">{project.client}</span>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Tính năng chính:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded text-xs text-blue-600 border border-blue-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Thành tích của chúng tôi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Dự án AI hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
                <div className="text-gray-600">Độ chính xác AI</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600">Năm kinh nghiệm AI</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">AI hoạt động</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Có dự án AI muốn thực hiện?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn biến ý tưởng AI tuyển dụng thành hiện thực với giải pháp công nghệ tiên tiến nhất.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Bắt đầu dự án AI
          </button>
        </div>
      </div>
    </div>
  );
}
