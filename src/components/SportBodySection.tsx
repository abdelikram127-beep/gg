import { useState, useEffect } from 'react';
import { VideoItem } from '../types';
import { Dumbbell, Youtube, ExternalLink, Flame, Timer, Play, Pause, RotateCcw, CheckCircle2, ShieldEllipsis } from 'lucide-react';
import { motion } from 'motion/react';

const SPORT_VIDEOS: VideoItem[] = [
  {
    id: 'sp1',
    title: 'تمرين حرق الدهون وشد الجسم بالكامل في المنزل - كارديو مسائي لزيادة اللياقة',
    videoUrl: 'https://www.youtube.com/watch?v=i1Uaqe2H7Us',
    youtubeId: 'i1Uaqe2H7Us',
    duration: '20 دقيقة',
    category: 'sport',
    benefits: [
      'حرق السعرات الحرارية الزائدة بطريقة آمنة في المنزل وبدون معدات للرشاقة',
      'زيادة اللياقة القلبية التنفسية وتقوية عضلات الساقين والأرداف والذراعين',
      'تفريغ الطاقة السلبية المتраكمة والتوتر وتحسين النوم العميق (إذا تمت قبل النوم بساعتين)'
    ],
    instructor: 'تمارين الكارديو وتنشيط المساء'
  },
  {
    id: 'sp2',
    title: 'تمارين تصحيح استقامة العمود الفقري وعلاج انحناء الظهر والرقبة',
    videoUrl: 'https://www.youtube.com/watch?v=uCYZAwEV5lA',
    youtubeId: 'uCYZAwEV5lA',
    duration: '15 دقيقة',
    category: 'sport',
    benefits: [
      'تقوية عضلات أعلى الظهر وفرد الكتفين المنحنين بفعل الجلوس الطويل والمكتب',
      'تخفيف آلام الرقبة والشعور بالشد الناتج عن انحناء الرأس للنظر في الهاتف',
      'تحسين مظهر الجسم الخارجي وإعطاء قوام واثق ومفرود ومثالي للبشرة والعضلات'
    ],
    instructor: 'تمارين الاستقامة واليوجا الوقائية'
  }
];

