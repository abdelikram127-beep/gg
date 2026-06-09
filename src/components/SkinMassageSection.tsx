import { useState } from 'react';
import { VideoItem } from '../types';
import { Sparkles, Youtube, ExternalLink, Heart, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'motion/react';

const MASSAGE_VIDEOS: VideoItem[] = [
  {
    id: 'sm1',
    title: 'سحر تقنية تدليك الوجه اليابانية - شد طبيعي مذهل ومحاربة التجاعيد',
    videoUrl: 'https://www.youtube.com/watch?v=qe9IUJq61sw',
    youtubeId: 'qe9IUJq61sw',
    duration: '12 دقيقة',
    category: 'skin_massage',
    benefits: [
      'تنشيط الدورة الدموية وتدفق الأكسجين لخلايا الوجه لزيادة النضارة',
      'تحفيز إنتاج الكولاجين الطبيعي لملء خطوط الجبهة وحول الفم',
      'تقليل التورم الصباحي وتصريف السوائل الزائدة في الوجه والذقن'
    ],
    instructor: 'خبيرة تجميل البشرة الكورية'
  },
  {
    id: 'sm2',
    title: 'تمارين التدليك الذاتي لتصريف السموم ورفع خطوط عظمتي الوجه',
    videoUrl: 'https://www.youtube.com/watch?v=L93bktQv1co',
    youtubeId: 'L93bktQv1co',
    duration: '8 دقائق',
    category: 'skin_massage',
    benefits: [
      'تفعيل نظام التصريف اللمفاوي للتخلص من السموم المتراكمة وتحت العينين',
      'نحت الفك وجسر الأنف وإبراز عظام الوجنتين بشكل طبيعي',
      'تخفيف تشنجات الوجه الناتجة عن التوتر والضغط المستمر'
    ],
    instructor: 'مدرسة يوغا الوجه'
  },
  {
    id: 'sm3',
    title: 'تدليك التنعيم ومحاربة الهالات السوداء والخطوط الرفيعة للعين والشفاه',
    videoUrl: 'https://www.youtube.com/watch?v=fhD6D88Hy_c',
    youtubeId: 'fhD6D88Hy_c',
    duration: '10 دقائق',
    category: 'skin_massage',
    benefits: [
      'شد خطوط الضحك وعلاج تظليل الجفون وخط سير الدموع',
      'تحسين امتصاص سيروم الهيدروليك والكريمات المغذية',
      'تهدئة عضلات العين المتعبة الناتجة عن شاشات الهواتف والكمبيوتر'
    ],
    instructor: 'روتين المساج المنزلي التجميلي'
  }
];

export default function SkinMassageSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(MASSAGE_VIDEOS[0]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('fav_skincare_videos') || '[]');
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter(fId => fId !== id);
      } else {
        next = [...prev, id];
      }
      localStorage.setItem('fav_skincare_videos', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-natural-border shadow-xs" id="skin-massage-card">
      <div className="border-b border-natural-border pb-5 mb-6">
        <h2 className="text-2xl font-bold text-natural-heading flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-natural-primary animate-pulse" />
          روتين تدليك وعناية البشرة (Skin Massage)
        </h2>
        <p className="text-sm text-natural-muted mt-1.5 font-medium">
          عناية يومية مسائية مخصصة باستخدام تمارين يوغا وتدليك الوجه لاستعادة حيوية البشرة ومحاربة التعب.
        </p>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Embed Player Video */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-video bg-natural-text rounded-2xl overflow-hidden shadow-md border border-natural-border relative group">
            {/* Embed Player */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
              id="skincare-video-player-iframe"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-natural-light/40 border border-natural-border p-4 rounded-xl">
            <div>
              <p className="text-xs text-natural-primary font-bold uppercase tracking-widest">{selectedVideo.instructor}</p>
              <h3 className="text-base font-bold text-natural-heading mt-0.5">{selectedVideo.title}</h3>
              <p className="text-xs text-natural-muted font-bold mt-1">مدة الفيديو المقدرة: {selectedVideo.duration}</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleFavorite(selectedVideo.id)}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  favorites.includes(selectedVideo.id)
                    ? 'bg-natural-green border-natural-border text-natural-primary hover:bg-natural-green/80'
                    : 'bg-white border-natural-border text-natural-text hover:bg-natural-light/50'
                }`}
                id="btn-fav-skincare"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(selectedVideo.id) ? 'fill-natural-primary text-natural-primary' : 'text-natural-muted'}`} />
                {favorites.includes(selectedVideo.id) ? 'تم الحفظ للمفضلة' : 'حفظ للمفضلة'}
              </button>

              <a
                href={selectedVideo.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-natural-primary hover:bg-natural-primary-hover text-white py-2 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                id="link-skincare-external"
              >
                <ExternalLink className="w-4 h-4" />
                اليوتيوب
              </a>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-natural-green/40 border border-natural-border/70 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-natural-primary flex items-center gap-1.5 mb-3">
              <Award className="w-5 h-5 animate-bounce-slow" />
              أبرز الفوائد التجميلية والعلاجية لهذا الروتين:
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

        {/* Right Column: Video Playlist & Skincare Checklist Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-natural-muted uppercase tracking-wider">الفيديوهات والتمارين الملحقة</p>
            <div className="space-y-2.5">
              {MASSAGE_VIDEOS.map(video => {
                const isActive = selectedVideo.id === video.id;
                const isFavorite = favorites.includes(video.id);
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-right p-4 rounded-xl border transition-all cursor-pointer flex gap-3.5 items-start ${
                      isActive 
                        ? 'border-natural-primary bg-natural-green/30' 
                        : 'border-natural-border bg-white hover:border-natural-primary/50'
                    }`}
                    id={`btn-select-video-${video.id}`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${isActive ? 'bg-natural-primary text-white' : 'bg-natural-light text-natural-muted'}`}>
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wide">{video.instructor}</span>
                        {isFavorite && <Heart className="w-3.5 h-3.5 fill-natural-primary text-natural-primary shrink-0" />}
                      </div>
                      <h4 className={`text-xs font-bold mt-1 line-clamp-2 ${isActive ? 'text-natural-heading' : 'text-natural-text'}`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-natural-muted mt-1.5 font-bold">المدة: {video.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expert skincare warnings */}
          <div className="bg-natural-bg border border-natural-border p-5 rounded-2xl shadow-2xs">
            <h5 className="text-xs font-bold text-natural-primary flex items-center gap-1.5 mb-3">
              <ShieldAlert className="w-4.5 h-4.5" />
              إرشادات طبية هامة لتفادي الضرر:
            </h5>
            <ul className="text-[11px] text-natural-text space-y-2 leading-relaxed font-semibold list-disc list-inside">
              <li>اغسل يديك ووجهك جيداً قبل لمس خلايا بشرتك.</li>
              <li>لا تقم بمساج على بشرة جافة أبداً لتفادي التمزقات الشعرية والترهلات؛ استخدم دوماً مادة زيتية طرية أو سيروم مرطب.</li>
              <li>استخدم حركات متجهة لأعلى وللخارج، ولا تدفع الأنسجة لأسفل نهائياً لتفادي تسريع الخطوط والتجاعيد.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
