import { useState, useEffect, useRef, useCallback } from 'react';
import { addDays, subDays, format } from 'date-fns';
import { getAllData } from './utils/storage';
import { getStreakCount, formatDate } from './utils/helpers';
import BottomNav from './components/BottomNav';
import LoginScreen from './components/LoginScreen';
import TodayPage from './pages/TodayPage';
import WorkoutPage from './pages/WorkoutPage';
import ProgressPage from './pages/ProgressPage';
import WeekPage from './pages/WeekPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const [authed, setAuthed] = useState(localStorage.getItem('ft_auth') === 'true');
  const [activeTab, setActiveTab] = useState('today');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [slideDir, setSlideDir] = useState(null);
  const touchStartX = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    loadStreak();
    scheduleNotifications();
  }, []);

  useEffect(() => {
    if (activeTab === 'today') loadStreak();
  }, [activeTab, currentDate]);

  async function loadStreak() {
    const allDays = await getAllData('days');
    setStreak(getStreakCount(allDays));
  }

  function scheduleNotifications() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const times = [
      { hour: 7, min: 35, msg: 'Time for Meal 1 + Supplements!' },
      { hour: 12, min: 0, msg: 'Time for Meal 2!' },
      { hour: 18, min: 0, msg: 'Time for Meal 3!' },
      { hour: 22, min: 0, msg: 'Time for Meal 4!' },
      { hour: 22, min: 30, msg: 'Wind down - bed in 30 min!' },
    ];
    const now = new Date();
    times.forEach(({ hour, min, msg }) => {
      const target = new Date();
      target.setHours(hour, min, 0, 0);
      const delay = target.getTime() - now.getTime();
      if (delay > 0) {
        setTimeout(() => {
          new Notification('Fitness Tracker', { body: msg, icon: '/icon-192.png' });
        }, delay);
      }
    });
  }

  const navigateDate = useCallback((dir) => {
    setSlideDir(dir);
    setTimeout(() => {
      setCurrentDate((d) => dir === 'next' ? addDays(d, 1) : subDays(d, 1));
      setSlideDir(null);
    }, 150);
  }, []);

  // Swipe gestures for date navigation
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) {
      navigateDate(dx < 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
  }, [navigateDate]);

  const isToday = formatDate(currentDate) === formatDate(new Date());

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="header-arrow" onClick={() => navigateDate('prev')}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="header-center">
          <span className="header-date">{format(currentDate, 'EEE, MMM d')}</span>
          {!isToday && (
            <button className="header-today-pill" onClick={() => setCurrentDate(new Date())}>
              Back to Today
            </button>
          )}
        </div>
        <button className="header-arrow" onClick={() => navigateDate('next')}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M1 1L9 9L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </header>

      <main
        ref={mainRef}
        className={`app-main ${slideDir === 'next' ? 'slide-left' : slideDir === 'prev' ? 'slide-right' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {activeTab === 'today' && (
          <TodayPage date={currentDate} streak={streak} onNavigateWorkout={() => setActiveTab('workout')} />
        )}
        {activeTab === 'workout' && <WorkoutPage date={currentDate} />}
        {activeTab === 'progress' && <ProgressPage date={currentDate} />}
        {activeTab === 'week' && (
          <WeekPage date={currentDate} streak={streak} onSelectDay={(d) => { setCurrentDate(d); setActiveTab('today'); }} />
        )}
        {activeTab === 'settings' && (
          <SettingsPage onLogout={() => { localStorage.removeItem('ft_auth'); setAuthed(false); }} />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default App;
