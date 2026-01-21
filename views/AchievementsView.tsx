
import React from 'react';
import { Link } from 'react-router-dom';
import { MILESTONES } from '../constants';
import ProfileImg from '../assets/profile.jpeg';

interface AchievementsViewProps {
  profileImageUrl: string;
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ profileImageUrl }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-[#fbf8f4]/95 dark:bg-[#1a1f1d]/95 transition-colors"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center py-12 px-6 md:px-20">
        <div className="max-w-[1200px] w-full">
          {/* Hero Section */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl rotate-2 transition-transform group-hover:rotate-0"></div>
                <div className="relative aspect-[4/3] bg-primary/5 rounded-sm overflow-hidden border border-primary/10 shadow-2xl">
                  <div 
                    className="w-full h-full bg-center bg-cover transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${profileImageUrl}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent-brass text-white p-6 rounded-sm shadow-xl hidden lg:block">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary dark:text-accent-brass">
                    <span className="h-[1px] w-8 bg-current opacity-50"></span>
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Professional Journey</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight dark:text-white font-display">
                    Growth & Achievement
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-gray-400 font-normal leading-relaxed italic">
                    "Excellence is not an act, but a habit. Each milestone represents a commitment to the highest standards of the legal profession."
                  </p>
                  <p className="text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                    Proven success across complex legal challenges through dedicated practice and meticulous legal research. Focused on delivering strategic solutions within the District and High Court jurisdictions.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-20 text-center" id="timeline">
            <span className="text-accent-brass font-bold uppercase tracking-[0.4em] text-xs mb-4 block">The Road So Far</span>
            <h2 className="text-4xl font-bold tracking-tight mb-4 font-display">Career Milestones</h2>
            <div className="w-12 h-1 bg-primary mx-auto opacity-30 rounded-full"></div>
          </div>

          {/* Vertical Timeline Layout */}
          <div className="relative timeline-line space-y-16 mb-32 max-w-4xl mx-auto">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className={`relative flex items-center justify-between w-full group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[45%]"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-800 text-primary border-4 border-primary/20 rounded-full shadow-2xl transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-lg">{m.icon}</span>
                </div>
                <div className="w-[85%] md:w-[45%] bg-white dark:bg-zinc-900 p-8 rounded-sm border border-primary/5 shadow-sm transition-all group-hover:shadow-2xl group-hover:border-primary/20 relative">
                  <div className={`absolute top-0 ${idx % 2 === 0 ? 'left-0 md:left-auto md:right-0' : 'left-0'} -translate-y-1/2 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-sm`}>
                    {m.year}
                  </div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-[10px] text-accent-brass font-bold uppercase tracking-[0.2em]">{m.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-display">{m.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bio Card */}
          <div className="p-12 md:p-16 bg-background-dark text-white rounded-sm relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-32 h-32 rounded-full border-4 border-white/10 shrink-0 bg-center bg-cover shadow-2xl" style={{ backgroundImage: `url('${ProfileImg}')` }}></div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold font-display mb-4">Dedicated to the Bar</h3>
                <p className="text-lg opacity-70 max-w-2xl mb-8">
                  ADV. J. SAMUVEL is committed to providing unwavering advocacy and sound legal counsel. With roots in Theni, he brings local understanding combined with high-level professional standards.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-sm font-bold transition-all hover:bg-primary hover:text-white">
                  Contact for Counsel
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsView;
