
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import HomeView from './views/HomeView';
import AchievementsView from './views/AchievementsView';
import ArticlesView from './views/ArticlesView';
import ArticleDetailView from './views/ArticleDetailView';
import ContactView from './views/ContactView';
import AppointmentsView from './views/AppointmentsView';
import AdminLoginView from './views/AdminLoginView';
import { Article, Appointment, AppointmentStatus } from './types';

// ==========================================
// STATIC CONFIGURATION
// Everything here is static. Change this URL to update your profile image.
// ==========================================
const STATIC_PROFILE_IMAGE = 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800';

const DisclaimerModal: React.FC<{ onAgree: () => void }> = ({ onAgree }) => {
  const handleDisagree = () => { window.location.href = "https://www.google.com"; };
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background-dark/98 backdrop-blur-3xl">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-primary/20 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-700">
        <div className="px-8 py-6 border-b border-primary/10 bg-primary/5">
          <h2 className="text-2xl font-bold font-display text-primary dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined">gavel</span>Legal Disclaimer
          </h2>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="font-bold text-primary dark:text-accent-brass uppercase tracking-widest text-[10px]">Mandatory Regulatory Compliance</p>
            <p className="font-medium">The rules of the Bar Council of India do not permit advertisement or solicitation by Advocates in any form or manner.</p>
            <p>This website and the contents thereof are merely for informational purposes and not in the nature of solicitation or an advertisement. Similarly, any matter / information / content posted by <span className="font-bold">Adv.J.Samuvel</span> on this website shall not be construed as legal advice.</p>
            <p><span className="font-bold">Adv.J.Samuvel</span> takes no liability for consequences of any action taken by you relying on the matter / information / content posted on this website.</p>
            <p>By entering this website, you confirm and acknowledge that you have voluntarily sought the information relating to and/or posted by <span className="font-bold">Adv.J.Samuvel</span> and there has been no solicitation / advertisement / inducement by either <span className="font-bold">Adv.J.Samuvel</span> and/or its partners and/or its members.</p>
          </div>
        </div>
        <div className="p-8 border-t border-primary/10 bg-primary/5 flex flex-col sm:flex-row gap-4">
          <button onClick={handleDisagree} className="flex-1 px-6 py-4 border border-primary/20 text-primary dark:text-white font-bold uppercase tracking-widest text-[10px] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">I Disagree</button>
          <button onClick={onAgree} className="flex-1 px-6 py-4 bg-primary text-white font-bold uppercase tracking-widest text-[10px] hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">I Agree & Proceed</button>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ isAdmin: boolean; onLogout: () => void; pendingCount: number; }> = ({ isAdmin, onLogout, pendingCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-6 md:px-20 py-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-primary dark:text-[#ecefed]">
          <span className="material-symbols-outlined text-3xl">gavel</span>
          <h2 className="text-lg font-bold font-display leading-tight tracking-tight">Adv.J.Samuvel</h2>
        </Link>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : ''}`}>Profile</Link>
            <Link to="/achievements" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/achievements') ? 'text-primary' : ''}`}>Achievements</Link>
            <Link to="/articles" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/articles') ? 'text-primary' : ''}`}>Articles</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : ''}`}>Contact</Link>
            {isAdmin && (
               <Link to="/admin/appointments" className={`text-sm font-medium relative transition-colors hover:text-primary ${isActive('/admin/appointments') ? 'text-primary' : ''}`}>
                 Dashboard {pendingCount > 0 && <span className="ml-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[8px] font-bold">{pendingCount}</span>}
               </Link>
            )}
          </nav>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button onClick={onLogout} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 rounded hover:bg-primary/5 transition-colors">Logout</button>
            )}
            <Link to="/contact" className="hidden xs:flex items-center justify-center rounded bg-primary text-white text-sm font-bold h-10 px-5 transition-transform hover:scale-[1.02] shadow-lg shadow-primary/20">
              Consult Now
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex items-center justify-center w-10 h-10 text-primary">
              <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-primary/10 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-200">
          <Link to="/" className={`text-lg font-bold font-display ${isActive('/') ? 'text-primary' : 'opacity-70'}`}>Profile</Link>
          <Link to="/achievements" className={`text-lg font-bold font-display ${isActive('/achievements') ? 'text-primary' : 'opacity-70'}`}>Achievements</Link>
          <Link to="/articles" className={`text-lg font-bold font-display ${isActive('/articles') ? 'text-primary' : 'opacity-70'}`}>Articles</Link>
          <Link to="/contact" className={`text-lg font-bold font-display ${isActive('/contact') ? 'text-primary' : 'opacity-70'}`}>Contact</Link>
          {isAdmin && (
            <Link to="/admin/appointments" className={`text-lg font-bold font-display ${isActive('/admin/appointments') ? 'text-primary' : 'opacity-70'}`}>
              Dashboard ({pendingCount})
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

const App: React.FC = () => {
  // Set to false initially on every refresh
  const [hasAgreedDisclaimer, setHasAgreedDisclaimer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial Data Fetch
    fetchArticles();
    fetchAppointments();
    
    // Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (error) console.error("Fetch Articles Error:", error);
    else if (data) setArticles(data.map(item => ({ ...item, imageUrl: item.image_url, isFeatured: item.is_featured })));
  };

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from('appointments').select('*').order('booked_date', { ascending: true });
    if (error) console.error("Fetch Appointments Error:", error);
    else if (data) setAppointments(data.map(item => ({ ...item, bookedDate: item.booked_date, bookedSlot: item.booked_slot, createdAt: item.created_at })));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate('/');
  };

  const handleCreateArticle = async (article: Article) => {
    const payload = { title: article.title, excerpt: article.excerpt, content: article.content, category: article.category, date: article.date, image_url: article.imageUrl, is_featured: article.isFeatured };
    const { error } = await supabase.from('articles').insert([payload]);
    if (!error) fetchArticles();
  };

  const handleUpdateArticle = async (updated: Article) => {
    const payload = { title: updated.title, excerpt: updated.excerpt, content: updated.content, category: updated.category, date: updated.date, image_url: updated.imageUrl, is_featured: updated.isFeatured };
    const { error } = await supabase.from('articles').update(payload).eq('id', updated.id);
    if (!error) fetchArticles();
  };

  const handleDeleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (!error) fetchArticles();
  };

  const handleNewAppointment = async (appt: Appointment) => {
    const payload = { name: appt.name, phone: appt.phone, purpose: appt.purpose, booked_date: appt.bookedDate, booked_slot: appt.bookedSlot, status: appt.status, created_at: appt.createdAt };
    const { error } = await supabase.from('appointments').insert([payload]);
    if (error) throw new Error(error.code === '23505' ? "This slot has just been booked." : error.message);
    fetchAppointments();
  };

  const handleUpdateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (!error) fetchAppointments();
  };

  const handleDeleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (!error) fetchAppointments();
  };

  const handleAgree = () => {
    setHasAgreedDisclaimer(true);
    // After agreeing, always force navigation to the Profile (Home) page
    navigate('/');
  };

  // IF USER HAS NOT AGREED: Render ONLY the disclaimer
  if (!hasAgreedDisclaimer) {
    return <DisclaimerModal onAgree={handleAgree} />;
  }

  // IF USER HAS AGREED: Render full App (Header, Routes, Profile Page, etc.)
  const pendingCount = appointments.filter(a => a.status === AppointmentStatus.PENDING).length;

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-1000">
      <Header isAdmin={isAdmin} onLogout={handleLogout} pendingCount={pendingCount} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView profileImageUrl={STATIC_PROFILE_IMAGE} />} />
          <Route path="/achievements" element={<AchievementsView profileImageUrl={STATIC_PROFILE_IMAGE} />} />
          <Route path="/articles" element={<ArticlesView isAdmin={isAdmin} articles={articles} onCreate={handleCreateArticle} onUpdate={handleUpdateArticle} onDelete={handleDeleteArticle} />} />
          <Route path="/articles/:id" element={<ArticleDetailView articles={articles} isAdmin={isAdmin} onUpdate={handleUpdateArticle} profileImageUrl={STATIC_PROFILE_IMAGE} />} />
          <Route path="/contact" element={<ContactView onSubmit={handleNewAppointment} appointments={appointments} />} />
          <Route path="/staff-access" element={isAdmin ? <Navigate to="/admin/appointments" replace /> : <AdminLoginView />} />
          {isAdmin && (
            <Route path="/admin/appointments" element={<AppointmentsView appointments={appointments} onUpdateStatus={handleUpdateAppointmentStatus} onDelete={handleDeleteAppointment} />} />
          )}
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <a href="https://wa.me/919080485223" target="_blank" className="fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
};

export default App;
