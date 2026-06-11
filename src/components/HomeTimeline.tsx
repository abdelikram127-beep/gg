import { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { Play, CheckCircle2, Clock, Moon, Sparkles, Dumbbell, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

// Default initial schedule for 20:30 arrival
const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    time: '20:30',
    title: 'الوصول إلى المنزل واستعادة الراحة 🏡✨',
    desc: 'خلع ضغوط العمل، تبديل الملابس بغسيل وجهكِ بالماء ومستحضرات الترطيب الخفيفة لتبديد توتر اليوم.',
    completed: false,
    category: 'home'
  },
  {
    id: 't2',
    time: '20:45',
    title: 'تحضير عشاء خفيف مفعم بالجمال والصحة 🥗🍓',
    desc: 'تناول وجبة متوازنة غنية بالفيتامينات، مضادات الأكسدة والبروتين المغذي لترميم مرونة الجلد وألياف الجسم.',
    completed: false,
    category: 'home'
  },
  {
    id: 't3',
    time: '21:15',
    title: 'حصة اللياقة وتعديل قوام الأنوثة (Sport Body) 🧘‍♀️💪',
    desc: 'ممارسة تمارين استطالة وفقرات الظهر لتصحيح الانحناء وتنشيط الدورة الدموية من قائمتنا التفاعلية.',
    completed: false,
    category: 'sport'
  },
  {
    id: 't4',
    time: '21:50',
    title: 'دُش دافئ للاستحمام والاسترخاء العضلي 🛀🌸',
    desc: 'حمام دافئ يُزيل حمض اللاكتيك ويريح الظهر والكتفين، مع فتح مسام الوجه استعداداً لذروة العناية المسائية.',
    completed: false,
    category: 'home'
  },
  {
    id: 't5',
    time: '22:10',
    title: 'يوغا وتدليك الوجه الساحر (Skin Massage) 💆‍♀️💖',
    desc: 'تطبيق روتين تدليك البشرة بالزيوت المغذية لنحت عظمتي الوجنتين والفك ومحاربة انتفاخ محيط العين تماماً.',
    completed: false,
    category: 'skin_massage'
  },
  {
    id: 't6',
    time: '22:45',
    title: 'هالات الغسق والنوم العميق السري 🌙💤',
    desc: 'فصل الشاشات، وإتاحة الفرصة للميلاتونين لإتمام عملية تجديد خلايا بشرتكِ وبناء جهازك المناعي أثناء الغفو.',
    completed: false,
    category: 'home'
  }
];

