import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function RulesCheckCV() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [form, setForm] = useState({
    rule_name: '',
    rule_text: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all rules
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('llm_rules') // Sửa từ 'n8n_rules' thành 'llm_rules'
        .select('*')
        .order('rule_name', { ascending: true });

      if (error) throw error;
      setRules(data || []);
    } catch (err) {
      console.error('Error fetching rules:', err);
      setError('Không thể tải danh sách rules');
    } finally {
      setLoading(false);
    }
  };

  // Open modal for create/edit
  const openModal = (rule = null) => {
    if (rule) {
      setEditingRule(rule);
      setForm({
        rule_name: rule.rule_name,
        rule_text: rule.rule_text
      });
    } else {
      setEditingRule(null);
      setForm({ rule_name: '', rule_text: '' });
    }
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingRule(null);
    setForm({ rule_name: '', rule_text: '' });
    setError('');
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update rule
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingRule) {
        // Update
        const { error } = await supabase
          .from('llm_rules') // Sửa từ 'n8n_rules' thành 'llm_rules'
          .update({
            rule_name: form.rule_name,
            rule_text: form.rule_text,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingRule.id);

        if (error) throw error;
        setSuccess('Cập nhật rule thành công!');
      } else {
        // Create
        const { error } = await supabase
          .from('llm_rules') // Sửa từ 'n8n_rules' thành 'llm_rules'
          .insert([{
            rule_name: form.rule_name,
            rule_text: form.rule_text
          }]);

        if (error) throw error;
        setSuccess('Thêm rule thành công!');
      }

      fetchRules();
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      console.error('Error saving rule:', err);
      setError('Có lỗi xảy ra khi lưu rule');
    }
  };

  // Delete rule
  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa rule này?')) return;

    try {
      const { error } = await supabase
        .from('llm_rules') // Sửa từ 'n8n_rules' thành 'llm_rules'
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Xóa rule thành công!');
      fetchRules();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting rule:', err);
      setError('Không thể xóa rule');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Rules Check CV</h1>
          <p className="text-gray-600 mt-1">Quản lý các quy tắc AI đánh giá CV ứng viên</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Thêm Rule
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

      {/* Rules Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">Chưa có rule nào</p>
          <button
            onClick={() => openModal()}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Thêm rule đầu tiên
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Tên Rule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nội dung Prompt
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {rule.rule_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="max-w-3xl line-clamp-3 whitespace-pre-wrap">
                      {rule.rule_text}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openModal(rule)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      title="Chỉnh sửa"
                    >
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Xóa"
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
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-indigo-500 to-purple-600">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingRule ? '✏️ Chỉnh sửa Rule' : '➕ Thêm Rule mới'}
                </h2>
                <p className="text-sm text-white/80 mt-1">
                  Prompt LLM để AI đánh giá CV
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Rule Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏷️ Tên Rule <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rule_name"
                  value={form.rule_name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Rule_4_HR_RECRUITER"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Rule Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 Nội dung Prompt LLM <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="rule_text"
                  value={form.rule_text}
                  onChange={handleChange}
                  required
                  rows="15"
                  placeholder="Nhập prompt chi tiết cho AI đánh giá CV..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 <strong>Tips:</strong> Viết prompt rõ ràng, có cấu trúc. Ví dụ: "Bạn là AI đánh giá CV. Hãy phân tích..."
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-lg"
                >
                  {editingRule ? '💾 Cập nhật' : '➕ Thêm mới'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  ❌ Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}