import { useState, useEffect } from 'react';
import HomeTimeline from './components/HomeTimeline';
import TasksManager from './components/TasksManager';
import SkinMassageSection from './components/SkinMassageSection';
import SportBodySection from './components/SportBodySection';
import AICoach from './components/AICoach';
import { 
  Sparkles, 
  Dumbbell, 
  Clock, 
  CalendarCheck2, 
  Bot, 
  Heart, 
  Moon, 
  User, 
  BookOpen 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'tasks' | 'skin_massage' | 'sport' | 'ai_coach'>('timeline');
  const [greeting, setGreeting] = useState('');

  // Quick user context injection if available from environment
  const userEmail = "abdelikram127@gmail.com"; 

  useEffect(() => {
    // Generate lovely Arabic greetings based on user arrival context and time
    const updateGreeting = () => {
      const now = new Date();
      const hr = now.getHours();
      
      if (hr >= 5 && hr < 12) {
        setGreeting('صباح النشاط والتفاؤل!');
      } else if (hr >= 12 && hr < 17) {
        setGreeting('مساء الخير والسرور!');
      } else if (hr >= 17 && hr < 21) {
        setGreeting('مساء الاستعداد والراحة! (بانتظار وصولك للمنزل مع 20:30)');
      } else {
        setGreeting('مساء الاسترخاء ونوم الهناء السعيد!');
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text flex flex-col font-sans selection:bg-natural-primary selection:text-white relative overflow-hidden" dir="rtl">
      
      {/* Decorative floral & bubbly soft glowing backdrops for a vibrant feminine boutique feel */}
      <div className="absolute top-[-50px] left-[-50px] w-80 h-80 bg-rose-400/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-[-100px] w-[500px] h-[500px] bg-pink-300/15 rounded-full blur-[150px] pointer-events-none animate-pulse [animation-duration:8s]"></div>
      <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-rose-300/15 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-duration:6s]"></div>

      {/* Top Welcome Notification / Navigation Rail header */}
      <div className="bg-gradient-to-r from-natural-primary via-rose-500 to-rose-600 text-white shrink-0 shadow-premium relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white absolute"></span>
            <span className="font-extrabold text-white tracking-wide ml-1 drop-shadow-md">
              {greeting} ✨🌸
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md text-[11px] font-bold text-white shadow-inner">
            <User className="w-3.5 h-3.5 text-pink-100 animate-float-flower" />
            <span>المساحة الخاصة بكِ: {userEmail} 💖</span>
          </div>
        </div>
      </div>

      {/* Hero Banner area */}
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-pink-150 py-9 shadow-premium relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-right">
            <h1 className="text-2xl md:text-3.5xl font-black text-natural-heading tracking-tight flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="p-3 bg-gradient-to-tr from-natural-primary to-rose-400 text-white rounded-[24px] inline-flex shadow-glow-pink animate-float-flower">
                <Sparkles className="w-8 h-8" />
              </span>
              <span>رونق العناية والروتين المسائي المتكامل 🌸✨</span>
            </h1>
            <p className="text-sm text-natural-muted mt-3 font-semibold max-w-2xl leading-relaxed">
              بوابتكِ التفاعلية المفعمة بالنشاط والحيوية لتنسيق روتين العناية والرياضة وتصريف توتر اليوم. مصمم خصيصاً لوصول غني بالراحة (20:30)، يوغا الوجه لاستعادة بريق خلايا بشرة الوجه (Skin Massage)، وتمارين الرشاقة وقوام الظهر (Sport Body).
            </p>
          </div>

          {/* Quick routine cards summary mock */}
          <div className="flex gap-4.5 shrink-0">
            <div className="bg-white rounded-3xl px-6 py-5.5 text-center shadow-premium border-2 border-pink-100 min-w-[130px] transition-transform hover:scale-105">
              <Sparkles className="w-6 h-6 text-natural-primary mx-auto mb-2 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-natural-muted font-black block">تدليك البشرة</span>
              <span className="text-xl font-black font-mono text-natural-primary block mt-1">3 طقوس فائقة</span>
            </div>
            <div className="bg-gradient-to-b from-natural-primary to-rose-500 rounded-3xl px-6 py-5.5 text-center shadow-premium min-w-[130px] text-white transition-transform hover:scale-105 border border-pink-300">
              <Dumbbell className="w-6 h-6 text-white mx-auto mb-2 animate-bounce-slow" />
              <span className="text-[10px] uppercase tracking-widest text-pink-100 font-black block">ساعة الوصول</span>
              <span className="text-xl font-mono font-black text-white block mt-1">20:30 مساءً</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <nav className="max-w-7xl mx-auto px-4 w-full mt-7 shrink-0 relative z-10">
        <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-[32px] border-2 border-pink-100 flex flex-wrap gap-2 shadow-premium animate-fade-in">
          
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 min-w-[120px] py-4 px-4 rounded-[20px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-natural-primary to-rose-400 text-white shadow-glow-pink border-b-2 border-rose-600'
                : 'text-natural-muted hover:text-natural-primary hover:bg-pink-50/50'
            }`}
            id="tab-timeline"
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>جدول الوصول (20:30)</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 min-w-[120px] py-4 px-4 rounded-[20px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-natural-primary to-rose-400 text-white shadow-glow-pink border-b-2 border-rose-600'
                : 'text-natural-muted hover:text-natural-primary hover:bg-pink-50/50'
            }`}
            id="tab-tasks"
          >
            <CalendarCheck2 className="w-4 h-4 shrink-0" />
            <span>قائمة المهام اليومية</span>
          </button>

          <button
            onClick={() => setActiveTab('skin_massage')}
            className={`flex-1 min-w-[120px] py-4 px-4 rounded-[20px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'skin_massage'
                ? 'bg-gradient-to-r from-natural-primary to-rose-400 text-white shadow-glow-pink border-b-2 border-rose-600'
                : 'text-natural-muted hover:text-natural-primary hover:bg-pink-50/50'
            }`}
            id="tab-skin-massage"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>تدليك وعناية البشرة</span>
          </button>

          <button
            onClick={() => setActiveTab('sport')}
            className={`flex-1 min-w-[120px] py-4 px-4 rounded-[20px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'sport'
                ? 'bg-gradient-to-r from-natural-primary to-rose-400 text-white shadow-glow-pink border-b-2 border-rose-600'
                : 'text-natural-muted hover:text-natural-primary hover:bg-pink-50/50'
            }`}
            id="tab-sport"
          >
            <Dumbbell className="w-4 h-4 shrink-0" />
            <span>تمارين رياضة الجسم</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_coach')}
            className={`flex-1 min-w-[120px] py-4 px-4 rounded-[20px] text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'ai_coach'
                ? 'bg-gradient-to-r from-[#D72352] to-[#F14674] text-white shadow-glow-pink border-b-2 border-rose-700'
                : 'text-natural-muted hover:text-natural-primary hover:bg-pink-50/50'
            }`}
            id="tab-ai-coach"
          >
            <Bot className="w-4.5 h-4.5 shrink-0 animate-pulse text-white" />
            <span>المستشار المسائي الذكي</span>
          </button>

        </div>
      </nav>

      {/* Content wrapper with container constraints */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {activeTab === 'timeline' && <HomeTimeline />}
        {activeTab === 'tasks' && <TasksManager />}
        {activeTab === 'skin_massage' && <SkinMassageSection />}
        {activeTab === 'sport' && <SportBodySection />}
        {activeTab === 'ai_coach' && <AICoach />}
      </main>

      {/* Arabic Advice Banner Footer */}
      <footer className="bg-white border-t-2 border-pink-100 py-10 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div className="p-6 bg-gradient-to-br from-[#FFF8F9] to-white rounded-3xl border-2 border-pink-100/70 shadow-2xs">
            <h5 className="text-natural-heading text-sm font-black mb-3 flex items-center justify-center md:justify-start gap-2 text-natural-primary">
              <Moon className="w-4.5 h-4.5 text-natural-primary animate-pulse" />
              روتين العشاء الوقائي 🍽️
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              المساء هو اللبنة الأساسية لترميم البشرة وعضلاتكِ. احرصي على تناول عشاء هادئ وخفيف خالي من الأطعمة المُصنعة أو السكريات المرتفعة بعد وصولكِ الهادئ في 20:30.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#FFF8F9] to-white rounded-3xl border-2 border-pink-100/70 shadow-2xs">
            <h5 className="text-natural-heading text-sm font-black mb-3 flex items-center justify-center md:justify-start gap-2 text-natural-primary">
              <Heart className="w-4.5 h-4.5 text-natural-primary animate-float-flower" />
              أسرار تدليك البشرة 💆‍♀️
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              يساعد روتين السكين مساج (Skin Massage) في تقليل تشنج الجفنين وشد الرقبة بنسبة 40%، ويفضل دائماً تطبيق حركات دائرية ناعمة من منتصف وجهكِ الجميل للخارج.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#FFF8F9] to-white rounded-3xl border-2 border-pink-100/70 shadow-2xs">
            <h5 className="text-natural-heading text-sm font-black mb-3 flex items-center justify-center md:justify-start gap-2 text-natural-primary">
              <BookOpen className="w-4.5 h-4.5 text-natural-primary" />
              عادات ليلية صحيحة 📖🌸
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              استمتعي بروتين تدريجي يجمع بين مؤقت الرياضة وجلسات العناية المنظمة وبناء عادات هادئة تضمن لكِ عقلاً نشطاً وجسداً معافى ومشرقاً دوماً.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-pink-100 text-center text-xs text-natural-muted font-bold">
          مساعد المهام اليومية وروتين الأنوثة الفاتن للبيت © 2026. تم البناء بشغف وهندسة واجهات مثالية لتوجيهكِ كل مساء.
        </div>
      </footer>

    </div>
  );
}
