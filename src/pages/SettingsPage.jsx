import { useRef, useState, useEffect } from 'react';
import { exportAll, importAll } from '../utils/storage';
import { USER } from '../utils/constants';

const REMINDER_TIMES = [
  { key: 'meal1', hour: 7, min: 35, label: 'Meal 1 + Supplements', time: '7:35 AM' },
  { key: 'meal2', hour: 12, min: 0, label: 'Meal 2', time: '12:00 PM' },
  { key: 'meal3', hour: 18, min: 0, label: 'Meal 3', time: '6:00 PM' },
  { key: 'steps', hour: 21, min: 0, label: 'Check steps (10k?)', time: '9:00 PM' },
  { key: 'meal4', hour: 22, min: 0, label: 'Meal 4', time: '10:00 PM' },
  { key: 'bed', hour: 22, min: 30, label: 'Wind down \u2014 bed in 30 min', time: '10:30 PM' },
];

export default function SettingsPage({ onLogout }) {
  const fileRef = useRef(null);
  const [notifStatus, setNotifStatus] = useState('unknown');
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    setIsPWA(standalone);

    // Check notification permission
    if ('Notification' in window) {
      setNotifStatus(Notification.permission);
    } else {
      setNotifStatus('unsupported');
    }
  }, []);

  async function handleExport() {
    const data = await exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      await importAll(data);
      alert('Data imported successfully! Refresh the app.');
    } catch {
      alert('Invalid backup file.');
    }
  }

  async function enableNotifications() {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
    if (perm === 'granted') {
      // Send a test notification
      new Notification('Fitness Tracker', {
        body: 'Notifications enabled! You\'ll get meal reminders.',
        icon: '/icon-192.png',
      });
      // Schedule today's remaining notifications
      scheduleReminders();
    }
  }

  function scheduleReminders() {
    const now = new Date();
    REMINDER_TIMES.forEach(({ hour, min, label }) => {
      const target = new Date();
      target.setHours(hour, min, 0, 0);
      const delay = target.getTime() - now.getTime();
      if (delay > 0) {
        setTimeout(() => {
          new Notification('Fitness Tracker', {
            body: label,
            icon: '/icon-192.png',
            tag: `reminder-${hour}-${min}`,
          });
        }, delay);
      }
    });
  }

  function sendTestNotification() {
    if (Notification.permission === 'granted') {
      new Notification('Fitness Tracker', {
        body: 'Test notification \u2014 reminders are working!',
        icon: '/icon-192.png',
      });
    }
  }

  return (
    <div className="page settings-page">
      <h1>Settings</h1>

      <div className="card">
        <h3>PROFILE</h3>
        <div className="profile-info">
          <div className="profile-row"><span>Name</span><span>{USER.name}</span></div>
          <div className="profile-row"><span>Start Weight</span><span>{USER.startWeight} lbs</span></div>
          <div className="profile-row"><span>Goal Weight</span><span>{USER.goalWeight} lbs</span></div>
          <div className="profile-row"><span>Height</span><span>{USER.height}</span></div>
          <div className="profile-row"><span>Program</span><span>{USER.startDate} to {USER.endDate}</span></div>
          <div className="profile-row"><span>Duration</span><span>{USER.totalWeeks} weeks</span></div>
        </div>
      </div>

      <div className="card">
        <h3>NOTIFICATIONS</h3>

        {!isPWA && (
          <div className="notif-warning">
            <span>{'\u26A0\uFE0F'} Add to Home Screen first</span>
            <p className="hint">
              Notifications only work when this app is installed on your home screen.
              In Safari, tap Share {'\u2192'} Add to Home Screen.
            </p>
          </div>
        )}

        <div className="notif-status">
          <span>Status</span>
          <span className={`notif-badge ${notifStatus === 'granted' ? 'notif-on' : ''}`}>
            {notifStatus === 'granted' ? 'Enabled' :
             notifStatus === 'denied' ? 'Blocked' :
             notifStatus === 'unsupported' ? 'Not Supported' :
             'Off'}
          </span>
        </div>

        {notifStatus !== 'granted' && notifStatus !== 'unsupported' && (
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={enableNotifications}>
            Enable Reminders
          </button>
        )}

        {notifStatus === 'denied' && (
          <p className="hint" style={{ marginTop: 8 }}>
            Notifications were blocked. Go to iPhone Settings {'\u2192'} Fitness {'\u2192'} Notifications to re-enable.
          </p>
        )}

        {notifStatus === 'granted' && (
          <>
            <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={sendTestNotification}>
              Send Test Notification
            </button>

            <div className="reminder-list">
              {REMINDER_TIMES.map((r) => (
                <div key={r.key} className="reminder-row">
                  <span className="reminder-time">{r.time}</span>
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3>APPLE HEALTH</h3>
        <p className="hint" style={{ marginBottom: 10 }}>
          Web apps can't connect to Apple Health directly. Enter your step count manually
          from your Apple Watch in the Daily Goals section.
        </p>
        <p className="hint">
          For full HealthKit integration, this app would need to be a native iOS app.
          That's a future upgrade if needed.
        </p>
      </div>

      <div className="card">
        <h3>DATA</h3>
        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleExport}>
            Export Backup (JSON)
          </button>
          <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
            Import Backup
          </button>
          <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        </div>
      </div>

      <div className="card">
        <button className="btn btn-danger" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
