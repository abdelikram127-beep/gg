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
      'تفريغ الطاقة السلبية المتراكمة والتوتر وتحسين النوم العميق (إذا تمت قبل النوم بساعتين)'
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
    <div className="bg-white rounded-[32px] p-8 border border-natural-border shadow-xs" id="sport-body-card">
      <div className="border-b border-natural-border pb-5 mb-6">
        <h2 className="text-2xl font-bold text-natural-heading flex items-center gap-2.5">
          <Dumbbell className="w-6 h-6 text-natural-primary animate-bounce-slow" />
          روتين رياضة وتعديل قوام الجسم (Sport Body)
        </h2>
        <p className="text-sm text-natural-muted mt-1.5 font-medium">
          تمارين منزلية مسائية مخصصة لزيادة مستوى اللياقة البدنية والقلبية، وفرد الأكتاف والرقبة للتخلص من تأثير الجلوس المكتبي.
        </p>
      </div>

      {/* Grid view layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Video Playback & Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-video bg-natural-text rounded-2xl overflow-hidden shadow-md border border-natural-border relative group">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              id="sport-video-player-iframe"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-natural-light/40 border border-natural-border p-4 rounded-xl">
            <div>
              <p className="text-xs text-natural-primary font-bold uppercase tracking-widest">{selectedVideo.instructor}</p>
              <h3 className="text-base font-bold text-natural-heading mt-0.5">{selectedVideo.title}</h3>
              <p className="text-xs text-natural-muted font-bold mt-1">مدة الفيديو: {selectedVideo.duration}</p>
            </div>
            
            <a
              href={selectedVideo.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-natural-primary hover:bg-natural-primary-hover text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              id="link-sport-external"
            >
              <ExternalLink className="w-4 h-4" />
              متابعة في يوتيوب
            </a>
          </div>

          {/* Benefits Box */}
          <div className="bg-natural-green/40 border border-natural-border/70 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-natural-primary flex items-center gap-1.5 mb-3">
              <Flame className="w-5 h-5 animate-pulse" />
              الأهداف التأهيلية والصحية الفعالة للتمرين:
            </h4>
            <ul className="space-y-2">
              {selectedVideo.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-natural-text leading-relaxed font-semibold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-natural-primary shrink-0 mt-0.5" />
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
            <p className="text-xs font-bold text-natural-muted uppercase tracking-wider">اختر نوع تمرين الليلة</p>
            <div className="space-y-2.5">
              {SPORT_VIDEOS.map(video => {
                const isActive = selectedVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                      isActive 
                        ? 'border-natural-primary bg-natural-green/30' 
                        : 'border-natural-border bg-white hover:border-natural-primary/50'
                    }`}
                    id={`btn-select-sport-video-${video.id}`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${isActive ? 'bg-natural-primary text-white' : 'bg-natural-light text-natural-muted'}`}>
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wide">{video.instructor}</span>
                      <h4 className={`text-xs font-bold mt-1 line-clamp-2 ${isActive ? 'text-natural-heading' : 'text-natural-text'}`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-natural-muted mt-1.5 font-bold font-mono">المدة المقررة: {video.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Workout Timer */}
          <div className="bg-natural-text text-white p-6 rounded-[24px] border border-natural-border shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold text-natural-bg tracking-wider flex items-center gap-1.5 uppercase">
                <Timer className="w-4 h-4 text-natural-primary" />
                مؤقت التدريب المنزلي النشط
              </h4>
              <span className="text-[10px] bg-natural-primary text-white px-2.5 py-0.5 rounded-full font-bold">نشاط الليلة</span>
            </div>

            <div className="flex items-center justify-around py-2">
              <div className="text-center">
                <span className="text-3xl font-black font-mono tracking-wider block text-white">
                  {formatTime(timerSeconds)}
                </span>
                <span className="text-[10px] text-natural-bg font-bold">وقت التمرين الحالي</span>
              </div>
              
              <div className="w-px h-10 bg-white/20"></div>

              <div className="text-center">
                <div className="text-3xl font-black font-mono tracking-wider text-[#E9F0E6] flex items-baseline justify-center gap-0.5">
                  {caloriesBurned}
                  <span className="text-xs font-bold text-[#D5E4D0] font-sans">سعرة</span>
                </div>
                <span className="text-[10px] text-natural-bg font-bold">السعرات المفقودة المقدرة</span>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              {isTimerRunning ? (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="flex-1 bg-[#FDFBF7] hover:bg-[#FDFBF7]/90 text-natural-text font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  id="btn-pause-timer"
                >
                  <Pause className="w-4 h-4 text-natural-primary" />
                  إيقاف مؤقت
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(true)}
                  className="flex-1 bg-natural-primary hover:bg-natural-primary-hover text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  id="btn-start-timer"
                >
                  <Play className="w-4 h-4" />
                  بدء المؤقت الآن
                </button>
              )}

              <button
                onClick={resetTimer}
                className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-colors cursor-pointer"
                title="إعادة ضبط المؤقت"
                id="btn-reset-timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fitness Instructions */}
          <div className="bg-natural-bg border border-natural-border p-5 rounded-2xl">
            <h5 className="text-xs font-bold text-natural-primary flex items-center gap-1.5 mb-3">
              <ShieldEllipsis className="w-4.5 h-4.5" />
              نصائح الخبراء للوقاية أثناء التدريب المسائي:
            </h5>
            <ul className="text-[11px] text-natural-text space-y-2 leading-relaxed font-semibold list-disc list-inside">
              <li>قم بتمارين إحماء خفيفة لمدة 3 دقائق قبل البدء بالتمارين القوية.</li>
              <li>حافظ على انتظام التنفس؛ لا تحبس أنفاسك أثناء ممارسة تمارين عضلات البطن أو الشد.</li>
              <li>إذا شعرت بدوار أو ألم في المفاصل، فتوقف فوراً وقم بعملية استرخاء وهدوء.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
