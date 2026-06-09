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
        return { bg: 'bg-natural-green/80', text: 'text-natural-primary', border: 'border-natural-border/80', tag: 'مساج وبشرة', icon: <Sparkles className="w-4 h-4 text-natural-primary" /> };
      case 'sport':
        return { bg: 'bg-natural-primary/10', text: 'text-natural-primary', border: 'border-natural-primary/20', tag: 'رياضة وجسم', icon: <Dumbbell className="w-4 h-4 text-natural-primary" /> };
      case 'home':
        return { bg: 'bg-natural-light', text: 'text-natural-text', border: 'border-natural-border', tag: 'منزل وعادات', icon: <Home className="w-4 h-4 text-natural-primary" /> };
      default:
        return { bg: 'bg-natural-bg', text: 'text-natural-muted', border: 'border-natural-border/40', tag: 'عام', icon: <LayoutList className="w-4 h-4 text-natural-muted" /> };
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-natural-border shadow-xs" id="tasks-card">
      <div className="border-b border-natural-border pb-5 mb-6">
        <h2 className="text-2xl font-bold text-natural-heading flex items-center gap-2.5">
          <Calendar className="w-6 h-6 text-natural-primary" />
          قائمة المهام اليومية المخصصة
        </h2>
        <p className="text-sm text-natural-muted mt-1.5 font-medium">
          أضف ونظم مهمات منزلك وعنايتك بالبشرة وتمارينك المسائية مع ميزة الفرز والبحث.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-natural-bg border border-natural-border p-5 rounded-2xl">
          <span className="text-xs text-natural-muted font-bold block">المهام اليومية</span>
          <div className="text-3xl font-black text-natural-heading mt-1">{tasks.length}</div>
        </div>
        <div className="bg-natural-green/50 border border-natural-border p-5 rounded-2xl">
          <span className="text-xs text-natural-primary font-bold block">المهام المكتملة</span>
          <div className="text-3xl font-black text-natural-primary mt-1">{completedCount}</div>
        </div>
        <div className="bg-natural-light border border-natural-border p-5 rounded-2xl">
          <span className="text-xs text-natural-heading font-bold block">معدل الإنجاز العام</span>
          <div className="text-3xl font-black text-natural-primary mt-1">{Math.round(progressRatio)}%</div>
          <div className="w-full bg-white/60 h-1.5 rounded-full mt-2.5 overflow-hidden border border-natural-border/25">
            <div className="bg-natural-primary h-1.5 rounded-full" style={{ width: `${progressRatio}%` }}></div>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-natural-bg border border-natural-border p-5 rounded-2xl mb-6">
        <div className="text-sm font-bold text-natural-heading mb-3.5">إضافة مهمة جديدة</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
          <div>
            <label className="text-[11px] font-bold text-natural-muted block mb-1">اسم المهمة *</label>
            <input 
              type="text" 
              placeholder="مثال: القيام بجلسة شد عضلات الظهر..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl py-2.5 px-4 text-sm outline-hidden font-semibold text-natural-text"
              required
              id="input-task-title"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-natural-muted block mb-1">تصنيف المهمة</label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as any)}
              className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl py-2.5 px-4 text-sm outline-hidden font-semibold text-natural-text"
              id="select-task-category"
            >
              <option value="general">عام</option>
              <option value="skin_massage">تدليك وعناية البشرة</option>
              <option value="sport">تمارين رياضة الجسم</option>
              <option value="home">العادات والمنزل</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-3.5">
          <div className="md:col-span-2">
            <label className="text-[11px] font-bold text-natural-muted block mb-1">ملاحظات توضيحية / تفاصيل</label>
            <input 
              type="text" 
              placeholder="خطوات التنفيذ، نصيحة هامة..."
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl py-2.5 px-4 text-sm outline-hidden font-semibold text-natural-text"
              id="input-task-notes"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-natural-muted block mb-1">الوقت المحدد (اختياري)</label>
            <input 
              type="time" 
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl py-2.5 px-4 text-sm outline-hidden font-mono font-bold text-natural-text"
              id="input-task-time"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            className="bg-natural-primary hover:bg-natural-primary-hover text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            id="btn-add-task-submit"
          >
            <Plus className="w-4 h-4" />
            إضافة المهمة للجدول
          </button>
        </div>
      </form>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4">
        {/* Search tool */}
        <div className="relative flex-1">
          <Search className="w-4.5 h-4.5 text-natural-muted absolute right-3 top-3.5" />
          <input 
            type="text" 
            placeholder="ابحث عن مهمة أو ملاحظة معينة..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl pr-10 pl-4 py-3 text-xs outline-hidden font-semibold text-natural-text"
            id="input-task-search"
          />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1.5" id="task-filters">
          {(['all', 'general', 'skin_massage', 'sport', 'home'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors border ${
                activeFilter === f 
                  ? 'bg-natural-primary text-white border-natural-primary' 
                  : 'bg-white text-natural-text border-natural-border hover:bg-natural-light/50'
              }`}
              id={`filter-btn-${f}`}
            >
              {f === 'all' && 'الكل'}
              {f === 'general' && 'عام'}
              {f === 'skin_massage' && 'العناية بالبشرة'}
              {f === 'sport' && 'تمارين الجسم'}
              {f === 'home' && 'عادات المنزل'}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-natural-border rounded-2xl bg-natural-bg/50">
            <LayoutList className="w-8 h-8 text-natural-muted/50 mx-auto mb-2" />
            <p className="text-xs text-natural-muted font-bold">لا توجد مهمات مطابقة للفرز والبحث</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map(t => {
              const theme = getCategoryTheme(t.category);
              return (
                <motion.div
                  layout
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-2xl transition-colors ${
                    t.completed 
                      ? 'bg-natural-bg/50 border-natural-border text-natural-muted' 
                      : 'bg-white border-natural-border hover:border-natural-primary shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button 
                      onClick={() => handleToggleTask(t.id)}
                      className="mt-1.5 cursor-pointer text-natural-muted hover:text-natural-primary transition-colors"
                      id={`btn-toggle-task-${t.id}`}
                    >
                      {t.completed ? (
                        <CheckSquare className="w-5 h-5 text-natural-primary" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-bold ${t.completed ? 'line-through text-natural-muted/80' : 'text-natural-text'}`}>
                          {t.title}
                        </span>
                        {t.time && (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-natural-light text-natural-primary rounded-md font-bold border border-natural-border/30">
                            {t.time}
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${theme.bg} ${theme.text} ${theme.border}`}>
                          {theme.icon}
                          {theme.tag}
                        </span>
                      </div>
                      {t.notes && (
                        <p className={`text-xs mt-1 leading-relaxed font-semibold ${t.completed ? 'text-natural-muted/50' : 'text-natural-muted'}`}>
                          {t.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end w-full sm:w-auto mt-3 sm:mt-0 border-t sm:border-0 pt-2 sm:pt-0 border-natural-border/40">
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 text-natural-muted hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
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
      </div>
    </div>
  );
}
