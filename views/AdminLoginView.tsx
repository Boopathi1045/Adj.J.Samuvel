
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminLoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin/appointments');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md shadow-2xl border border-primary/10 overflow-hidden">
        <div className="bg-primary px-8 py-6 text-white">
          <h2 className="text-2xl font-bold font-display flex items-center gap-3">
            <span className="material-symbols-outlined">verified_user</span>
            Staff Gateway
          </h2>
          <p className="text-xs opacity-70 mt-1 uppercase tracking-widest font-bold">Confidential Access Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Administrator Email</label>
            <input 
              required
              type="email" 
              className="w-full h-12 bg-gray-50 dark:bg-zinc-800 border-primary/10 rounded focus:ring-primary focus:border-primary px-4 transition-all" 
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Secure Password</label>
            <input 
              required
              type="password" 
              className="w-full h-12 bg-gray-50 dark:bg-zinc-800 border-primary/10 rounded focus:ring-primary focus:border-primary px-4 transition-all" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 animate-in fade-in duration-300">
              <p className="text-xs text-red-600 dark:text-red-400 font-bold">{error}</p>
            </div>
          )}
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-primary text-white h-14 rounded font-bold uppercase tracking-widest text-sm hover:opacity-95 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authorize Access'}
          </button>
        </form>
        
        <div className="px-8 pb-8 text-center">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          >
            Return to Public Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginView;
