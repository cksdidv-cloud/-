
import React, { useState, useRef } from 'react';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  ChevronDown,
  BarChart3,
  Mail,
  Phone,
  Building,
  Target,
  Rocket,
  Download,
  Loader2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import html2canvas from 'html2canvas';

/** 
 * 성장 데이터 사례
 */
const caseData = [
  { name: '1주', traffic: 120, followers: 850 },
  { name: '2주', traffic: 450, followers: 1200 },
  { name: '3주', traffic: 890, followers: 1650 },
  { name: '4주', traffic: 2100, followers: 2400 },
];

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center items-center px-6 py-20 ${className}`}>
    <div className="max-w-5xl w-full mx-auto">
      {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', blogUrl: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * 상세페이지 전체를 이미지로 다운로드하는 함수
   */
  const handleDownloadImage = async () => {
    if (!pageRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      
      // 캡처 최적화를 위해 약간의 지연 시간 부여
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(pageRef.current, {
        useCORS: true,
        scale: 2, // 고화질을 위해 2배율로 캡처
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // 캡처용 복제본에서 다운로드 버튼 등 제외
          const btn = clonedDoc.querySelector('.download-btn-fixed');
          if (btn) btn.remove();
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `반딧불마케팅_상세페이지_${new Date().getTime()}.png`;
      link.click();
    } catch (error) {
      console.error('Image capture failed:', error);
      alert('이미지 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="bg-white relative" ref={pageRef}>
      {/* 캡처 로딩 오버레이 */}
      {isCapturing && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mb-4 text-emerald-400" />
          <p className="text-xl font-bold">상세페이지를 고화질 이미지로 생성 중입니다...</p>
          <p className="opacity-70 mt-2 text-sm">페이지가 길 경우 최대 10초 정도 소요될 수 있습니다.</p>
        </div>
      )}

      {/* 이미지 저장 고정 버튼 */}
      <button 
        onClick={handleDownloadImage}
        disabled={isCapturing}
        className="download-btn-fixed fixed bottom-8 right-8 z-[90] bg-white text-gray-900 border border-gray-200 shadow-2xl px-6 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-50 hover:border-emerald-200 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 group"
      >
        <div className="bg-emerald-500 text-white p-2 rounded-lg group-hover:bg-emerald-600">
          <Download size={20} />
        </div>
        <div className="text-left">
          <div className="text-xs text-gray-400 leading-none mb-1 uppercase tracking-tight">Full Page Export</div>
          <div className="text-sm">이미지로 저장</div>
        </div>
      </button>

      {/* 1페이지: 후킹 & 히어로 및 1차 신청박스 */}
      <Section className="bg-gradient-to-br from-green-600 to-emerald-900 text-white relative overflow-hidden">
        <div className="z-10 text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 animate-bounce">
            🔥 월 2만원, 하루 666원의 기적
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            아직도 손으로 <br/>
            <span className="text-yellow-300">서이추</span> 하세요?
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
            포스팅 하나 쓰기도 벅찬 당신을 위해<br/> 
            <span className="font-bold border-b-2 border-yellow-300">서이추부터 댓글공감까지</span> 24시간 대신 소통합니다.
          </p>

          <div className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6 italic">"지금 바로 블로그를 깨우세요"</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="성함/닉네임" 
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:ring-4 ring-yellow-400 outline-none transition-all"
                required
              />
              <input 
                type="tel" 
                placeholder="연락처 (010-0000-0000)" 
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:ring-4 ring-yellow-400 outline-none transition-all"
                required
              />
              <button className="w-full py-4 bg-yellow-400 text-emerald-900 font-black text-xl rounded-xl hover:bg-yellow-300 transform hover:scale-[1.02] transition-all shadow-lg">
                무료 상담 및 관리 시작하기
              </button>
            </form>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50" onClick={() => document.getElementById('problem')?.scrollIntoView({behavior: 'smooth'})}>
          <ChevronDown size={40} />
        </div>
      </Section>

      {/* 2페이지: 현실적인 문제 제기 */}
      <Section id="problem" className="bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">정성껏 쓴 글, 왜 아무도 안 볼까요?</h2>
          <p className="text-gray-500 text-xl">이유는 명확합니다. '지수'와 '소통'이 없기 때문입니다.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "고립된 블로그", desc: "이웃 소통이 없어 최신순 저 멀리 밀려나는 포스팅" },
            { title: "시간 낭비", desc: "하루 3시간씩 서이추 돌리다 지쳐 정작 글은 못 쓰는 상황" },
            { title: "광고 취급", desc: "진정성 없는 매크로 댓글로 오히려 블로그 지수가 깎이는 경우" }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3페이지: 해결책 및 성장 그래프 */}
      <Section className="bg-emerald-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-600 font-bold mb-2 block tracking-widest uppercase">The Solution</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900">
              지수 상승의 치트키,<br/> <span className="text-emerald-600">유기적 성장 솔루션</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              단순 트래픽이 아닙니다. 실제 활동 중인 타겟 이웃을 찾아가고, 포스팅 내용에 맞는 댓글을 남겨 네이버 알고리즘이 사랑하는 블로그로 탈바꿈시킵니다.
            </p>
            <div className="space-y-4">
              {['C-Rank 알고리즘 최적화 대응', '실제 유저 중심의 타겟 소통', '방문자수 및 이웃수 동시 상승'].map((text, i) => (
                <div key={i} className="flex items-center space-x-3 text-lg font-bold text-gray-700">
                  <CheckCircle className="text-emerald-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl">
            <h4 className="text-center font-bold text-gray-400 mb-6 flex items-center justify-center gap-2">
              <BarChart3 size={20} /> 관리 후 방문자수 성장 곡선
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={caseData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="traffic" stroke="#10b981" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Section>

      {/* 4페이지: 서비스 상세 1 - 서이추 (이미지 포함) */}
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 order-2 md:order-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80" 
              className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-8 border-gray-50" 
              alt="네이버 블로그 서로이웃 추가 시스템 시각화" 
            />
            <div className="absolute top-6 left-6 bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
              REAL INTERACTION
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-black mb-6">정확한 타겟팅 <br/><span className="text-blue-600">서로이웃 추가</span></h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              아무나 추가하지 않습니다. 당신의 주제에 관심 있는 실제 활동 유저들을 선별하여 '진짜 이웃'을 만들어 드립니다.
            </p>
            <ul className="grid grid-cols-1 gap-4">
              <li className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">01</div>
                <div>
                  <h5 className="font-bold">업종별 키워드 타겟팅</h5>
                  <p className="text-sm text-gray-500">관련성 높은 유저 중심 신청</p>
                </div>
              </li>
              <li className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">02</div>
                <div>
                  <h5 className="font-bold">성공률 중심 로직</h5>
                  <p className="text-sm text-gray-500">자연스러운 수락을 이끄는 메시지</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 5페이지: 서비스 상세 2 - 소통 (이미지 포함) */}
      <Section className="bg-gray-50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-8">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-4xl font-black mb-6">글의 화력을 높이는 <br/><span className="text-pink-600">댓글 & 공감 자동화</span></h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              포스팅을 올리자마자 쏟아지는 반응! <br/>
              네이버가 '인기 있는 글'로 인식하게 만드는 필수 단계입니다.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Heart className="text-pink-500 flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-bold text-lg">포스팅 주제 맞춤형 댓글</h4>
                  <p className="text-gray-500">형식적인 댓글이 아닌, 문맥을 파악한 자연스러운 대화</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="text-yellow-500 flex-shrink-0" size={28} />
                <div>
                  <h4 className="font-bold text-lg">실시간 모니터링 대응</h4>
                  <p className="text-gray-500">업로드 즉시 화력을 집중하여 상위 노출 기회 확보</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80" 
              className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-8 border-white" 
              alt="모바일 블로그 소통 및 공감 버튼 상호작용" 
            />
            <div className="absolute -bottom-6 -left-6 bg-pink-600 text-white p-8 rounded-3xl shadow-xl">
              <div className="text-3xl font-black italic">TOP TIER</div>
              <div className="text-sm opacity-80">Engagement Rate</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6페이지: 압도적 가격 2만원 강조 */}
      <Section className="bg-emerald-900 text-white">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 italic tracking-tighter">"비쌀 이유가 전혀 없습니다"</h2>
          <p className="text-xl opacity-70">대행사의 거품을 완전히 제거한 본질적 가격</p>
        </div>
        <div className="max-w-xl mx-auto bg-white text-gray-900 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-emerald-500/20 transform hover:scale-[1.03] transition-all">
          <div className="bg-emerald-500 p-5 text-center text-white font-bold text-lg tracking-widest">LIMITED OFFER</div>
          <div className="p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-400 mb-2">프리미엄 올인원 케어</h3>
            <div className="flex items-center justify-center space-x-3 mb-10">
              <span className="text-3xl text-gray-300 line-through">15만원</span>
              <span className="text-6xl font-black text-emerald-600">월 20,000원</span>
            </div>
            <ul className="text-left space-y-5 mb-10 border-t border-gray-100 pt-10">
              {[
                "타겟 서이추 매일 100건 보장",
                "게시물당 공감/댓글 무제한 관리",
                "블로그 지수 분석 월간 보고서",
                "24시간 안전 구동 시스템 적용"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-lg">
                  <CheckCircle className="text-emerald-500 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={scrollToApply} className="w-full py-5 bg-emerald-600 text-white text-2xl font-black rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg">
              지금 할인 혜택 받기
            </button>
          </div>
        </div>
      </Section>

      {/* 7페이지: 성공 사례 1 - 개인 블로그 */}
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <span className="text-blue-600 font-bold mb-4 block italic">SUCCESS CASE #01</span>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              "관리 2주 만에 <br/> <span className="text-emerald-600 underline">애드포스트 수익</span>이 발생했어요"
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>"육아 정보를 공유하는 평범한 블로거였어요. 글만 올리면 아무도 안 왔는데, 2만원 관리 서비스를 받고 나서 서이추가 폭발하고 댓글이 달리니 블로그 하는 재미가 생겼습니다. 이제는 매일 커피 한 잔 값의 애드포스트 수익이 나요!"</p>
              <div className="flex items-center space-x-4 border-t border-gray-100 pt-6">
                <img src="https://picsum.photos/id/64/100/100" className="w-14 h-14 rounded-full" alt="User Avatar" />
                <div>
                  <div className="font-bold text-gray-900">맘블리 이OO님</div>
                  <div className="text-sm text-gray-400">육아/일상 전문 블로거</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-inner">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-sm text-gray-400 mb-1">일 평균 방문자</div>
                <div className="text-3xl font-black text-emerald-600">35명 → 720명</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-sm text-gray-400 mb-1">전체 이웃수</div>
                <div className="text-3xl font-black text-blue-600">120명 → 2,450명</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 8페이지: 성공 사례 2 - 비즈니스 블로그 */}
      <Section className="bg-emerald-50">
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="flex-1">
            <span className="text-emerald-600 font-bold mb-4 block italic">SUCCESS CASE #02</span>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              "블로그 마케팅으로 <br/> <span className="text-emerald-600 underline">매장 매출이 40%</span> 올랐습니다"
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>"동네 식당을 운영하며 블로그를 직접 키워보려 했지만 너무 힘들었죠. 반딧불마케팅을 만난 후 지역 잠재 고객들과의 서이추 소통이 늘어나면서 예약 문의가 확연히 늘었습니다. 2만원으로 전담 마케터를 둔 기분이에요."</p>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-6">
                <img src="https://picsum.photos/id/102/100/100" className="w-14 h-14 rounded-full" alt="Owner Avatar" />
                <div>
                  <div className="font-bold text-gray-900">식당 사장님 박OO님</div>
                  <div className="text-sm text-gray-400">지역 맛집 운영</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80" 
              className="rounded-[3rem] shadow-2xl object-cover h-[400px] w-full" 
              alt="성공적인 매장 마케팅 사례 시각화" 
            />
          </div>
        </div>
      </Section>

      {/* 9페이지: 우리의 가치 / 왜 반딧불인가? */}
      <Section className="bg-white">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4">우리가 제일 잘하는 이유</h2>
          <p className="text-gray-500 text-xl">기술력은 기본, 블로거의 마음을 이해합니다.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck />, title: "완벽한 안전성", desc: "네이버 로직을 거스르지 않는 자연스러운 구동" },
            { icon: <Users />, title: "진짜 유저 소통", desc: "유령 계정이 아닌 실제 활동 블로거 타겟팅" },
            { icon: <TrendingUp />, title: "실질적 지수 상승", desc: "단순 숫자가 아닌 검색 노출을 위한 최적화" },
            { icon: <Rocket />, title: "압도적 가성비", desc: "월 2만원으로 누리는 대행사 수준의 고품질 케어" }
          ].map((item, i) => (
            <div key={i} className="text-center p-8 border border-gray-50 rounded-[2.5rem] bg-gray-50 hover:bg-emerald-50 transition-colors group">
              <div className="w-16 h-16 bg-white text-gray-400 group-hover:bg-emerald-500 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transition-all">
                {item.icon}
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 10페이지: 최종 신청 및 업체 정보 */}
      <Section id="apply" className="bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        
        <div className="z-10 relative w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 italic tracking-tight">지금 바로 시작하세요</h2>
            <p className="text-xl opacity-60">월 2만원, 당신의 블로그가 브랜드가 됩니다.</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-50 ml-1">업체명 (또는 개인명)</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                    <input 
                      type="text" 
                      placeholder="(주)반딧불마케팅" 
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 ring-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-50 ml-1">연락처</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                    <input 
                      type="tel" 
                      placeholder="010-0000-0000" 
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 ring-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium opacity-50 ml-1">관리받을 블로그 주소</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                  <input 
                    type="text" 
                    placeholder="blog.naver.com/your_id" 
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 ring-emerald-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl text-xs text-gray-400 leading-relaxed border border-white/5">
                * 신청해 주시면 담당자가 순차적으로 연락을 드려 블로그 진단 및 관리 세부 내용을 안내해 드립니다. 개인정보는 상담 완료 후 즉시 파기됩니다.
              </div>

              <button className="w-full py-6 bg-gradient-to-r from-emerald-500 to-green-400 text-white text-2xl font-black rounded-2xl hover:shadow-emerald-500/40 hover:shadow-2xl transition-all flex items-center justify-center space-x-3">
                <span>월 2만원으로 성장 신청하기</span>
                <ArrowRight size={28} />
              </button>
            </form>

            {submitted && (
              <div className="mt-8 p-5 bg-emerald-500 text-white rounded-2xl text-center font-bold animate-pulse">
                🎉 신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.
              </div>
            )}
          </div>

          <div className="mt-24 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center text-sm opacity-40">
            <div className="mb-8 md:mb-0 space-y-2">
              <div className="font-black text-2xl mb-2 text-white/80">(주)반딧불마케팅</div>
              <p>서울특별시 강남구 테헤란로 123 ｜ 대표이사: 김철수 ｜ 사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 제 2024-서울강남-0000호</p>
            </div>
            <div className="flex flex-col md:text-right space-y-2">
              <span className="font-bold text-lg">고객지원센터: 1588-0000</span>
              <span>평일 09:00 - 18:00 (주말/공휴일 휴무)</span>
              <span>Email: help@bandibulmarketing.com</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default App;
