import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, User, Send, Sparkles, MessageSquare, AlertCircle, RefreshCw, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const PRESET_PROMPTS = [
  'كيف أقوم بتدليك الوجه والفك لتحديد الفكين ومحاربة الترهل؟',
  'هل الرياضة في الساعة 21:15 تسبب الأرق؟ وكيف أتجنب ذلك؟',
  'اقترح عشاءً خفيفاً وصحياً ومريحاً للمعدة يتماشى مع ساعة الوصول 20:30.',
  'ما هو الترتيب الصحيح لترطيب البشرة ومساج الوجه بالزيوت؟'
];

export default function AICoach() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('daily_helper_chat_log');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('daily_helper_chat_log', JSON.stringify(messages));
    // Scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ غير متوقع أثناء الاتصال بالخادم.');
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'فشل الاتصال بمساعد الذكاء الاصطناعي. يرجى التحقق من الخادم.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('هل تريد مسح سجل المحادثة مع المساعد الذكي؟')) {
      setMessages([]);
      setErrorMessage(null);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-natural-border shadow-xs flex flex-col h-[650px]" id="ai-coach-card">
      {/* Header info */}
      <div className="flex justify-between items-center border-b border-natural-border pb-4 mb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-natural-primary rounded-xl text-white shadow-sm">
            <Bot className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-natural-heading flex items-center gap-1.5">
              مستشاري المسائي الذكي
              <span className="text-[10px] py-0.5 px-2 bg-natural-green text-natural-primary rounded-full font-bold">Gemini AI</span>
            </h2>
            <p className="text-[11px] text-natural-muted font-bold mt-0.5 font-sans">اسأل عن وجبات العشاء، تقنيات تدليك البشرة وطرق تفجير اللياقة البدنية</p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs text-natural-primary hover:text-natural-heading font-bold flex items-center gap-1 cursor-pointer transition-colors"
            id="btn-clear-chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            مسح المحادثة
          </button>
        )}
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto pr-1 pl-1 space-y-4 mb-4 scrollbar-thin scrollbar-thumb-natural-border">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-natural-light/30 rounded-2xl border border-natural-border/50 my-auto">
            <MessageSquare className="w-10 h-10 text-natural-muted/60 mb-3" />
            <span className="text-sm font-bold text-natural-heading">أهلاً بك! أنا مستشارك الذكي للمساء والمهام اليومية</span>
            <p className="text-xs text-natural-muted max-w-sm mt-1.5 leading-relaxed font-semibold">
              يسعدني جداً توجيهك في روتين العودة للمنزل الساعة 20:30. اسألني عن أي تقنية تجميلية، مساج للوجه، أو تمارين شد وتعديل قوام للجسم!
            </p>

            <div className="mt-6 w-full max-w-md">
              <div className="flex items-center gap-1 text-[11px] font-bold text-natural-muted mb-2.5 justify-center">
                <Compass className="w-4 h-4 text-natural-primary" />
                استعن بإحدى الأسئلة السريعة المقترحة:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="text-right p-3 bg-white hover:bg-natural-light/50 border border-natural-border rounded-xl text-xs font-semibold text-natural-text transition-all cursor-pointer shadow-2xs hover:border-natural-primary"
                    id={`btn-preset-prompt-${idx}`}
                  >
                    🚀 {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isUser ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${
                    isUser 
                      ? 'bg-natural-primary text-white' 
                      : 'bg-white text-natural-primary border border-natural-border'
                  }`}>
                    {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>

                  <div className={`p-4 rounded-2xl text-xs leading-relaxed font-semibold ${
                    isUser 
                      ? 'bg-natural-primary text-white rounded-tr-xs' 
                      : 'bg-white text-natural-text border border-natural-border rounded-tl-xs shadow-2xs'
                  }`}>
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className={`text-[9px] text-left mt-2 ${isUser ? 'text-white/80' : 'text-natural-muted font-mono'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 max-w-[85%] ml-auto">
                <div className="p-2.5 rounded-xl shrink-0 h-10 w-10 bg-white text-natural-primary border border-natural-border flex items-center justify-center">
                  <Bot className="w-5 h-5 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl text-xs bg-white text-natural-muted border border-natural-border rounded-tl-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-natural-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-natural-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-natural-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span>المساعد يفكر ويصوغ الإجابة بعناية...</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex items-center gap-2.5 max-w-[90%] mx-auto">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <p className="font-bold">فشل المساعد</p>
                  <p className="text-[11px] opacity-90 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Input Message Area */}
      <div className="border-t border-natural-border pt-4 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="اكتب استشارتك للمساعد هنا (مثال: طريقة شد خطوط الجبهة، أو عشاء كارديو)..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage(input)}
            className="flex-1 bg-white border border-natural-border focus:border-natural-primary focus:ring-1 focus:ring-natural-primary rounded-xl py-3 px-4 text-xs font-semibold text-natural-text outline-hidden"
            disabled={loading}
            id="input-ai-prompt"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={loading || !input.trim()}
            className="p-3 bg-natural-primary hover:bg-natural-primary-hover disabled:bg-natural-muted/20 text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center shrink-0"
            id="btn-ai-send"
          >
            <Send className="w-5 h-5 rtl:transform rtl:rotate-180" />
          </button>
        </div>
        <p className="text-[10px] text-natural-muted mt-2 text-center font-semibold">المستشار الذكي مسخر لمساندتك بكل ود، لكن يرجى استفسار ذوي الاختياج الطبي للتشخيصات المرضية الخاصة.</p>
      </div>

    </div>
  );
}
