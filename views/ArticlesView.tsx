
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticlesViewProps {
  isAdmin: boolean;
  articles: Article[];
  onCreate: (a: Article) => void;
  onUpdate: (a: Article) => void;
  onDelete: (id: string) => void;
}

const ArticleModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (a: Article) => void;
  editArticle?: Article;
}> = ({ isOpen, onClose, onSave, editArticle }) => {
  const [formData, setFormData] = useState<Partial<Article>>(editArticle || {
    category: 'General',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    imageUrl: 'https://picsum.photos/seed/new/800/500'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-background-dark w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center">
          <h3 className="text-xl font-bold font-display">{editArticle ? 'Edit Article' : 'Create New Article'}</h3>
          <button onClick={onClose} className="material-symbols-outlined">close</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase opacity-50">Article Title</label>
            <input 
              className="w-full border-primary/10 rounded focus:ring-primary focus:border-primary dark:bg-zinc-800" 
              placeholder="Article Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase opacity-50">Topic / Category (Editable)</label>
            <input 
              className="w-full border-primary/10 rounded focus:ring-primary focus:border-primary dark:bg-zinc-800"
              placeholder="e.g. Criminal Law, Family Court"
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase opacity-50">Excerpt (Short Summary)</label>
            <textarea 
              className="w-full border-primary/10 rounded focus:ring-primary focus:border-primary dark:bg-zinc-800 h-24" 
              placeholder="Excerpt (short summary)"
              value={formData.excerpt || ''}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase opacity-50">Full Content</label>
            <textarea 
              className="w-full border-primary/10 rounded focus:ring-primary focus:border-primary dark:bg-zinc-800 h-40" 
              placeholder="Full Article Content (Markdown supported)"
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900 border-t border-primary/10 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold opacity-60 hover:opacity-100">Cancel</button>
          <button 
            onClick={() => {
              if (formData.title && formData.excerpt && formData.category) {
                onSave({
                  ...formData as Article,
                  id: editArticle?.id || Date.now().toString()
                });
                onClose();
              }
            }}
            className="bg-primary text-white px-6 py-2 rounded text-sm font-bold"
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
};

const ArticlesView: React.FC<ArticlesViewProps> = ({ isAdmin, articles, onCreate, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All Topics');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editArticle, setEditArticle] = useState<Article | undefined>();

  const dynamicCategories = useMemo(() => {
    const categories = new Set<string>();
    articles.forEach(a => categories.add(a.category));
    return ['All Topics', ...Array.from(categories).sort()];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All Topics' || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, activeCategory]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-4 leading-tight font-display">Legal Articles & Blog</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            A collection of educational insights, legislative analysis, and updates on specialized legal frameworks designed for clarity and awareness.
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => { setEditArticle(undefined); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition-opacity animate-in zoom-in duration-300"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span className="text-sm font-bold uppercase tracking-wider">Create New Article</span>
          </button>
        )}
      </div>

      <section className="mb-12 space-y-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="w-full bg-white dark:bg-gray-800 border-card-border dark:border-gray-700 rounded-none py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary focus:border-primary text-base font-light placeholder:text-gray-400" 
            placeholder="Search legal topics, case studies, or precedents..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-card-border dark:border-gray-700 pb-4">
          {dynamicCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors pb-3 -mb-[18px] border-b-2 ${activeCategory === cat ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredArticles.map(article => (
          <article key={article.id} className="flex flex-col bg-white dark:bg-gray-800 border border-card-border dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <Link to={`/articles/${article.id}`} className="block relative aspect-[16/10] overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: `url(${article.imageUrl})` }}
              ></div>
              {article.isFeatured && (
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-tighter px-2 py-1">Featured</div>
              )}
            </Link>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-brass">{article.category}</span>
                {isAdmin && (
                  <div className="flex gap-2 text-gray-400">
                    <button onClick={() => { setEditArticle(article); setIsModalOpen(true); }} className="hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => onDelete(article.id)} className="hover:text-red-600 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </div>
                )}
              </div>
              <Link to={`/articles/${article.id}`}>
                <h3 className="text-2xl font-bold mb-4 leading-snug font-display hover:text-primary transition-colors">{article.title}</h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <Link to={`/articles/${article.id}`} className="text-primary dark:text-accent-brass font-bold text-xs uppercase tracking-widest flex items-center gap-1 group">
                  Read Full Article 
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <span className="text-[10px] text-gray-400 uppercase font-medium">{article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="py-20 text-center opacity-40">
          <span className="material-symbols-outlined text-5xl mb-4">search_off</span>
          <p>No articles found matching your criteria.</p>
        </div>
      )}

      {isAdmin && (
        <ArticleModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={editArticle ? onUpdate : onCreate}
          editArticle={editArticle}
        />
      )}
    </div>
  );
};

export default ArticlesView;
