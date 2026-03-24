import { useState, useEffect } from 'react';
import { addDays, subDays } from 'date-fns';
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

  useEffect(() => {
    loadStreak();
    scheduleNotifications();
  }, []);

  // Reload streak when switching to today tab
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

  function handleDateNav(dir) {
    setCurrentDate((d) => dir === 'next' ? addDays(d, 1) : subDays(d, 1));
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="btn-icon" onClick={() => handleDateNav('prev')}>&larr;</button>
        <button className="btn-icon today-btn" onClick={() => setCurrentDate(new Date())}>Today</button>
        <button className="btn-icon" onClick={() => handleDateNav('next')}>&rarr;</button>
      </header>

      <main className="app-main">
        {activeTab === 'today' && (
          <TodayPage
            date={currentDate}
            streak={streak}
            onNavigateWorkout={() => setActiveTab('workout')}
          />
        )}
        {activeTab === 'workout' && <WorkoutPage date={currentDate} />}
        {activeTab === 'progress' && <ProgressPage date={currentDate} />}
        {activeTab === 'week' && (
          <WeekPage
            date={currentDate}
            streak={streak}
            onSelectDay={(d) => { setCurrentDate(d); setActiveTab('today'); }}
          />
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
