import { useRef } from 'react';
import { exportAll, importAll } from '../utils/storage';
import { USER } from '../utils/constants';

export default function SettingsPage({ onLogout }) {
  const fileRef = useRef(null);

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

  async function requestNotifications() {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        alert('Notifications enabled! You\'ll get meal reminders.');
      }
    }
  }

  return (
    <div className="page settings-page">
      <h1>Settings</h1>

      <div className="card">
        <h3>Profile</h3>
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
        <h3>Data</h3>
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
        <h3>Notifications</h3>
        <button className="btn btn-secondary" onClick={requestNotifications}>
          Enable Meal Reminders
        </button>
        <p className="hint">Sends reminders at meal times (7:35am, 12pm, 6pm, 10pm)</p>
      </div>

      <div className="card">
        <button className="btn btn-danger" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
