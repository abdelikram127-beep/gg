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
  BookOpen, 
  UtensilsCrossed 
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
        setGreeting('مساء الاسترخاء والعناية الذاتية والرياضة!');
      }
    };
    
    updateGreeting();
  }, []);

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text flex flex-col font-sans selection:bg-natural-primary selection:text-white" dir="rtl">
      
      {/* Top Welcome Notification / Navigation Rail header */}
      <div className="bg-natural-primary text-white shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-natural-green animate-pulse"></span>
            <span className="font-semibold text-natural-light">
              {greeting}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs text-[11px] font-medium text-amber-50">
            <User className="w-3.5 h-3.5" />
            <span>بروتوكول المستخدم: {userEmail}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner area */}
      <header className="bg-white border-b border-natural-border py-8 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h1 className="text-2xl md:text-3.5xl font-black text-natural-heading tracking-tight flex items-center justify-center md:justify-start gap-2.5">
              <span className="p-2.5 bg-natural-green text-natural-primary rounded-2xl inline-flex shadow-2xs border border-natural-border/30">
                <CalendarCheck2 className="w-8 h-8" />
              </span>
              مساعد المهام اليومية والروتين المسائي
            </h1>
            <p className="text-sm text-natural-muted mt-2 font-medium max-w-2xl leading-relaxed">
              شريكك التفاعلي لتنسيق مهام العودة للمنزل (دخول 20:30)، العناية الفائقة بالبشرة والوجه (Skin Massage)، وزيادة الصلابة الجسدية (Sport Body) مدعوماً بمستشارك الذكي.
            </p>
          </div>

          {/* Quick routine cards summary mock */}
          <div className="flex gap-3 shrink-0">
            <div className="bg-white rounded-2xl px-5 py-4 text-center shadow-xs border border-natural-border min-w-[120px]">
              <Sparkles className="w-5 h-5 text-natural-primary mx-auto mb-1.5" />
              <span className="text-[10px] uppercase tracking-widest text-natural-muted font-bold block">تدليك البشرة</span>
              <span className="text-lg font-mono font-semibold text-natural-primary block mt-0.5">3 مقاطع</span>
            </div>
            <div className="bg-natural-primary rounded-2xl px-5 py-4 text-center shadow-md min-w-[120px] text-white">
              <Dumbbell className="w-5 h-5 text-natural-green mx-auto mb-1.5 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold block">ساعة الوصول</span>
              <span className="text-lg font-mono font-bold text-white block mt-0.5">20:30</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <nav className="max-w-7xl mx-auto px-4 w-full mt-6 shrink-0">
        <div className="bg-white p-1.5 rounded-2xl border border-natural-border flex flex-wrap gap-1 shadow-2xs">
          
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'timeline'
                ? 'bg-natural-primary text-white shadow-xs'
                : 'text-natural-text hover:text-natural-primary hover:bg-natural-light/50'
            }`}
            id="tab-timeline"
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>جدول الوصول (20:30)</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'tasks'
                ? 'bg-natural-primary text-white shadow-xs'
                : 'text-natural-text hover:text-natural-primary hover:bg-natural-light/50'
            }`}
            id="tab-tasks"
          >
            <CalendarCheck2 className="w-4 h-4 shrink-0" />
            <span>قائمة المهام اليومية</span>
          </button>

          <button
            onClick={() => setActiveTab('skin_massage')}
            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'skin_massage'
                ? 'bg-natural-primary text-white shadow-xs'
                : 'text-natural-text hover:text-natural-primary hover:bg-natural-light/50'
            }`}
            id="tab-skin-massage"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>تدليك وعناية البشرة</span>
          </button>

          <button
            onClick={() => setActiveTab('sport')}
            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'sport'
                ? 'bg-natural-primary text-white shadow-xs'
                : 'text-natural-text hover:text-natural-primary hover:bg-natural-light/50'
            }`}
            id="tab-sport"
          >
            <Dumbbell className="w-4 h-4 shrink-0" />
            <span>تمارين رياضة الجسم</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_coach')}
            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'ai_coach'
                ? 'bg-gradient-to-r from-natural-primary to-natural-primary-hover text-white shadow-md'
                : 'text-natural-text hover:text-natural-primary hover:bg-natural-light/50'
            }`}
            id="tab-ai-coach"
          >
            <Bot className="w-4 h-4 shrink-0 animate-pulse" />
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
      <footer className="bg-white border-t border-natural-border py-10 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div className="p-5 bg-natural-bg rounded-2xl border border-natural-border/60">
            <h5 className="text-natural-heading text-sm font-bold mb-3 flex items-center justify-center md:justify-start gap-1.5">
              <Moon className="w-4.5 h-4.5 text-natural-primary" />
              روتين العشاء الوقائي
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              المساء هو اللبنة الأساسية لترميم البشرة وعضلاتك. احرص على تناول عشاء هادئ وخالي من الأطعمة المُصنعة أو السكريات المرتفعة بعد وصولك في 20:30.
            </p>
          </div>
          <div className="p-5 bg-natural-bg rounded-2xl border border-natural-border/60">
            <h5 className="text-natural-heading text-sm font-bold mb-3 flex items-center justify-center md:justify-start gap-1.5">
              <Heart className="w-4.5 h-4.5 text-natural-primary" />
              أسرار تدليك البشرة
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              يساعد روتين السكين مساج (Skin Massage) في تقليل تشنج الجفنين والرقبة بنسبة 40%، ويفضل دائماً تطبيق حركات دائرية ناعمة من منتصف وجهك للخارج.
            </p>
          </div>
          <div className="p-5 bg-natural-bg rounded-2xl border border-natural-border/60">
            <h5 className="text-natural-heading text-sm font-bold mb-3 flex items-center justify-center md:justify-start gap-1.5">
              <BookOpen className="w-4.5 h-4.5 text-natural-primary" />
              عادات ليلية صحيحة
            </h5>
            <p className="text-xs leading-relaxed text-natural-text font-semibold">
              استمتع بروتين تدريجي يجمع بين مؤقت الرياضة وجلسات العناية المنظمة وبناء عادات هادئة تضمن لك عقل نشط وجسد معافى ومشرق.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-natural-border text-center text-[11px] text-natural-muted font-medium">
          مساعد المهام اليومية والعناية بالمنزل © 2026. تم البناء بشغف وهندسة واجهات مثالية لتوجيهك كل مساء.
        </div>
      </footer>

    </div>
  );
}
