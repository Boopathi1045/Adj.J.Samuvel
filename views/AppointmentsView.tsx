
import React, { useState, useMemo } from 'react';
import { Appointment, AppointmentStatus } from '../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onDelete: (id: string) => void;
}

const AppointmentsView: React.FC<AppointmentsViewProps> = ({ 
  appointments, 
  onUpdateStatus, 
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All');

  const filtered = useMemo(() => {
    return appointments.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this record?')) {
      onDelete(id);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold font-display">Chamber Schedule</h2>
          <p className="opacity-60">Manage your consultation leads from the cloud database.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 px-4 py-2 rounded text-primary font-bold">Total Appointments: {appointments.length}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase opacity-50">Filter Status</p>
            {['All', ...Object.values(AppointmentStatus)].map(s => (
              <button key={s} onClick={() => setStatusFilter(s as any)} className={`text-left px-4 py-2 rounded text-sm font-bold border transition-all ${statusFilter === s ? 'bg-primary text-white border-primary shadow-md' : 'bg-white dark:bg-zinc-900 border-primary/10'}`}>{s}</button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase opacity-50">Search Directory</p>
            <input type="text" placeholder="Name or Phone..." className="w-full rounded border-primary/10 text-sm dark:bg-zinc-900" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="p-6 bg-zinc-50 dark:bg-white/5 rounded-sm border border-primary/5">
             <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-40">Admin Notice</h4>
             <p className="text-[11px] leading-relaxed opacity-60 italic">These records are fetched live from your encrypted cloud storage. Ensure you follow up with clients within 24 hours.</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {filtered.length > 0 ? filtered.map(a => (
            <div key={a.id} className="bg-white dark:bg-zinc-900 border border-primary/10 p-6 rounded shadow-sm hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">{a.bookedDate} @ {a.bookedSlot}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${a.status === AppointmentStatus.PENDING ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span>
                </div>
                <h3 className="text-xl font-bold font-display">{a.name}</h3>
                <p className="text-sm opacity-60">Phone: {a.phone}</p>
                <p className="text-sm italic opacity-80 border-l-2 border-primary/20 pl-4">"{a.purpose}"</p>
              </div>
              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                <button onClick={() => onUpdateStatus(a.id, a.status === AppointmentStatus.PENDING ? AppointmentStatus.CONTACTED : AppointmentStatus.PENDING)} className="flex-1 text-[10px] font-bold uppercase bg-primary text-white px-4 py-2 rounded">{a.status === AppointmentStatus.PENDING ? 'Mark Followed Up' : 'Re-open'}</button>
                <button onClick={() => handleDelete(a.id)} className="flex-1 text-[10px] font-bold uppercase border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">Delete</button>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-white/5 opacity-40">
              <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
              <p>No records found for this view.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;
