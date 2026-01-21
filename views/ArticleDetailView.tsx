
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Article } from '../types';

interface ArticleDetailViewProps {
  articles: Article[];
  isAdmin: boolean;
  onUpdate: (a: Article) => void;
  profileImageUrl: string;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ articles, isAdmin, onUpdate, profileImageUrl }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const article = articles.find(a => a.id === id);

  // Local state for editing to prevent immediate sync issues
  const [editData, setEditData] = useState<Article | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (article) {
      setEditData(article);
    }
  }, [article, isEditMode]);

  if (!article || !editData) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="mb-8">The requested article could not be located in our archives.</p>
        <Link to="/articles" className="bg-primary text-white px-6 py-3 rounded font-bold">
          Back to Articles
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate(editData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditData(article);
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col relative">
      {/* Article Header */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-12 z-10">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <Link to="/articles" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Insights
              </Link>
              
              {isAdmin && !isEditMode && (
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all"
                >
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                  Enable Edit Mode
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {isEditMode ? (
                <div className="flex flex-col gap-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Topic Name</label>
                   <input 
                    className="bg-black/50 text-accent-brass border-accent-brass/30 rounded px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] w-fit outline-none focus:ring-1 focus:ring-accent-brass"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    placeholder="Enter Category"
                  />
                </div>
              ) : (
                <span className="text-accent-brass font-bold uppercase tracking-[0.2em] text-xs">
                  {article.category}
                </span>
              )}

              {isEditMode ? (
                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Title</label>
                  <textarea
                    className="text-4xl md:text-6xl font-black text-white leading-tight font-display max-w-4xl bg-white/5 border border-white/20 rounded p-2 focus:ring-2 focus:ring-primary outline-none"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    rows={2}
                  />
                </div>
              ) : (
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-display max-w-4xl">
                  {article.title}
                </h1>
              )}

              <div className="flex items-center gap-6 mt-4 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                  {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">person</span>
                  By ADV. J. SAMUVEL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Action Bar (Sticky when editing) */}
      {isEditMode && (
        <div className="sticky top-20 z-50 bg-primary text-white py-4 px-6 shadow-2xl flex justify-center items-center gap-8 border-b border-white/10">
          <p className="text-xs font-bold uppercase tracking-widest hidden md:block">You are currently in edit mode</p>
          <div className="flex gap-4">
            <button 
              onClick={handleCancel}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-bold uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-white text-primary rounded text-xs font-bold uppercase tracking-widest transition-all hover:bg-background-light"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Article Content */}
      <section className="py-16 px-6 md:px-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-[800px] mx-auto">
          {/* Article Excerpt / Introduction */}
          <div className="mb-12">
            {isEditMode ? (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Excerpt (Summary)</label>
                <textarea
                  className="text-xl md:text-2xl font-display italic text-primary dark:text-accent-brass leading-relaxed bg-primary/5 dark:bg-white/5 border-l-4 border-primary p-6 rounded-r focus:ring-1 focus:ring-primary outline-none w-full"
                  value={editData.excerpt}
                  onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })}
                  rows={3}
                />
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-display italic text-primary dark:text-accent-brass leading-relaxed opacity-90 border-l-4 border-primary pl-6">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Main Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <div className="text-lg leading-loose font-serif text-gray-800 dark:text-gray-200">
              {isEditMode ? (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Full Content (Markdown Supported)</label>
                  <textarea
                    className="w-full text-lg leading-loose font-serif text-gray-800 dark:text-gray-200 bg-zinc-50 dark:bg-zinc-900 border border-primary/10 rounded p-6 focus:ring-2 focus:ring-primary outline-none min-h-[500px]"
                    value={editData.content}
                    onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  {article.content.split('\n').map((para, i) => (
                    para ? <p key={i} className="mb-6 whitespace-pre-wrap">{para}</p> : <br key={i} />
                  ))}
                  
                  <p>
                    As a legal practitioner based in Theni, I believe that clarity in judicial procedures is the cornerstone of justice. Whether dealing with property disputes or criminal proceedings, understanding the applicable laws ensures a fair path forward for all stakeholders.
                  </p>
                  
                  <blockquote className="my-10 p-8 bg-primary/5 dark:bg-white/5 border-l-4 border-primary italic font-display text-xl">
                    "Justice is not a destination, but a process that must be meticulously followed to ensure the integrity of the outcome."
                  </blockquote>
                  
                  <p>
                    Our chambers in Lakshmipuram continue to provide analytical support for clients navigating these complexities within the District Court framework.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-20 p-8 bg-zinc-50 dark:bg-zinc-900 border border-primary/10 rounded flex flex-col md:flex-row gap-8 items-center">
            <div 
              className="w-24 h-24 rounded-full bg-cover bg-center shrink-0 border-2 border-primary/20" 
              style={{ backgroundImage: `url('${profileImageUrl}')` }}
            ></div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold font-display mb-2">ADV. J. SAMUVEL BA., LL.B</h4>
              <p className="text-sm opacity-70 mb-4 leading-relaxed">
                Registered Advocate practicing at Theni District Court. Specialized in Civil and Criminal litigation with a commitment to professional integrity and client success.
              </p>
              <Link to="/contact" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline underline-offset-4">
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Reading */}
      {!isEditMode && (
        <section className="py-24 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold font-display mb-12 text-center">Related Legal Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.filter(a => a.id !== id).slice(0, 3).map(related => (
                <Link to={`/articles/${related.id}`} key={related.id} className="group bg-white dark:bg-background-dark border border-primary/5 hover:shadow-xl transition-all p-6 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent-brass mb-3">{related.category}</span>
                  <h4 className="text-lg font-bold mb-4 font-display group-hover:text-primary transition-colors">{related.title}</h4>
                  <p className="text-sm opacity-60 line-clamp-2 mb-6">{related.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase text-primary">
                    View Article <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticleDetailView;
