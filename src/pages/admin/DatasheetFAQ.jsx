import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function DatasheetFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form, setForm] = useState({
    question: '',
    answer: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all FAQs
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Không thể tải danh sách FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Open modal for create/edit
  const openModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setForm({
        question: faq.question,
        answer: faq.answer
      });
    } else {
      setEditingFaq(null);
      setForm({ question: '', answer: '' });
    }
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setForm({ question: '', answer: '' });
    setError('');
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingFaq) {
        // Update
        const { error } = await supabase
          .from('faq')
          .update({
            question: form.question,
            answer: form.answer,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFaq.id);

        if (error) throw error;
        setSuccess('Cập nhật FAQ thành công!');
      } else {
        // Create
        const { error } = await supabase
          .from('faq')
          .insert([{
            question: form.question,
            answer: form.answer
          }]);

        if (error) throw error;
        setSuccess('Thêm FAQ thành công!');
      }

      fetchFaqs();
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      console.error('Error saving FAQ:', err);
      setError('Có lỗi xảy ra khi lưu FAQ');
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa FAQ này?')) return;

    try {
      const { error } = await supabase
        .from('faq')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Xóa FAQ thành công!');
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      setError('Không thể xóa FAQ');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý FAQ</h1>
          <p className="text-gray-600 mt-1">Quản lý câu hỏi thường gặp</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Thêm FAQ
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* FAQ Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Chưa có FAQ nào</p>
          <button
            onClick={() => openModal()}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Thêm FAQ đầu tiên
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Câu hỏi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Câu trả lời
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {faq.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">{faq.question}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="max-w-md truncate">{faq.answer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(faq.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(faq)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingFaq ? 'Chỉnh sửa FAQ' : 'Thêm FAQ mới'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Câu hỏi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  required
                  placeholder="Nhập câu hỏi..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Câu trả lời <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Nhập câu trả lời..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  {editingFaq ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}