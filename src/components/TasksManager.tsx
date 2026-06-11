import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { Plus, Trash2, CheckSquare, Square, Search, Filter, Sparkles, Dumbbell, Home, LayoutList, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_TASKS: Task[] = [
  {
    id: 'tk1',
    title: 'تنظيف الوجه بغسول لطيف مناسب لنوع بشرتي',
    completed: false,
    category: 'skin_massage',
    notes: 'خطوة أساسية قبل البدء بالمساج لتجنب دفع البكتيريا لداخل المسام.',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'tk2',
    title: 'تطبيق زيت الارجان أو اللوز للترطيب والمساج',
    completed: false,
    category: 'skin_massage',
    notes: 'يساعد الزيت في انزلاق اليدين وتغذية خلايا الوجه.',
    createdAt: Date.now() - 3500000
  },
  {
    id: 'tk3',
    title: 'القيام بتمارين فك وتدليك عضلات الفكين والرقبة',
    completed: false,
    category: 'skin_massage',
    notes: 'مهم للتخلص من ضغط الاسنان ومظهر الفك المحدد.',
    createdAt: Date.now() - 3400000
  },
  {
    id: 'tk4',
    title: 'تمرين بلانك لمدة دقيقة (ثبات كامل للجسم)',
    completed: false,
    category: 'sport',
    notes: 'لتقوية الظهر والجذع وتحسين القوام.',
    createdAt: Date.now() - 3300000
  },
  {
    id: 'tk5',
    title: 'شرب كوب من الماء الدافئ قبل الخلود للنوم',
    completed: false,
    category: 'home',
    notes: 'يساعد في بقاء الترطيب الداخلي ومساعدة الدورة الدموية.',
    createdAt: Date.now() - 3200000
  }
];

export default function TasksManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('daily_app_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'general' | 'skin_massage' | 'sport' | 'home'>('general');
  const [newNotes, setNewNotes] = useState('');
  const [newTime, setNewTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'general' | 'skin_massage' | 'sport' | 'home'>('all');

  useEffect(() => {
    localStorage.setItem('daily_app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      notes: newNotes.trim() || undefined,
      time: newTime || undefined,
      completed: false,
      createdAt: Date.now()
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setNewNotes('');
    setNewTime('');
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || t.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressRatio = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'skin_massage':
        return { bg: 'bg-gradient-to-r from-pink-50 to-rose-50', text: 'text-pink-600', border: 'border-pink-200', tag: 'رقة العناية بشرتكِ 🌸', icon: <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" /> };
      case 'sport':
        return { bg: 'bg-pink-100/70', text: 'text-rose-600', border: 'border-pink-200', tag: 'رشاقة وقوام الياسمين 🧘‍♀️', icon: <Dumbbell className="w-4 h-4 text-rose-500" /> };
      case 'home':
        return { bg: 'bg-gradient-to-r from-pink-50 to-white', text: 'text-[#8E4B62]', border: 'border-pink-200', tag: 'عش الزوجية والبيت السعيد 🏡', icon: <Home className="w-4 h-4 text-[#8E4B62]" /> };
      default:
        return { bg: 'bg-white', text: 'text-natural-muted', border: 'border-pink-100', tag: 'عام', icon: <LayoutList className="w-4 h-4 text-natural-muted" /> };
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 border-2 border-natural-border shadow-premium relative overflow-hidden" id="tasks-card">
      {/* Decorative accent flowers or glows */}
      <div className="absolute top-0 left-0 w-28 h-28 bg-pink-400/5 rounded-full blur-[40px] pointer-events-none"></div>

      <div className="border-b border-natural-border pb-5 mb-6 relative z-10">
        <h2 className="text-2xl font-black text-natural-heading flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-tr from-natural-primary to-rose-400 text-white rounded-xl shadow-glow-pink">
            <Calendar className="w-5 h-5 animate-pulse" />
          </span>
          قائمة المهام اليومية لجمالكِ ورشاقتكِ 🌸✨
        </h2>
        <p className="text-sm text-natural-muted mt-2 font-semibold">
          خططي وقولي مرحى لكل ركن من أركان بيتكِ وعنايتك المتقنة بالبشرة والرياضة.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7 relative z-10">
        <div className="bg-gradient-to-br from-white to-[#FFF6F7] border-2 border-pink-100 p-5 rounded-[22px] shadow-2xs hover:scale-[1.02] transition-transform">
          <span className="text-[11px] text-natural-muted font-extrabold block uppercase tracking-wider">🌸 إجمالي المهام المسجلة</span>
          <div className="text-3.5xl font-black text-natural-heading mt-2 font-mono">{tasks.length}</div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#E3FBF1] border-2 border-[#B9F3DC] p-5 rounded-[22px] shadow-2xs hover:scale-[1.02] transition-transform">
          <span className="text-[11px] text-[#1E7D5C] font-extrabold block uppercase tracking-wider">🌟 مهام أتممتِها بنجاح</span>
          <div className="text-3.5xl font-black text-[#156B4E] mt-2 font-mono">{completedCount}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 p-5 rounded-[22px] shadow-2xs relative overflow-hidden hover:scale-[1.02] transition-transform">
          <span className="text-[11px] text-natural-primary font-extrabold block uppercase tracking-wider">💖 نسبة تألق الروتين</span>
          <div className="text-3.5xl font-black text-natural-primary mt-2 font-mono">{Math.round(progressRatio)}%</div>
          <div className="w-full bg-pink-150 h-2 rounded-full mt-3 overflow-hidden border border-pink-200/50">
            <div className="bg-gradient-to-r from-pink-400 to-natural-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progressRatio}%` }}></div>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-gradient-to-b from-[#FFF5F6] to-white border-2 border-pink-100 p-6 rounded-[24px] mb-8 relative z-10 shadow-xs">
        <div className="text-sm font-black text-natural-heading mb-4 flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-natural-primary animate-spin-slow" />
          أضيفي مهمة أو عادة تفاعلية جديدة:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[11px] font-extrabold text-natural-muted block mb-1.5">اسم المهمة الرائعة *</label>
            <input 
              type="text" 
              placeholder="مثال: وضع قناع الطين، أو تمرين الظهر..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-white border-2 border-pink-100 focus:border-natural-primary rounded-xl py-3 px-4 text-xs outline-hidden font-semibold text-natural-text placeholder-pink-300 transition-colors"
              required
              id="input-task-title"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-natural-muted block mb-1.5">حقل التصنيف والهدف 🌸</label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as any)}
              className="w-full bg-white border-2 border-pink-100 focus:border-natural-primary rounded-xl py-3 px-4 text-xs outline-hidden font-extrabold text-natural-text transition-colors cursor-pointer"
              id="select-task-category"
            >
              <option value="general">عام 📋</option>
              <option value="skin_massage">تدليك وعناية البشرة 🧖‍♀️✨</option>
              <option value="sport">تمارين رياضة الجسم 🤸‍♀️🧘‍♀️</option>
              <option value="home">العادات والمنزل 🏡💖</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="text-[11px] font-extrabold text-natural-muted block mb-1.5">لمسات وملاحظات إضافية</label>
            <input 
              type="text" 
              placeholder="نصائح، وقت التطبيق، أو نوع المستحضر المستخدم..."
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              className="w-full bg-white border-2 border-pink-100 focus:border-natural-primary rounded-xl py-3 px-4 text-xs outline-hidden font-semibold text-natural-text placeholder-pink-300 transition-colors"
              id="input-task-notes"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-natural-muted block mb-1.5">الساعة المحددة (اختياري)</label>
            <input 
              type="time" 
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              className="w-full bg-white border-2 border-pink-100 focus:border-natural-primary rounded-xl py-2.5 px-4 text-xs outline-hidden font-mono font-bold text-natural-text transition-colors"
              id="input-task-time"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button 
            type="submit" 
            className="bg-gradient-to-r from-natural-primary to-rose-500 hover:from-natural-primary-hover hover:to-rose-600 text-white font-black text-xs px-7 py-3 rounded-xl flex items-center gap-1.5 shadow-premium transition-all cursor-pointer hover:scale-[1.02]"
            id="btn-add-task-submit"
          >
            <Plus className="w-4 h-4 shrink-0" />
            تثبيت المهمة بالجدول 💖
          </button>
        </div>
      </form>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-5 relative z-10">
        {/* Search tool */}
        <div className="relative flex-1">
          <Search className="w-4.5 h-4.5 text-pink-400 absolute right-3.5 top-3.5" />
          <input 
            type="text" 
            placeholder="ابحثي عن رعاية مكتوبة أو مهمة لتأكيدها..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-pink-100 focus:border-natural-primary rounded-xl pr-10 pl-4 py-3 text-xs outline-hidden font-semibold text-natural-text placeholder-pink-300 transition-colors"
            id="input-task-search"
          />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1.5" id="task-filters">
          {(['all', 'general', 'skin_massage', 'sport', 'home'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-black cursor-pointer transition-all border ${
                activeFilter === f 
                  ? 'bg-gradient-to-r from-natural-primary to-rose-500 text-white border-transparent shadow-glow-pink scale-105' 
                  : 'bg-white text-[#7C4D5C] border-pink-100 hover:bg-pink-50/50 hover:border-pink-200'
              }`}
              id={`filter-btn-${f}`}
            >
              {f === 'all' && 'الكل ✨'}
              {f === 'general' && 'عام 📋'}
              {f === 'skin_massage' && 'العناية بالبشرة 🧖‍♀️'}
              {f === 'sport' && 'تمارين الجسم 🤸‍♀️'}
              {f === 'home' && 'عادات المنزل 🏡'}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3.5 overflow-hidden relative z-10">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 border-3 border-dashed border-pink-150 rounded-[24px] bg-[#FFF8F9] shadow-inner">
            <LayoutList className="w-10 h-10 text-pink-300 mx-auto mb-3 animate-float-flower" />
            <p className="text-sm text-[#9E6E7D] font-extrabold mb-1">جدول دلالكِ خالٍ من المهام المماثلة حالياً 🌸</p>
            <p className="text-xs text-natural-muted font-medium">أضيفي مهام جديدة بالأعلى لتنظيم روتين الأنوثة المسائي!</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map(t => {
              const theme = getCategoryTheme(t.category);
              return (
                <motion.div
                  layout
                  key={t.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-2 rounded-[24px] transition-all duration-300 ${
                    t.completed 
                      ? 'bg-gradient-to-r from-pink-50/30 to-white border-pink-100/70 text-natural-muted opacity-70' 
                      : 'bg-white border-pink-100 hover:border-natural-primary hover:shadow-premium hover:scale-[1.005]'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <button 
                      onClick={() => handleToggleTask(t.id)}
                      className="mt-1 flex-shrink-0 cursor-pointer text-pink-300 hover:text-natural-primary transition-transform active:scale-95"
                      id={`btn-toggle-task-${t.id}`}
                    >
                      {t.completed ? (
                        <div className="w-6 h-6 bg-gradient-to-tr from-natural-primary to-rose-400 rounded-full flex items-center justify-center text-white shadow-2xs">
                          <CheckSquare className="w-4.5 h-4.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-pink-300 hover:border-natural-primary rounded-full bg-white transition-colors" />
                      )}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-black tracking-tight ${t.completed ? 'line-through text-pink-350/70' : 'text-natural-heading'}`}>
                          {t.title}
                        </span>
                        {t.time && (
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-rose-50 text-natural-primary rounded-md border border-pink-150">
                            ⏰ {t.time}
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 text-[10px] px-3 py-1 rounded-full font-black border ${theme.bg} ${theme.text} ${theme.border} shadow-2xs`}>
                          {theme.icon}
                          {theme.tag}
                        </span>
                      </div>
                      {t.notes && (
                        <p className={`text-xs mt-2 leading-relaxed font-semibold pr-1 border-r-2 border-pink-200/50 ${t.completed ? 'text-pink-300/60' : 'text-natural-muted'}`}>
                          🌸 {t.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-0 pt-3 sm:pt-0 border-pink-100">
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-2 text-pink-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="حذف المهمة"
                      id={`btn-delete-task-${t.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div></div>
  );
}
