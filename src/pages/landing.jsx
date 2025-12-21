import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4 overflow-hidden bg-[#f8f5f5] dark:bg-[#2a1212] -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 md:-mt-10">
        {/* Abstract Background Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23800000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative z-10 max-w-[960px] w-full flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-4 max-w-[800px]">
            <h1 className="text-[#181010] dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Shorten Your Links,<br />
              <span className="text-[#800000]">Expand Your Movement.</span>
            </h1>
            <p className="text-[#5c4040] dark:text-gray-300 text-base md:text-lg font-normal leading-relaxed max-w-[640px] mx-auto">
              The official URL shortener for IMM FT UMJ. Track clicks, manage aliases, and share efficiently with your community.
            </p>
          </div>

          {/* URL Input Box */}
          <form 
            onSubmit={handleShorten}
            className="w-full max-w-[640px] bg-white dark:bg-[#230f0f] p-2 rounded-xl shadow-lg border border-[#e7dada] dark:border-[#4a2e2e] flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-3 h-12 sm:h-14">
              <span className="material-symbols-outlined text-[#8d5e5e] mr-3">link</span>
              <Input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="flex-1 bg-transparent border-none shadow-none p-0 text-[#181010] dark:text-white placeholder:text-[#8d5e5e] focus-visible:ring-0 text-base"
              />
            </div>
            <Button 
              type="submit"
              className="h-12 sm:h-auto sm:px-8 bg-[#800000] hover:bg-[#5e0000] text-white font-bold rounded-lg text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Shorten Now</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Button>
          </form>

          <p className="text-xs text-[#8d5e5e] font-medium flex items-center">
            <span className="material-symbols-outlined align-middle text-[14px] text-[#FFD700] mr-1">verified_user</span>
            Trusted by IMM FT UMJ members
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 -mx-4 sm:-mx-6 lg:-mx-8 bg-white dark:bg-[#230f0f]">
        <div className="max-w-[1080px] mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-[#181010] dark:text-white text-3xl font-bold tracking-tight">
              Why use IMM Link?
            </h2>
            <p className="text-[#5c4040] dark:text-gray-400">
              Designed for efficiency and reliability tailored for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#e7dada] dark:border-[#3a2020] bg-white dark:bg-[#2a1212] hover:shadow-lg hover:border-[#FFD700] transition-all duration-300">
              <div className="size-12 rounded-xl bg-[#800000]/10 flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition-colors text-[#800000]">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>bar_chart</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#181010] dark:text-white">Real-Time Analytics</h3>
                <p className="text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                  Gain insights into your audience with instant click-through rates and geographical data visualization.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#e7dada] dark:border-[#3a2020] bg-white dark:bg-[#2a1212] hover:shadow-lg hover:border-[#FFD700] transition-all duration-300">
              <div className="size-12 rounded-xl bg-[#800000]/10 flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition-colors text-[#800000]">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>edit</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#181010] dark:text-white">Custom Aliases</h3>
                <p className="text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                  Create memorable and branded links like <span className="text-[#800000] font-medium bg-[#800000]/5 px-1 rounded">imm.link/event2024</span> for better engagement.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#e7dada] dark:border-[#3a2020] bg-white dark:bg-[#2a1212] hover:shadow-lg hover:border-[#FFD700] transition-all duration-300">
              <div className="size-12 rounded-xl bg-[#800000]/10 flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition-colors text-[#800000]">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>qr_code_2</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#181010] dark:text-white">QR Code Generation</h3>
                <p className="text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                  Automatically generate high-res QR codes for your printed flyers, banners, and digital displays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 -mx-4 sm:-mx-6 lg:-mx-8 bg-[#f8f5f5] dark:bg-[#2a1212]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-8">
          <h2 className="text-[#181010] dark:text-white text-2xl font-bold tracking-tight text-center">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white dark:bg-[#230f0f] rounded-xl border border-[#e7dada] dark:border-[#3a2020] overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <span className="font-bold text-[#181010] dark:text-white">Is this service free for students?</span>
                <span className="material-symbols-outlined text-[#800000] transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-5 pb-5 text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                Yes, IMM Link is completely free for all IMM FT UMJ members. You just need to register with your account to access all features.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white dark:bg-[#230f0f] rounded-xl border border-[#e7dada] dark:border-[#3a2020] overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <span className="font-bold text-[#181010] dark:text-white">How long do the shortened links last?</span>
                <span className="material-symbols-outlined text-[#800000] transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-5 pb-5 text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                Links created by registered members are permanent as long as they comply with our usage policy. All links come with lifetime analytics.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white dark:bg-[#230f0f] rounded-xl border border-[#e7dada] dark:border-[#3a2020] overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <span className="font-bold text-[#181010] dark:text-white">Can I track clicks on my shortened links?</span>
                <span className="material-symbols-outlined text-[#800000] transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-5 pb-5 text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                Yes! Our dashboard provides detailed analytics including total clicks, device types (mobile, desktop, tablet), geographic location of visitors, and click trends over time.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white dark:bg-[#230f0f] rounded-xl border border-[#e7dada] dark:border-[#3a2020] overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <span className="font-bold text-[#181010] dark:text-white">Can I customize my short links?</span>
                <span className="material-symbols-outlined text-[#800000] transition-transform duration-300 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-5 pb-5 text-[#5c4040] dark:text-gray-400 text-sm leading-relaxed">
                Absolutely! You can create custom URLs that are easy to remember and relevant to your campaign. Simply enter your preferred custom alias when creating a new link.
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;