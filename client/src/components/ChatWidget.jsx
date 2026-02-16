import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý AI của trường. Tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Điểm chuẩn năm nay?',
    'Học phí bao nhiêu?',
    'Phương thức xét tuyển?'
  ];

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'Cảm ơn bạn đã liên hệ! Để được tư vấn chi tiết hơn, vui lòng truy cập trang AI Tư vấn hoặc liên hệ hotline: (0236) 3653 561',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 border-4 border-primary-dark hover:bg-primary-dark transition-colors z-50"
          title="Chat với chúng tôi"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold h-6 w-6 flex items-center justify-center border-2 border-white">
            1
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white border-4 border-gray-300 flex flex-col z-50">
     
          <div className="bg-primary text-white p-4 flex items-center justify-between border-b-4 border-primary-dark">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 border-2 border-white">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Trợ lý AI</h3>
                <p className="text-xs text-blue-100">Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-primary-dark p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Câu hỏi nhanh:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 ${
                      msg.sender === 'user' ? 'bg-primary border-primary' : 'bg-white border-gray-300'
                    }`}
                  >
                    <span className={`text-xs font-bold ${msg.sender === 'user' ? 'text-white' : 'text-primary'}`}>
                      {msg.sender === 'user' ? 'U' : 'AI'}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-3 border-2 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-white px-4 py-3 border-2 border-gray-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t-4 border-gray-300">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary disabled:bg-gray-100"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white p-3 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-primary"
                disabled={isTyping || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
