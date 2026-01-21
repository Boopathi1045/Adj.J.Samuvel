
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '../types';

interface ContactViewProps {
  onSubmit: (appt: Appointment) => Promise<void>;
  appointments: Appointment[];
}

const ALL_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ContactView: React.FC<ContactViewProps> = ({ onSubmit, appointments }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', purpose: '' });
  const [bookedDate, setBookedDate] = useState('');
  const [bookedSlot, setBookedSlot] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const viewYear = currentViewDate.getFullYear();
  const viewMonth = currentViewDate.getMonth();

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(viewYear, viewMonth, i));
    return days;
  }, [viewYear, viewMonth, firstDayOfMonth, daysInMonth]);

  const changeMonth = (offset: number) => {
    setCurrentViewDate(new Date(viewYear, viewMonth + offset, 1));
  };

  const occupiedSlotsForDate = useMemo(() => {
    if (!bookedDate) return [];
    return appointments
      .filter(a => a.bookedDate === bookedDate)
      .map(a => a.bookedSlot);
  }, [bookedDate, appointments]);

  const handleDateSelect = (date: Date) => {
    if (date < today) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setBookedDate(`${year}-${month}-${day}`);
    setBookedSlot(''); 
    setIsCalendarOpen(false);
    setSubmissionError('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !bookedDate || !bookedSlot || isSubmitting) return;

    // Double check if slot is already occupied locally before sending request
    if (occupiedSlotsForDate.includes(bookedSlot)) {
      setSubmissionError("This slot was just taken. Please select another time.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError('');

    const newAppt: Appointment = {
      id: '', 
      name: formData.name,
      phone: formData.phone,
      purpose: formData.purpose,
      createdAt: new Date().toISOString(),
      bookedDate,
      bookedSlot,
      status: AppointmentStatus.PENDING
    };

    try {
      await onSubmit(newAppt);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', purpose: '' });
      setBookedDate('');
      setBookedSlot('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      setSubmissionError(err.message || "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedSelectedDate = bookedDate 
    ? new Date(bookedDate + "T00:00:00").toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
    : 'Select Consultation Date';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-[#fbf8f4]/95 dark:bg-[#1a1f1d]/95"></div>
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-20 lg:py-28">
        <div className="mb-16">
          <h1 className="text-5xl font-black font-display text-primary dark:text-white mb-4">Get in Touch</h1>
          <p className="text-[#4a5a54] dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Consultation for Civil, Criminal, and Court matters. Visit our office in Theni or reach out via phone.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900/90 p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5 relative">
              {isSuccess && (
                <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center text-white p-8 z-50 text-center animate-in fade-in duration-300">
                  <span className="material-symbols-outlined text-5xl mb-4">check_circle</span>
                  <h3 className="text-xl font-bold font-display">Slot Reserved</h3>
                  <p className="opacity-80 text-sm mt-2">Your 30-minute session is blocked. We will follow up shortly.</p>
                </div>
              )}

              <div className="flex items-center gap-3 mb-10 text-primary dark:text-gray-300">
                <span className="material-symbols-outlined">mail</span>
                <h3 className="text-2xl font-display font-bold">Request Appointment</h3>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {submissionError && (
                  <div className="p-4 bg-red-50 text-red-600 border-l-4 border-red-500 text-sm font-bold animate-in slide-in-from-top-2">
                    {submissionError}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-primary/60 dark:text-gray-400">Full Name</label>
                    <input 
                      required
                      className="w-full bg-[#f9f7f4] dark:bg-zinc-800 border-none focus:ring-1 focus:ring-primary h-14 px-4 text-sm dark:text-white" 
                      placeholder="Enter your name" 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-primary/60 dark:text-gray-400">Contact Number</label>
                    <input 
                      required
                      className="w-full bg-[#f9f7f4] dark:bg-zinc-800 border-none focus:ring-1 focus:ring-primary h-14 px-4 text-sm dark:text-white" 
                      placeholder="Phone number" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 relative" ref={calendarRef}>
                  <label className="text-[11px] font-black uppercase tracking-widest text-primary/60 dark:text-gray-400">1. Select Consultation Date</label>
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className={`w-full flex items-center justify-between bg-[#f9f7f4] dark:bg-zinc-800 border-none h-14 px-4 text-sm transition-all ${isCalendarOpen ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${bookedDate ? 'text-primary' : 'text-gray-400'}`}>event</span>
                      <span className={bookedDate ? 'text-primary dark:text-white font-bold' : 'text-gray-400 font-normal'}>
                        {formattedSelectedDate}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">expand_more</span>
                  </button>

                  {isCalendarOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full z-[100] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between p-4 bg-primary text-white">
                        <button type="button" onClick={() => changeMonth(-1)} className="material-symbols-outlined">chevron_left</button>
                        <h4 className="font-bold uppercase tracking-widest text-xs">{MONTHS[viewMonth]} {viewYear}</h4>
                        <button type="button" onClick={() => changeMonth(1)} className="material-symbols-outlined">chevron_right</button>
                      </div>
                      <div className="grid grid-cols-7 border-b border-gray-50 dark:border-white/5">
                        {DAYS_OF_WEEK.map(day => <div key={day} className="py-2 text-center text-[9px] font-black uppercase tracking-widest opacity-40">{day}</div>)}
                      </div>
                      <div className="grid grid-cols-7 p-2">
                        {calendarDays.map((date, idx) => {
                          if (!date) return <div key={`empty-${idx}`} className="h-10" />;
                          const isPast = date < today;
                          const dStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                          const isSelected = dStr === bookedDate;
                          return (
                            <button
                              key={dStr}
                              type="button"
                              disabled={isPast}
                              onClick={() => handleDateSelect(date)}
                              className={`h-10 flex items-center justify-center text-xs font-bold transition-all ${isPast ? 'opacity-10' : 'hover:bg-primary/5 dark:hover:bg-white/5'} ${isSelected ? 'bg-primary text-white' : 'dark:text-white'}`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {bookedDate && (
                  <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[11px] font-black uppercase tracking-widest text-primary/60 dark:text-gray-400">2. Select 30-Minute Slot</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {ALL_SLOTS.map(slot => {
                        const isOccupied = occupiedSlotsForDate.includes(slot);
                        const isSelected = bookedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isOccupied || isSubmitting}
                            onClick={() => { setBookedSlot(slot); setSubmissionError(''); }}
                            className={`py-3 px-2 text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                              isOccupied 
                              ? 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through' 
                              : isSelected
                              ? 'bg-primary text-white scale-105 shadow-md'
                              : 'bg-[#f9f7f4] dark:bg-white/5 text-primary dark:text-gray-300 border border-transparent hover:border-primary/20'
                            }`}
                          >
                            {slot}
                            {isOccupied && <span className="text-[8px] font-black opacity-50 uppercase">Booked</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <textarea 
                    className="w-full bg-[#f9f7f4] dark:bg-zinc-800 border-none focus:ring-1 focus:ring-primary min-h-40 p-4 text-sm dark:text-white" 
                    placeholder="Briefly explain your legal requirement..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  ></textarea>
                </div>

                <div className="pt-4 space-y-6">
                  <button 
                    disabled={!bookedDate || !bookedSlot || isSubmitting}
                    className={`px-10 h-14 font-bold flex items-center justify-center gap-2 transition-all ${(!bookedDate || !bookedSlot || isSubmitting) ? 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90 active:scale-[0.98] shadow-lg shadow-primary/20'}`} 
                    type="submit"
                  >
                    {isSubmitting ? 'Confirming Slot...' : 'Submit Request'}
                    {!isSubmitting && <span className="material-symbols-outlined text-lg">double_arrow</span>}
                  </button>
                  <p className="text-[10px] italic text-primary/40 dark:text-gray-500 leading-relaxed">
                    Disclaimer: Form submission is for scheduling purposes and does not establish an immediate attorney-client relationship.
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">domain</span>
                <h3 className="text-xl font-display font-bold text-primary dark:text-white">Contact Information</h3>
              </div>
              <div className="h-px w-full bg-primary/20 mb-8"></div>
              <div className="space-y-10">
                <div className="flex gap-5">
                  <span className="material-symbols-outlined text-gray-400 mt-1">person</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Advocate</p>
                    <p className="text-base font-bold text-primary dark:text-white">J. Samuvel BA., LL.B</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="material-symbols-outlined text-gray-400 mt-1">call</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Mobile Number</p>
                    <p className="text-base font-bold text-primary dark:text-white">+91 9080485223</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="material-symbols-outlined text-gray-400 mt-1">domain</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Office Address</p>
                    <p className="text-base font-bold text-primary dark:text-white leading-relaxed">No.06, MM Complex,<br />Near District Court Lakshmipuram,<br />Theni - 625523</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="material-symbols-outlined text-gray-400 mt-1">home</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Residence</p>
                    <p className="text-base font-bold text-primary dark:text-white">Parasuramapuram, Batlagundu.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">share</span>
                <h3 className="text-2xl font-display font-bold text-primary dark:text-white">Social Presence</h3>
              </div>
              <div className="h-px w-full bg-primary/20 mb-10"></div>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/samuvel-j-5346163a6/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm transition-transform hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <span className="text-[13px] font-black uppercase tracking-widest text-primary dark:text-white">LinkedIn</span>
                </a>
                <a href="https://wa.me/919080485223" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 border-2 border-primary flex items-center justify-center rounded-full transition-transform hover:scale-110">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <span className="text-[13px] font-black uppercase tracking-widest text-primary dark:text-white">WhatsApp</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
