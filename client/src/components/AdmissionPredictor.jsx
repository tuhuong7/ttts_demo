import { useState } from 'react';
import { TrendingUp, Calculator, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { historicalScoreService } from '../services';

function AdmissionPredictor() {
  const [formData, setFormData] = useState({
    math_score: '',
    literature_score: '',
    english_score: '',
    major_id: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    // Validation
    const scores = [
      parseFloat(formData.math_score),
      parseFloat(formData.literature_score),
      parseFloat(formData.english_score)
    ];

    if (scores.some((score) => isNaN(score) || score < 0 || score > 10)) {
      setError('Vui lòng nhập điểm hợp lệ (0-10)');
      return;
    }

    try {
      setLoading(true);
      const result = await historicalScoreService.predictAdmission({
        math_score: scores[0],
        literature_score: scores[1],
        english_score: scores[2],
        major_id: formData.major_id || undefined
      });
      setPrediction(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const totalScore = (
    parseFloat(formData.math_score || 0) +
    parseFloat(formData.literature_score || 0) +
    parseFloat(formData.english_score || 0)
  ).toFixed(2);

  return (
    <div className="bg-white border-4 border-gray-300 p-8 shadow-none">
      <div className="flex items-center space-x-4 mb-8 bg-gray-50 p-6 border-2 border-gray-200">
        <div className="bg-primary p-4 border-2 border-primary">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Dự đoán trúng tuyển</h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Sử dụng dữ liệu điểm chuẩn các năm</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Điểm Toán', field: 'math_score' },
            { label: 'Điểm Văn', field: 'literature_score' },
            { label: 'Điểm Anh', field: 'english_score' },
          ].map((item) => (
            <div key={item.field}>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">
                {item.label}
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData[item.field]}
                onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}
                placeholder="0.0"
                required
                className="w-full px-4 py-4 border-2 border-gray-300 focus:outline-none focus:border-primary text-xl font-bold"
              />
            </div>
          ))}
        </div>

        {(formData.math_score || formData.literature_score || formData.english_score) && (
          <div className="bg-primary text-white p-6 border-2 border-primary flex items-center justify-between">
            <span className="text-sm font-black uppercase tracking-widest">Tổng điểm xét tuyển:</span>
            <span className="text-4xl font-black">{totalScore}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 bg-primary text-white px-8 py-5 hover:bg-primary-dark transition-colors font-black uppercase tracking-widest border-2 border-primary disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Đang phân tích dữ liệu...</span>
            </>
          ) : (
            <>
              <TrendingUp className="h-6 w-6" />
              <span>Dự đoán kết quả ngay</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-600 text-white p-4 border-b-4 border-red-800 flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold uppercase tracking-tight">Lỗi hệ thống</h4>
            <p className="text-sm border-t border-white/20 mt-1 pt-1">{error}</p>
          </div>
        </div>
      )}

      {prediction && (
        <div className="mt-8 space-y-6">
          <div className={`border-4 p-8 ${
            prediction.probability >= 70
              ? 'border-green-600 bg-green-50'
              : prediction.probability >= 40
              ? 'border-yellow-600 bg-yellow-50'
              : 'border-red-600 bg-red-50'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black text-gray-950 text-2xl uppercase tracking-tighter">Kết quả phân tích</h4>
              {prediction.probability >= 70 ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <AlertCircle className="h-10 w-10 text-yellow-600" />
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-black text-gray-600 uppercase tracking-widest">Khả năng trúng tuyển</span>
                  <span className={`text-5xl font-black ${
                    prediction.probability >= 70
                      ? 'text-green-600'
                      : prediction.probability >= 40
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {prediction.probability}%
                  </span>
                </div>
                {/* Progress Bar - FLAT */}
                <div className="w-full bg-gray-200 h-6 border-2 border-gray-300">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      prediction.probability >= 70
                        ? 'bg-green-600'
                        : prediction.probability >= 40
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${prediction.probability}%` }}
                  ></div>
                </div>
              </div>

              {prediction.message && (
                <p className="text-base text-gray-800 bg-white p-6 border-l-8 border-primary font-bold leading-relaxed shadow-none">
                  {prediction.message}
                </p>
              )}

              {prediction.threshold && (
                <div className="flex justify-between items-center bg-white p-4 border-2 border-gray-300">
                  <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Điểm chuẩn tham khảo:</span>
                  <span className="text-2xl font-black text-primary">{prediction.threshold}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-gray-300 p-6">
            <h5 className="font-black text-gray-900 mb-3 uppercase tracking-widest text-sm">💡 Lưu ý quan trọng:</h5>
            <ul className="text-sm text-gray-700 space-y-2 font-bold">
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">■</span>
                <span>Kết quả chỉ mang tính chất tham khảo dựa trên dữ liệu lịch sử.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary mt-1">■</span>
                <span>Điểm chuẩn thực tế phụ thuộc vào phổ điểm và số lượng thí sinh đăng ký năm nay.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmissionPredictor;
