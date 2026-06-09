import { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { Play, CheckCircle2, Clock, Moon, Sparkles, Dumbbell, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

// Default initial schedule for 20:30 arrival
const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    time: '20:30',
    title: 'الوصول إلى المنزل والاسترخاء',
    desc: 'الوصول للمنزل، تبديل الملابس وغسل اليدين والوجه بالماء لتهدئة البشرة، والاسترخاء من عناء اليوم.',
    completed: false,
    category: 'home'
  },
  {
    id: 't2',
    time: '20:45',
    title: 'تجهيز وتناول عشاء خفيف مريح',
    desc: 'تناول عشاء صحي غني بالبروتين والدهون الصحية ومضادات الأكسدة المغذية للبشرة وعضلاتك.',
    completed: false,
    category: 'home'
  },
  {
    id: 't3',
    time: '21:15',
    title: 'تنفيذ روتين رياضة الجسم (Sport Body)',
    desc: 'بدء تمارين الاستطالة، شد الجسم وتنشيط الدورة الدموية من قائمة التمارين المقترحة.',
    completed: false,
    category: 'sport'
  },
  {
    id: 't4',
    time: '21:50',
    title: 'الاستحمام المنعش بماء دافئ',
    desc: 'أخذ حمام دافئ لتخفيف التوتر العضلي وفتح مسام البشرة استعداداً للمساج والمستحضرات المغذية.',
    completed: false,
    category: 'home'
  },
  {
    id: 't5',
    time: '22:10',
    title: 'روتين مساج البشرة والوجه (Skin Massage)',
    desc: 'استخدام الزيوت الطبيعية المناسبة والقيام بحركات مساج الوجه، الرقبة والفك لمحاربة التجاعيد والتوتر العضلي.',
    completed: false,
    category: 'skin_massage'
  },
  {
    id: 't6',
    time: '22:45',
    title: 'فصل الأجهزة الرقمية والتحضير للغفو',
    desc: 'أخذ بضع دقائق للتأمل أو القراءة الخفيفة لتهدئة العقل والحصول على نوم عميق لعملية تجديد خلايا البشرة الطبيعية.',
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
        return <Dumbbell className="w-5 h-5 text-indigo-500" />;
      case 'skin_massage':
        return <Sparkles className="w-5 h-5 text-pink-500" />;
      default:
        return <Moon className="w-5 h-5 text-amber-500" />;
    }
  };

  const getCategoryBg = (cat: string, active: boolean) => {
    if (!active) return 'bg-[#F2EDE4] border-[#E8E2D9] text-[#8C847E]';
    switch (cat) {
      case 'sport':
        return 'bg-natural-primary/10 border-natural-primary/20 text-natural-primary';
      case 'skin_massage':
        return 'bg-natural-green/80 border-natural-border text-natural-primary';
      default:
        return 'bg-natural-light border-natural-border text-natural-text';
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-natural-border shadow-xs" id="timeline-card">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-natural-border pb-6">
        <div>
          <h2 className="text-2xl font-bold text-natural-heading flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-natural-primary" />
            روتين جدول العودة للمنزل (بدءاً من 20:30)
          </h2>
          <p className="text-sm text-natural-muted mt-1.5 font-medium">
            مخطط زمني للمهام المرتبة لضمان عشاء مغذي، تمارين مفيدة ومساج حكيم للبشرة.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-natural-light rounded-2xl px-6 py-4 text-center shadow-xs border border-natural-border w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-natural-primary font-bold">
            <span className="w-2.5 h-2.5 bg-natural-primary rounded-full animate-ping"></span>
            الوقت الحالي: {currentTimeStr || '--:--'}
          </div>
          <div className="text-xs text-natural-muted font-bold mt-1.5">{timeUntilArrival}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-4.5 bg-natural-bg border border-natural-border rounded-2xl">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className="text-natural-text">إنجاز الروتين المسائي</span>
          <span className="text-natural-primary">{progressPercent}% ({completedCount} من {events.length})</span>
        </div>
        <div className="w-full bg-natural-light rounded-full h-2.5 border border-natural-border/40">
          <div 
            className="bg-natural-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-r-2 border-natural-border mr-4 md:mr-6 pl-2 space-y-6">
        {events.map((ev, index) => (
          <motion.div 
            key={ev.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6 pr-6 ${
              ev.completed ? 'opacity-70' : ''
            }`}
          >
            {/* Timeline dot */}
            <div className={`absolute right-[-9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 flex items-center justify-center transition-colors ${
              ev.completed 
                ? 'bg-natural-primary border-natural-light' 
                : 'bg-white border-natural-primary'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${ev.completed ? 'bg-white' : 'bg-natural-primary'}`}></span>
            </div>

            {/* Time label */}
            <div className="min-w-[70px] text-right">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1.5 bg-natural-light text-natural-text rounded-lg border border-natural-border">
                <Clock className="w-3.5 h-3.5 text-natural-primary" />
                {ev.time}
              </span>
            </div>

            {/* Content box */}
            <div className={`flex-1 p-5 rounded-2xl border transition-all duration-200 ${
              ev.completed 
                ? 'bg-natural-bg/50 border-natural-border text-natural-muted' 
                : 'bg-white border-natural-border shadow-xs hover:border-natural-primary'
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
