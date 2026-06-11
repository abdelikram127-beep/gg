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
    <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 border-2 border-natural-border shadow-premium relative overflow-hidden" id="skin-massage-card">
      {/* Absolute backgrounds circles */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400/5 rounded-full blur-[40px] pointer-events-none"></div>

      <div className="border-b border-natural-border pb-5 mb-6 relative z-10">
        <h2 className="text-2xl font-black text-natural-heading flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-tr from-natural-primary to-rose-400 text-white rounded-xl shadow-glow-pink">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          يوغا وتدليك الوجه الساحر (Skin Massage) 💆‍♀️✨
        </h2>
        <p className="text-sm text-natural-muted mt-2 font-semibold">
          بوابتكِ الحيوية لترميم خلايا بشرتكِ، إبراز منعرجات الوجه الفاتنة، وتصريف ضغوط العمل بلمسات أنثوية دافئة.
        </p>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Embed Player Video */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-250 rounded-2xl p-4 flex items-start gap-3.5 text-xs text-[#7A451A] font-semibold mb-1 shadow-2xs">
            <span className="p-1.5 bg-amber-100 rounded-xl text-amber-800 font-extrabold shrink-0">💡 ملاحظة الأمان</span>
            <p className="leading-relaxed font-sans">
              إذا واجهتِ صعوبة في تشغيل عارض اليوتيوب المباشر بالأسفل بسبب حماية خصوصية متصفحكِ، انقري بكل بساطة على زر <strong className="text-natural-primary">"الفتح في نافذة جديدة"</strong> للاستمتاع بالحصة مباشرة وبأعلى دقة!
            </p>
          </div>

          <div className="aspect-video bg-gradient-to-br from-[#1E1114] to-[#2D1017] rounded-[24px] overflow-hidden shadow-premium border-2 border-pink-200/50 relative group">
            {/* Embed Player */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              id="skincare-video-player-iframe"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FFF6F7] border border-pink-100 p-5 rounded-[22px] shadow-2xs">
            <div>
              <p className="text-xs text-natural-primary font-black uppercase tracking-widest bg-pink-100 px-2.5 py-0.5 rounded-full inline-block border border-pink-200/50">{selectedVideo.instructor} 👑</p>
              <h3 className="text-base font-black text-natural-heading mt-2">{selectedVideo.title}</h3>
              <p className="text-xs text-natural-muted font-bold mt-1.5">⏱️ المدة التقديرية: {selectedVideo.duration}</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => toggleFavorite(selectedVideo.id)}
                className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
                  favorites.includes(selectedVideo.id)
                    ? 'bg-[#E3FBF1] border-[#B2ECD4] text-[#1E7453]'
                    : 'bg-white border-pink-100 text-natural-text hover:bg-pink-50'
                }`}
                id="btn-fav-skincare"
              >
                <Heart className={`w-4.5 h-4.5 ${favorites.includes(selectedVideo.id) ? 'fill-red-500 text-red-500' : 'text-pink-400'}`} />
                {favorites.includes(selectedVideo.id) ? 'محفوظة بالمفضلة 💖' : 'حفظ للرجوع إليها'}
              </button>

              <a
                href={selectedVideo.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-natural-primary to-rose-500 hover:from-natural-primary-hover hover:to-rose-600 text-white py-3 px-5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-glow-pink"
                id="link-skincare-external"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                تشغيل خارجي ↗️
              </a>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-gradient-to-r from-[#D3FBF0] to-white border-2 border-[#B4F2E0] p-6 rounded-[24px]">
            <h4 className="text-sm font-black text-[#1F7C5E] flex items-center gap-2 mb-3.5">
              <Award className="w-5 h-5 text-[#1F7C5E] animate-bounce-slow" />
              أبرز الفوائد التجميلية والعلاجية لروتين المساج الحكيم:
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

        {/* Right Column: Video Playlist & Skincare Checklist Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-black text-[#8E4B62] uppercase tracking-wider block bg-pink-100/50 px-3 py-1 rounded-lg border-r-4 border-natural-primary">قائمة الحصص والتمارين الساحرة</p>
            <div className="space-y-3">
              {MASSAGE_VIDEOS.map(video => {
                const isActive = selectedVideo.id === video.id;
                const isFavorite = favorites.includes(video.id);
                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`w-full text-right p-4.5 rounded-[22px] border-2 transition-all cursor-pointer flex gap-3.5 items-start ${
                      isActive 
                        ? 'border-natural-primary bg-gradient-to-br from-pink-50 to-[#EFFDF9] shadow-inner' 
                        : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/20'
                    }`}
                    id={`btn-select-video-${video.id}`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${isActive ? 'bg-natural-primary text-white shadow-glow-pink' : 'bg-pink-100 text-pink-500'}`}>
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-black text-natural-primary bg-pink-100/60 px-2 py-0.5 rounded-full">{video.instructor} ✨</span>
                        {isFavorite && <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 shrink-0" />}
                      </div>
                      <h4 className={`text-xs font-black mt-2 leading-relaxed ${isActive ? 'text-natural-heading' : 'text-natural-text'}`}>
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-[#A05C70] mt-1.5 font-bold">⏱️ المدة: {video.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expert skincare warnings */}
          <div className="bg-gradient-to-br from-[#FFF8F9] to-white border-2 border-pink-100 p-6 rounded-[24px] shadow-2xs">
            <h5 className="text-xs font-black text-natural-primary flex items-center gap-2 mb-3.5">
              <ShieldAlert className="w-4.5 h-4.5" />
              الوصايا الطبية والجمالية لتجنب الضيق:
            </h5>
            <ul className="text-[11px] text-natural-text space-y-2.5 leading-relaxed font-semibold list-inside pl-1 text-right">
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>اغسلي يديكِ ووجهكِ جيداً بغسول لطيف قبل دلك نسيج الجبين والوجنتين.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>تجنبي دلك بشرتكِ وهي جافة نهائياً وبدون كريم أو زيت لوز/أرجان منعاً للتمزقات والشحوب.</span>
              </li>
              <li className="flex gap-1.5 items-start">
                <span className="text-natural-primary">🌸</span>
                <span>وجّهي حركات يديكِ من منتصف الوجه للأعلى والخارج دوماً لمقاومة عوامل الجاذبية!</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