export default function SportBodySection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(SPORT_VIDEOS[0]);
  
  // Custom interactive Workout Timer/Chronometer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          const next = prev + 1;
          // Rough estimate: 0.12 calories burned per second of workout
          setCaloriesBurned(Math.round(next * 0.12));
          return next;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCaloriesBurned(0);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 border-2 border-natural-border shadow-premium relative overflow-hidden" id="sport-body-card">
      {/* Decorative floral element */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-rose-400/5 rounded-full blur-[40px] pointer-events-none"></div>

      <div className="border-b border-natural-border pb-5 mb-6 relative z-10">
        <h2 className="text-2xl font-black text-natural-heading flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-tr from-natural-primary to-rose-400 text-white rounded-xl shadow-glow-pink">
            <Dumbbell className="w-5 h-5 animate-pulse" />
          </span>
          حصة اللياقة وقوام الأنوثة (Sport Body) 🧘‍♀️💪
        </h2>
        <p className="text-sm text-natural-muted mt-2 font-semibold">
          تمارين منزلية ممتعة وسهلة مخصصة لفرد الظهر وتصحيح انحناء القوام الناتج عن العمل المكتبي ونحت رشاقة الجسم.
        </p>
      </div>

      {/* Grid view layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left column: Video Playback & Info */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-250 rounded-2xl p-4 flex items-start gap-3.5 text-xs text-[#7A451A] font-semibold mb-1 shadow-2xs">
            <span className="p-1.5 bg-amber-100 rounded-xl text-amber-800 font-extrabold shrink-0">💡 ملاحظة التشغيل</span>
            <p className="leading-relaxed font-sans">
              إذا واجهتِ صعوبة في تشغيل عارض اليوتيوب المباشر بالأسفل بسبب حماية خصوصية متصفحكِ، انقري بكل بساطة على زر <strong className="text-natural-primary">"الفتح في نافذة جديدة"</strong> للاستمتاع بالحصة مباشرة وبأعلى دقة!
            </p>
          </div>

          <div className="aspect-video bg-gradient-to-br from-[#1E1114] to-[#2D1017] rounded-[24px] overflow-hidden shadow-premium border-2 border-pink-200/50 relative group">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              id="sport-video-player-iframe"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FFF6F7] border border-pink-100 p-5 rounded-[22px] shadow-2xs">
            <div>
              <p className="text-xs text-natural-primary font-black uppercase tracking-widest bg-pink-100 px-2.5 py-0.5 rounded-full inline-block border border-pink-200/50">{selectedVideo.instructor} 🧘‍♀️</p>
              <h3 className="text-base font-black text-natural-heading mt-2">{selectedVideo.title}</h3>
              <p className="text-xs text-natural-muted font-bold mt-1.5">⏱️ مدة المقطع: {selectedVideo.duration}</p>
            </div>
            
            <a
              href={selectedVideo.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-natural-primary to-rose-500 hover:from-natural-primary-hover hover:to-rose-600 text-white py-3 px-5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-glow-pink"
              id="link-sport-external"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              الفتح بنافذة جديدة ↗️
            </a>
          </div>

          {/* Benefits Box */}
          <div className="bg-gradient-to-r from-[#D3FBF0] to-white border-2 border-[#B4F2E0] p-6 rounded-[24px]">
            <h4 className="text-sm font-black text-[#1F7C5E] flex items-center gap-2 mb-3.5">
              <Flame className="w-5 h-5 text-[#1F7C5E] animate-pulse" />
              الأهداف التأهيلية والصحية المتميزة للتمرين:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-2.5">
              {selectedVideo.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-natural-text leading-relaxed font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1BB381] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Target Selection & Interactive Timer tool */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pick Playlist Video */}
          <div className="space-y-3">
            <p className="text-xs font-black text-[#8E4B62] uppercase tracking-wider block bg-pink-100/50 px-3 py-1 rounded-lg border-r-4 border-natural-primary">اختر نوع تمرين الليلة</p>
            <div className="space-y-3">
              {SPORT_VIDEOS.map(video => {
                const isActive = selectedVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-right p-4.5 rounded-[22px] border-2 transition-all cursor-pointer flex gap-3.5 items-start ${
                      isActive 
                        ? 'border-natural-primary bg-gradient-to-br from-pink-50 to-[#EFFDF9] shadow-inner' 
                        : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/20'
                    }`}
                    id={`btn-select-sport-video-${video.id}`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${isActive ? 'bg-natural-primary text-white shadow-glow-pink' : 'bg-pink-100 text-pink-500'}`}>
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-natural-primary bg-pink-100/60 px-2 py-0.5 rounded-full">{video.instructor} 🌟</span>
                      <h4 className={`text-xs font-black mt-2 leading-relaxed ${isActive ? 'text-natural-heading' : 'text-natural-text'}`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-[#A05C70] mt-1.5 font-bold font-mono">⏱️ المدة المقررة: {video.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Workout Timer */}
          <div className="bg-gradient-to-br from-[#2D1017] to-[#4A1725] text-white p-6 rounded-[28px] border-2 border-pink-200 shadow-premium relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-400/20 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-5 relative z-10">
              <h4 className="text-xs font-black text-pink-100 tracking-wider flex items-center gap-1.5 uppercase">
                <Timer className="w-4 h-4 text-pink-400 animate-pulse" />
                عداد اللياقة والنشاط المسائي ⏱️
              </h4>
              <span className="text-[10px] bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1 rounded-full font-black shadow-2xs">تألق حيوي</span>
            </div>

            <div className="flex items-center justify-around py-3 relative z-10">
              <div className="text-center">
                <span className="text-3.5xl font-black font-mono tracking-wider block text-white drop-shadow-xs">
                  {formatTime(timerSeconds)}
                </span>
                <span className="text-[10px] text-pink-200 font-extrabold mt-1 block">وقت التمرين الحالي</span>
              </div>
              
              <div className="w-px h-12 bg-white/20"></div>

              <div className="text-center">
                <div className="text-3.5xl font-black font-mono tracking-wider text-pink-100 flex items-baseline justify-center gap-0.5 drop-shadow-xs">
                  {caloriesBurned}
                  <span className="text-xs font-black text-pink-300 font-sans">سعرة</span>
                </div>
                <span className="text-[10px] text-pink-200 font-extrabold mt-1 block">حرارية مفقودة</span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-6 relative z-10">
              {isTimerRunning ? (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="flex-1 bg-white hover:bg-pink-50 text-natural-heading font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-md"
                  id="btn-pause-timer"
                >
                  <Pause className="w-4 h-4 text-natural-primary" />
                  إيقاف مؤقت
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(true)}
                  className="flex-1 bg-gradient-to-r from-natural-primary to-rose-500 hover:from-natural-primary-hover hover:to-rose-600 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-glow-pink"
                  id="btn-start-timer"
                >
                  <Play className="w-4 h-4" />
                  بدء المؤقت الآن
                </button>
              )}

              <button
                onClick={resetTimer}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors cursor-pointer active:scale-95"
                title="إعادة ضبط المؤقت"
                id="btn-reset-timer"
              >
                <RotateCcw className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Fitness Instructions */}
          <div className="bg-gradient-to-br from-[#FFF8F9] to-white border-2 border-pink-100 p-6 rounded-[24px] shadow-2xs">
            <h5 className="text-xs font-black text-natural-primary flex items-center gap-2 mb-3.5">
              <ShieldEllipsis className="w-4.5 h-4.5 text-natural-primary" />
              دليلكِ الوقائي للرشاقة والصحة الليلة:
            </h5>
            <ul className="text-[11px] text-natural-text space-y-2.5 leading-relaxed font-semibold list-inside pr-1 text-right">
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>ابدئي التمرين بحركات إحماء خفيفة لمدة دقيقتين للمفاصل والكتفين.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>لا تحبسي تنفسكِ؛ تنفّسي بعمق من الأنف والزفير من الفم لمساعدة عضلاتكِ.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>توقفي فوراً في حال شعرتِ بأي شد عضلي حاد، واشربي بضع رشفات من الماء لترطيب الجسم.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
