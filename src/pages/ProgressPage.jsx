import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getAllData, setData, deleteData } from '../utils/storage';
import { USER } from '../utils/constants';
import { formatDate, isWeighDay } from '../utils/helpers';

export default function ProgressPage({ date }) {
  const [weights, setWeights] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [weightInput, setWeightInput] = useState('');
  const [tab, setTab] = useState('weight');
  const fileRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const w = await getAllData('weights');
    const p = await getAllData('photos');
    setWeights(w.sort((a, b) => a.id.localeCompare(b.id)));
    setPhotos(p.sort((a, b) => a.id.localeCompare(b.id)));
  }

  async function saveWeight() {
    if (!weightInput) return;
    const today = formatDate(date);
    await setData('weights', { id: today, weight: Number(weightInput), date: today });
    setWeightInput('');
    loadData();
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const today = formatDate(date);
      const id = `${today}-${Date.now()}`;
      await setData('photos', { id, date: today, data: ev.target.result });
      loadData();
    };
    reader.readAsDataURL(file);
  }

  async function deletePhoto(id) {
    await deleteData('photos', id);
    loadData();
  }

  const chartData = weights.map((w) => ({
    date: w.date.slice(5),
    weight: w.weight,
  }));

  const totalLost = weights.length > 0
    ? (USER.startWeight - weights[weights.length - 1].weight).toFixed(1)
    : 0;

  const weeklyAvg = (() => {
    if (weights.length === 0) return null;
    const last7 = weights.slice(-3);
    const avg = last7.reduce((s, w) => s + w.weight, 0) / last7.length;
    return avg.toFixed(1);
  })();

  return (
    <div className="page progress-page">
      <div className="tab-bar">
        <button className={`tab ${tab === 'weight' ? 'active' : ''}`} onClick={() => setTab('weight')}>
          Weight
        </button>
        <button className={`tab ${tab === 'photos' ? 'active' : ''}`} onClick={() => setTab('photos')}>
          Photos
        </button>
      </div>

      {tab === 'weight' && (
        <>
          <div className="card">
            <h3>Log Weight</h3>
            <div className="weight-input-row">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="Weight (lbs)"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="input-weight"
              />
              <button className="btn btn-primary" onClick={saveWeight}>Save</button>
            </div>
            {isWeighDay(formatDate(date)) && (
              <p className="weigh-reminder">Today is a weigh-in day (Mon/Wed/Fri)</p>
            )}
          </div>

          <div className="card stats-row">
            <div className="stat">
              <span className="stat-value">{weeklyAvg || '—'}</span>
              <span className="stat-label">Weekly Avg</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalLost}</span>
              <span className="stat-label">Lbs Lost</span>
            </div>
            <div className="stat">
              <span className="stat-value">{USER.goalWeight}</span>
              <span className="stat-label">Goal</span>
            </div>
          </div>

          {chartData.length > 1 && (
            <div className="card chart-card">
              <h3>Weight Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a2e', border: '1px solid #333', borderRadius: 8 }}
                    labelStyle={{ color: '#888' }}
                  />
                  <ReferenceLine y={USER.goalWeight} stroke="#4ade80" strokeDasharray="5 5" label={{ value: 'Goal', fill: '#4ade80', fontSize: 12 }} />
                  <Line type="monotone" dataKey="weight" stroke="#818cf8" strokeWidth={2} dot={{ fill: '#818cf8', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {weights.length > 0 && (
            <div className="card">
              <h3>Weight Log</h3>
              <div className="weight-log">
                {[...weights].reverse().map((w) => (
                  <div key={w.id} className="weight-log-row">
                    <span>{w.date}</span>
                    <span className="weight-value">{w.weight} lbs</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {tab === 'photos' && (
        <>
          <div className="card">
            <h3>Progress Photos</h3>
            <button className="btn btn-primary" onClick={() => fileRef.current?.click()}>
              Upload Photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="photo-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-card card">
                <img src={photo.data} alt={`Progress ${photo.date}`} />
                <div className="photo-meta">
                  <span>{photo.date}</span>
                  <button className="btn-delete" onClick={() => deletePhoto(photo.id)}>Delete</button>
                </div>
              </div>
            ))}
            {photos.length === 0 && (
              <p className="empty-state">No photos yet. Take your first progress photo!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
