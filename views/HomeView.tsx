
import React from 'react';
import { PRACTICE_AREAS } from '../constants';
import { Link } from 'react-router-dom';
import ProfileImg from '../assets/Profile.jpeg';

interface HomeViewProps {
  profileImageUrl: string;
}

const HomeView: React.FC<HomeViewProps> = ({ profileImageUrl }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-12 md:py-24 px-6 md:px-20 min-h-[85vh] overflow-hidden">
        {/* Blurred Bookshelf Background for high-end look */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000')" }}
        ></div>
        <div className="absolute inset-0 z-10 hero-overlay opacity-90 dark:opacity-95"></div>
        
        <div className="max-w-[1200px] w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-primary dark:text-accent-brass mb-2">
                  <span className="h-[1px] w-12 bg-current opacity-50"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">Dedicated Legal Advocacy</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight text-primary dark:text-white font-display">
                  Adv. J. Samuvel
                </h1>
                <p className="text-xl md:text-2xl font-display italic text-[#4a5a54] dark:text-accent-brass/80">
                  BA., LL.B Advocate & Legal Consultant
                </p>
                <div className="h-1.5 w-24 bg-primary dark:bg-accent-brass rounded-full my-2"></div>
                <h2 className="text-lg md:text-xl font-normal leading-relaxed max-w-lg text-[#2d3632] dark:text-gray-200 opacity-90">
                  Providing reliable and ethical legal counsel in Theni District Court. Specialized in navigating complex Civil, Criminal, and Property matters with dedication.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-sm h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:-translate-y-1 shadow-xl shadow-primary/20">
                  Book Consultation
                </Link>
                <Link to="/articles" className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-sm h-14 px-8 border-2 border-primary text-primary dark:text-white dark:border-white/20 text-base font-bold transition-all hover:bg-primary/5 hover:-translate-y-1">
                  Legal Insights
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group max-w-md w-full">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-t-4 border-r-4 border-accent-brass/40 rounded-tr-3xl hidden md:block"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-primary/40 rounded-bl-3xl hidden md:block"></div>
                
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl rotate-3 transition-transform group-hover:rotate-0"></div>
                
                <div 
                  className="relative w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-zinc-900 transition-transform duration-500 group-hover:scale-[1.02]" 
                  style={{ backgroundImage: `url('${ProfileImg}')` }}
                >
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-primary/10 hidden md:block rounded-sm transform transition-transform group-hover:translate-y-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-primary dark:text-accent-brass font-black text-2xl font-display">High Court</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Bar Affiliate</p>
                    <div className="h-px w-full bg-primary/10 my-2"></div>
                    <p className="text-xs font-medium italic opacity-80">"Justice Through Integrity"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-zinc-900/50 py-16 px-6 md:px-20 border-y border-primary/10 dark:border-white/5 relative z-30">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Credentials</p>
                <p className="text-xl font-bold font-display mb-2">Registered Advocate</p>
                <p className="text-sm opacity-60 leading-relaxed">Active member of the Bar Council with a commitment to professional growth.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Jurisdiction</p>
                <p className="text-xl font-bold font-display mb-2">Theni District Court</p>
                <p className="text-sm opacity-60 leading-relaxed">Providing local expertise with fresh perspectives in the regional judicial circle.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">gavel</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Core Values</p>
                <p className="text-xl font-bold font-display mb-2">Ethical Advocacy</p>
                <p className="text-sm opacity-60 leading-relaxed">Meticulous research and a result-oriented approach for every case.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Focus Areas */}
      <section className="py-32 px-6 md:px-20 relative bg-background-light dark:bg-background-dark">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent-brass font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Specialized Domain Expertise</span>
              <h2 className="text-5xl font-bold font-display mb-6">Expert Legal Verticals</h2>
              <p className="text-lg opacity-70 leading-relaxed">Our practice is built upon focused expertise in key judicial sectors. We ensure every case is handled by domain specialists dedicated to providing precise and ethical representation in their respective categories.</p>
            </div>
            <Link to="/articles" className="group text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
              Explore Legal Insights <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRACTICE_AREAS.map((area, idx) => (
              <div key={idx} className="flex flex-col group cursor-pointer bg-white dark:bg-zinc-900/40 border border-primary/5 hover:border-primary/30 transition-all shadow-sm hover:shadow-2xl rounded-sm overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/0 transition-colors z-10 flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-xs">Consult Expert</span>
                  </div>
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${area.imageUrl})` }}
                  ></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Expert Domain</span>
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{area.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 md:px-20 bg-background-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000')" }}></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 md:p-20 rounded-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 text-center lg:text-left">
                <span className="text-accent-brass font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Schedule a Meeting</span>
                <h2 className="text-5xl md:text-6xl font-bold font-display mb-8">Professional Counsel is just a step away.</h2>
                <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto lg:mx-0">Empower yourself with precise legal knowledge and dedicated representation. Our chambers in Lakshmipuram are open for consultation.</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <Link to="/contact" className="bg-primary hover:bg-white hover:text-primary text-white px-10 py-5 rounded-sm font-bold text-lg transition-all flex items-center gap-3 shadow-2xl">
                    <span className="material-symbols-outlined">calendar_today</span>
                    Request Appointment
                  </Link>
                  <a href="tel:+919080485223" className="flex items-center gap-4 px-8 py-5 border border-white/20 rounded-sm hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-accent-brass">call</span>
                    <span className="text-xl font-bold">+91 9080485223</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
