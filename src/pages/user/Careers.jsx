import { useState } from 'react';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '15-25M VND',
      description: 'Phát triển giao diện người dùng hiện đại với React, Vue.js và các công nghệ frontend mới nhất.',
      requirements: [
        'Kinh nghiệm 2+ năm với React.js hoặc Vue.js',
        'Thành thạo HTML5, CSS3, JavaScript ES6+',
        'Kinh nghiệm với TailwindCSS hoặc CSS-in-JS',
        'Hiểu biết về responsive design và cross-browser compatibility',
        'Kinh nghiệm với Git và các công cụ phát triển hiện đại'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['React', 'Vue.js', 'JavaScript', 'CSS3', 'Git'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '18-30M VND',
      description: 'Xây dựng và phát triển các API, microservices và hệ thống backend với Node.js, Python.',
      requirements: [
        'Kinh nghiệm 3+ năm với Node.js hoặc Python',
        'Thành thạo REST API và GraphQL',
        'Kinh nghiệm với MongoDB, PostgreSQL',
        'Hiểu biết về microservices architecture',
        'Kinh nghiệm với Docker và cloud platforms'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'Full-stack Developer',
      department: 'Engineering',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '3-6 years',
      salary: '20-35M VND',
      description: 'Phát triển toàn diện cả frontend và backend, xây dựng ứng dụng web hoàn chỉnh.',
      requirements: [
        'Kinh nghiệm 3+ năm full-stack development',
        'Thành thạo React/Vue.js và Node.js/Python',
        'Kinh nghiệm với database design và optimization',
        'Hiểu biết về DevOps và deployment',
        'Kỹ năng giải quyết vấn đề và tư duy logic'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '16-28M VND',
      description: 'Quản lý infrastructure, CI/CD pipeline và đảm bảo hệ thống vận hành ổn định.',
      requirements: [
        'Kinh nghiệm 2+ năm với AWS/Azure/GCP',
        'Thành thạo Docker, Kubernetes',
        'Kinh nghiệm với CI/CD tools (Jenkins, GitLab CI)',
        'Hiểu biết về monitoring và logging',
        'Kỹ năng automation và scripting'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '12-22M VND',
      description: 'Thiết kế giao diện người dùng đẹp, trực quan và tối ưu trải nghiệm người dùng.',
      requirements: [
        'Kinh nghiệm 2+ năm UI/UX design',
        'Thành thạo Figma, Adobe Creative Suite',
        'Hiểu biết về design system và user research',
        'Kinh nghiệm với prototyping tools',
        'Portfolio thể hiện khả năng thiết kế'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      title: 'Project Manager',
      department: 'Management',
      location: 'Ho Chi Minh City',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '18-30M VND',
      description: 'Quản lý dự án phần mềm, đảm bảo tiến độ và chất lượng sản phẩm.',
      requirements: [
        'Kinh nghiệm 3+ năm quản lý dự án phần mềm',
        'Hiểu biết về Agile/Scrum methodology',
        'Kỹ năng giao tiếp và lãnh đạo tốt',
        'Kinh nghiệm với project management tools',
        'Khả năng làm việc với nhiều team khác nhau'
      ],
      benefits: [
        'Lương cạnh tranh và thưởng theo hiệu suất',
        'Bảo hiểm sức khỏe và các phúc lợi khác',
        'Môi trường làm việc năng động, sáng tạo',
        'Cơ hội phát triển kỹ năng và thăng tiến'
      ],
      skills: ['Agile', 'Scrum', 'Jira', 'Leadership', 'Communication'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'bg-green-500';
      case 'Part-time': return 'bg-blue-500';
      case 'Contract': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Cơ hội nghề nghiệp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tham gia đội ngũ AI chuyên gia của chúng tôi và cùng xây dựng những sản phẩm AI tuyển dụng tiên tiến
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${job.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  💼
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(job.type)}`}>
                  {job.type}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>⏰</span>
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <span>💰</span>
                  <span>{job.salary}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded text-xs text-blue-600 border border-blue-500/30">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span>📍 {selectedJob.location}</span>
                      <span>⏰ {selectedJob.experience}</span>
                      <span>💰 {selectedJob.salary}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Mô tả công việc</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Yêu cầu</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mt-2"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Quyền lợi</h3>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2"></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Kỹ năng yêu cầu</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full text-sm text-indigo-300 border border-indigo-500/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowApplicationForm(true)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      Ứng tuyển ngay
                    </button>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-2xl w-full border border-white/20">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Ứng tuyển {selectedJob?.title}</h2>
                  <button 
                    onClick={() => setShowApplicationForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Họ tên *</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập họ tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                      <input 
                        type="email" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Kinh nghiệm</label>
                      <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Chọn kinh nghiệm</option>
                        <option value="0-1">0-1 năm</option>
                        <option value="1-3">1-3 năm</option>
                        <option value="3-5">3-5 năm</option>
                        <option value="5+">5+ năm</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Thư xin việc</label>
                    <textarea 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                      placeholder="Viết thư xin việc của bạn..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">CV/Resume</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                    >
                      Gửi ứng tuyển
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Why Work With Us */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Tại sao chọn chúng tôi?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🚀
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Môi trường AI</h3>
              <p className="text-gray-600">Làm việc trong môi trường AI sáng tạo với các dự án thú vị</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                📈
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Phát triển AI</h3>
              <p className="text-gray-600">Cơ hội học hỏi và phát triển kỹ năng AI với công nghệ mới nhất</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Lương cạnh tranh</h3>
              <p className="text-gray-600">Mức lương hấp dẫn và các phúc lợi tốt nhất trong ngành AI</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                🤝
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Đội ngũ AI</h3>
              <p className="text-gray-600">Làm việc với đội ngũ AI chuyên nghiệp, thân thiện và hỗ trợ lẫn nhau</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
