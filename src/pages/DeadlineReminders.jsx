import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Bell, 
  BellOff, 
  Clock, 
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DeadlineReminders({ currentLang }) {
  const t = translations[currentLang] || translations.en;
  
  const [reminders, setReminders] = useState([]);
  const [docName, setDocName] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [notes, setNotes] = useState('');
  const [notifPermission, setNotifPermission] = useState('default');

  // Load reminders on start
  useEffect(() => {
    const saved = localStorage.getItem('jan_sahayak_reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
    
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  // Save reminders
  const saveReminders = (list) => {
    setReminders(list);
    localStorage.setItem('jan_sahayak_reminders', JSON.stringify(list));
  };

  // Add reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!docName || !deadlineDate) return;

    const newItem = {
      id: Date.now().toString(),
      name: docName,
      date: deadlineDate,
      notes: notes
    };

    const updated = [...reminders, newItem].sort((a, b) => new Date(a.date) - new Date(b.date));
    saveReminders(updated);

    // Reset forms
    setDocName('');
    setDeadlineDate('');
    setNotes('');

    // Trigger simulated notification
    triggerSimulatedNotification(newItem.name, newItem.date);
  };

  const handleRemoveReminder = (id) => {
    const updated = reminders.filter(item => item.id !== id);
    saveReminders(updated);
  };

  // Notification setups
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotifPermission(permission);
        if (permission === 'granted') {
          new Notification("JanSahayak AI", {
            body: "Notifications active! We will alert you before deadlines.",
            icon: "/favicon.ico"
          });
        }
      });
    }
  };

  const triggerSimulatedNotification = (name, date) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification("Deadline Added!", {
        body: `JanSahayak Reminder: ${name} is set for ${date}.`,
        icon: "/favicon.ico"
      });
    }
  };

  // Calculate Urgency level (Red, Yellow, Green)
  const getUrgency = (targetDate) => {
    const today = new Date();
    const deadline = new Date(targetDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: "Expired", color: "bg-slate-100 text-slate-500 border-slate-200" };
    } else if (diffDays <= 7) {
      return { label: `Urgent! (${diffDays} Days Left)`, color: "bg-red-50 text-red-600 border-red-100 animate-pulse" };
    } else if (diffDays <= 30) {
      return { label: `Upcoming (${diffDays} Days)`, color: "bg-amber-50 text-amber-600 border-amber-100" };
    } else {
      return { label: `Safe (${diffDays} Days)`, color: "bg-green-50 text-green-600 border-green-100" };
    }
  };

  // Compose Google Calendar sync href URL
  const getGoogleCalendarLink = (item) => {
    const title = encodeURIComponent(`JanSahayak Reminder: ${item.name}`);
    const dateStr = item.date.replace(/\-/g, '');
    const dates = `${dateStr}/${dateStr}`; // all-day event
    const details = encodeURIComponent(item.notes || 'Reminder saved via JanSahayak AI.');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&sf=true&output=xml`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5">
          <CalendarIcon className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
          <span>{t.navReminders}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
          Log crucial timelines (such as passport expiry, CUET application closure). We will color-code them by urgency and simulate browser push notification triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Form Panel */}
        <div className="bg-white border border-slate-100 p-6 sm:p-7 rounded-3xl shadow-sm space-y-5 h-fit">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-800 border-b border-slate-50 pb-3 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-primary-blue" />
            <span>{t.addDeadline}</span>
          </h2>

          <form onSubmit={handleAddReminder} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
                Document / Exam Name:
              </label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g. Passport Renewal, CUET Form"
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
                Deadline Date (अंतिम तिथि):
              </label>
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">
                Notes / Requirements (Optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Pay ₹1,000 fine, upload matric Markshet"
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-blue text-white rounded-xl font-bold shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Reminder</span>
            </button>
          </form>

          {/* Browser Notifications Permissions Panel */}
          <div className="border-t border-slate-100 pt-4 text-xs space-y-3">
            <span className="block font-bold text-slate-400 uppercase tracking-wider text-[9px]">
              Notification Settings
            </span>
            <div className="flex items-start space-x-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-slate-500 leading-normal">
              {notifPermission === 'granted' ? (
                <>
                  <Bell className="w-4.5 h-4.5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-700">Notifications Enabled</span>
                    <span>We will push reminders to your desktop screen automatically!</span>
                  </div>
                </>
              ) : (
                <>
                  <BellOff className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-700">Notifications Inactive</span>
                    <button
                      onClick={requestNotificationPermission}
                      className="text-primary-blue font-bold underline hover:text-primary-blue-dark mt-1 block"
                    >
                      Enable Browser Notifications
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Deadlines List */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
            <span>{t.reminderAlert}</span>
            <span>{reminders.length} Active Items</span>
          </div>

          {reminders.length === 0 ? (
            /* Empty state */
            <div className="bg-white border border-slate-100 p-12 rounded-3xl shadow-sm text-center space-y-3">
              <div className="bg-slate-50 text-slate-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-slate-100">
                <Clock className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                No Timelines Logged Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
                Log expiry and entrance dates in the form on the left. We will keep you updated.
              </p>
            </div>
          ) : (
            /* Reminders mappings */
            <div className="space-y-4">
              {reminders.map((item) => {
                const urgency = getUrgency(item.date);
                return (
                  <div 
                    key={item.id}
                    className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-slate-200 transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-2 items-center">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                          {item.name}
                        </h3>
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${urgency.color}`}>
                          {urgency.label}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate-500 font-semibold flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {item.date}</span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-400 italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      
                      {/* Google Calendar export */}
                      <a
                        href={getGoogleCalendarLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow sm:flex-grow-0 p-2 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-primary-blue rounded-xl border border-slate-100 hover:border-blue-100 shadow-sm transition flex items-center justify-center space-x-1 text-xs font-bold"
                        title="Add to Google Calendar"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="sm:hidden">Add Calendar</span>
                      </a>

                      {/* Remove reminder */}
                      <button
                        onClick={() => handleRemoveReminder(item.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-100 hover:scale-105 shadow-sm transition"
                        title="Delete reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