export default function HomeTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('daily_timeline_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TIMELINE;
      }
    }
    return INITIAL_TIMELINE;
  });

  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [timeUntilArrival, setTimeUntilArrival] = useState('');

  useEffect(() => {
    localStorage.setItem('daily_timeline_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTimeStr(`${hrs}:${mins}`);

      // Calculate time left or past since arrival at 20:30
      // Target is today at 20:30
      const target = new Date();
      target.setHours(20, 30, 0, 0);

      const diffMs = target.getTime() - now.getTime();
      if (diffMs > 0) {
        const diffMins = Math.floor(diffMs / 60000);
        const h = Math.floor(diffMins / 60);
        const m = diffMins % 60;
        setTimeUntilArrival(`متبقي ${h > 0 ? `${h} ساعة و` : ''}${m} دقيقة على وصولك للمنزل (20:30)`);
      } else {
        const absDiffMins = Math.floor(Math.abs(diffMs) / 60000);
        const h = Math.floor(absDiffMins / 60);
        const m = absDiffMins % 60;
        setTimeUntilArrival(`مضى ${h > 0 ? `${h} ساعة و` : ''}${m} دقيقة منذ وقت وصولك المفترض (20:30)`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleEvent = (id: string) => {
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, completed: !ev.completed } : ev));
  };

  const resetAll = () => {
    if (window.confirm('هل تريد إعادة تعيين جدول اليوم المسائي؟')) {
      setEvents(INITIAL_TIMELINE);
    }
  };

  const completedCount = events.filter(e => e.completed).length;
  const progressPercent = Math.round((completedCount / events.length) * 100);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sport':
        return <Dumbbell className="w-5 h-5 text-rose-500" />;
      case 'skin_massage':
        return <Sparkles className="w-5 h-5 text-pink-500" />;
      default:
        return <Moon className="w-5 h-5 text-amber-500" />;
    }
  };

  const getCategoryBg = (cat: string, active: boolean) => {
    if (!active) return 'bg-[#FFEBF0] border-[#FFC2D1] text-[#9E7480]';
    switch (cat) {
      case 'sport':
        return 'bg-rose-100 border-rose-300 text-rose-600 font-extrabold';
      case 'skin_massage':
        return 'bg-gradient-to-r from-pink-100 to-rose-100 border-pink-300 text-pink-600 font-extrabold';
      default:
        return 'bg-amber-50 border-amber-200 text-amber-700 font-extrabold';
    }
  };


  return (
    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 border-2 border-natural-border shadow-premium relative overflow-hidden" id="timeline-card">
      {/* Absolute cute backgrounds background glows */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-300/10 rounded-full blur-[40px] pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-natural-border/70 pb-6 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-natural-heading flex items-center gap-2.5">
            <span className="p-2 bg-gradient-to-tr from-natural-primary to-rose-400 text-white rounded-xl shadow-glow-pink">
              <Clock className="w-5 h-5 animate-pulse" />
            </span>
            جدول رونق المسائي التفاعلي ⏰✨
          </h2>
          <p className="text-sm text-natural-muted mt-2 font-semibold">
            دليلكِ الزمني المنظم والممتع لتنظيم العودة المنزلية والبدء ببرنامج غني بالصحة والدلال.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-natural-light to-white rounded-[20px] px-6 py-4.5 text-center shadow-xs border border-natural-border w-full md:w-auto relative overflow-hidden">
          <div className="flex items-center gap-2 text-sm text-natural-primary font-black">
            <span className="w-3 h-3 bg-natural-primary rounded-full animate-ping"></span>
            ساعة رونق الآن: {currentTimeStr || '--:--'} 🌙
          </div>
          <div className="text-[11px] text-[#A25F70] font-extrabold mt-2 font-sans tracking-wide bg-white/80 px-2.5 py-1 rounded-full border border-pink-100">{timeUntilArrival}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10 p-5 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-3xl shadow-xs">
        <div className="flex justify-between text-xs sm:text-sm font-extrabold mb-2.5">
          <span className="text-natural-text flex items-center gap-1.5">
            <span>✨ نسبة اكتمال جدول دلالكِ الليلة:</span>
          </span>
          <span className="text-natural-primary font-black bg-white px-3 py-1 rounded-full border border-pink-100 shadow-2xs">
            {progressPercent}% ({completedCount} من {events.length} مهام)
          </span>
        </div>
        <div className="w-full bg-pink-100/60 rounded-full h-3 border border-pink-200/50">
          <div 
            className="bg-gradient-to-r from-pink-400 via-rose-500 to-natural-primary h-all rounded-full h-full transition-all duration-700 shadow-md" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-r-2 border-pink-200 mr-4 md:mr-6 pl-2 space-y-7">
        {events.map((ev, index) => (
          <motion.div 
            key={ev.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6 pr-6 ${
              ev.completed ? 'opacity-65' : ''
            }`}
          >
            {/* Timeline dot with glowing effect */}
            <div className={`absolute right-[-10px] top-1.5 w-5 h-5 rounded-full border-4 flex items-center justify-center transition-all ${
              ev.completed 
                ? 'bg-natural-primary border-pink-100 ring-2 ring-natural-primary/20 scale-110' 
                : 'bg-white border-natural-primary ring-2 ring-pink-200/50 hover:scale-110'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${ev.completed ? 'bg-white' : 'bg-natural-primary'}`}></span>
            </div>

            {/* Time label */}
            <div className="min-w-[80px] text-right">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-black px-3 py-1.5 bg-gradient-to-br from-pink-50 to-white text-natural-text rounded-xl border border-pink-200/80 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-natural-primary shrink-0" />
                {ev.time}
              </span>
            </div>

            {/* Content box with beautiful boutique style */}
            <div className={`flex-1 p-5 rounded-3xl border-2 transition-all duration-300 ${
              ev.completed 
                ? 'bg-rose-50/40 border-pink-150 text-[#8E6974]' 
                : 'bg-white border-pink-100 shadow-premium hover:border-natural-primary hover:shadow-glow-pink hover:scale-[1.01]'
            }`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className={`text-base font-bold flex flex-wrap items-center gap-2 ${ev.completed ? 'line-through text-natural-muted' : 'text-natural-heading'}`}>
                    {ev.title}
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border uppercase tracking-wider font-extrabold ${getCategoryBg(ev.category, !ev.completed)}`}>
                      {ev.category === 'sport' ? 'الرياضة' : ev.category === 'skin_massage' ? 'العناية بالبشرة' : 'عام'}
                    </span>
                  </h3>
                  <p className="text-xs text-natural-text mt-1.5 leading-relaxed font-semibold">{ev.desc}</p>
                </div>
                
                <button
                  onClick={() => toggleEvent(ev.id)}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                    ev.completed 
                      ? 'bg-natural-green text-natural-primary hover:bg-natural-green/80' 
                      : 'bg-natural-light text-natural-muted hover:text-natural-primary hover:bg-natural-border'
                  }`}
                  title={ev.completed ? 'إلغاء الإنجاز' : 'تعليم كمكتمل'}
                  id={`btn-timeline-${ev.id}`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-8 pt-5 border-t border-natural-border">
        <button 
          onClick={resetAll}
          className="flex items-center gap-2 text-xs text-natural-muted hover:text-natural-primary font-bold transition-colors cursor-pointer"
          id="btn-reset-timeline"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة تعيين الجدول بالكامل
        </button>
        <span className="text-xs text-natural-muted font-bold">ابدأ الجدول مباشرة عند العودة مع 20:30</span>
      </div>
    </div>
  );
}
