export default function Knowledge() {
  const knowledgeTopics = [
    {
      id: 1,
      title: 'AI trong Tuyển dụng',
      description: 'Ứng dụng trí tuệ nhân tạo trong quy trình tuyển dụng, từ sàng lọc CV đến đánh giá ứng viên.',
      icon: '🤖',
      category: 'AI/ML',
      level: 'Intermediate',
      duration: '3-4 tháng',
      topics: ['CV Analysis', 'Skill Matching', 'Bias Detection', 'Predictive Analytics'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Machine Learning HR',
      description: 'Sử dụng machine learning để phân tích dữ liệu nhân sự và dự đoán xu hướng tuyển dụng.',
      icon: '📊',
      category: 'Data Science',
      level: 'Advanced',
      duration: '4-6 tháng',
      topics: ['Predictive Modeling', 'Data Mining', 'Statistical Analysis', 'HR Analytics'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Natural Language Processing',
      description: 'Xử lý ngôn ngữ tự nhiên trong phân tích CV, đánh giá ứng viên và chatbot tuyển dụng.',
      icon: '💬',
      category: 'NLP',
      level: 'Intermediate',
      duration: '3-5 tháng',
      topics: ['Text Analysis', 'Sentiment Analysis', 'Chatbot Development', 'Language Models'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'Computer Vision HR',
      description: 'Ứng dụng thị giác máy tính trong phân tích video phỏng vấn và đánh giá ứng viên.',
      icon: '👁️',
      category: 'Computer Vision',
      level: 'Advanced',
      duration: '5-7 tháng',
      topics: ['Video Analysis', 'Facial Recognition', 'Emotion Detection', 'Behavior Analysis'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 5,
      title: 'Data Privacy & Ethics',
      description: 'Bảo mật dữ liệu và đạo đức trong AI tuyển dụng, đảm bảo tính công bằng và minh bạch.',
      icon: '🔒',
      category: 'Ethics',
      level: 'Beginner',
      duration: '2-3 tháng',
      topics: ['GDPR Compliance', 'Bias Mitigation', 'Fair AI', 'Data Protection'],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 6,
      title: 'Modern Recruitment Tech',
      description: 'Công nghệ tuyển dụng hiện đại, từ ATS đến video interviewing và assessment tools.',
      icon: '💻',
      category: 'HR Tech',
      level: 'Beginner',
      duration: '2-4 tháng',
      topics: ['ATS Systems', 'Video Interviewing', 'Assessment Tools', 'Recruitment Automation'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Kiến thức AI & Tuyển dụng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chia sẻ kiến thức và kinh nghiệm về AI, machine learning và các phương pháp tuyển dụng hiện đại
          </p>
        </div>

        {/* Knowledge Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {knowledgeTopics.map((topic) => (
            <div 
              key={topic.id}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              {/* Topic Header */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${topic.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {topic.description}
                </p>
              </div>
              
              {/* Topic Meta */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Danh mục:</span>
                  <span className="text-sm text-gray-800 font-medium">{topic.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Cấp độ:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(topic.level)}`}>
                    {topic.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Thời gian:</span>
                  <span className="text-sm text-gray-800 font-medium">{topic.duration}</span>
                </div>
              </div>
              
              {/* Topics Covered */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Nội dung học:</h4>
                <div className="space-y-2">
                  {topic.topics.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Lộ trình học tập AI</h2>
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Foundation</h3>
                <p className="text-gray-600">Học các kiến thức cơ bản về AI và machine learning</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">• Python Programming</div>
                  <div className="text-sm text-gray-500">• Statistics & Math</div>
                  <div className="text-sm text-gray-500">• Data Analysis</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">AI Development</h3>
                <p className="text-gray-600">Phát triển kỹ năng xây dựng hệ thống AI và ML</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">• Machine Learning</div>
                  <div className="text-sm text-gray-500">• Deep Learning</div>
                  <div className="text-sm text-gray-500">• NLP & Computer Vision</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">AI in HR</h3>
                <p className="text-gray-600">Ứng dụng AI trong tuyển dụng và quản lý nhân sự</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-500">• Recruitment AI</div>
                  <div className="text-sm text-gray-500">• HR Analytics</div>
                  <div className="text-sm text-gray-500">• Ethics & Bias</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Tài nguyên học tập</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Documentation</h3>
              <p className="text-gray-600 text-sm">Tài liệu chính thức về AI và machine learning</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Tutorials</h3>
              <p className="text-gray-600 text-sm">Video hướng dẫn AI từ cơ bản đến nâng cao</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Labs</h3>
              <p className="text-gray-600 text-sm">Thực hành với các dự án AI thực tế</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Community</h3>
              <p className="text-gray-600 text-sm">Tham gia cộng đồng AI và trao đổi kinh nghiệm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
