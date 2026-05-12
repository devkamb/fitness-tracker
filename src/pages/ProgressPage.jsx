import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getAllData, setDataWithBackup as setData, deleteData, getData } from '../utils/storage';
import { USER } from '../utils/constants';
import { formatDate, isWeighDay, getDaysUntilGraduation, getDaysUntilShredEnd } from '../utils/helpers';

export default function ProgressPage({ date }) {
  const [weights, setWeights] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [measurements, setMeasurements] = useState(null);
  const [weightInput, setWeightInput] = useState('');
  const [tab, setTab] = useState('weight');
  const fileRef = useRef(null);

  const dateStr = formatDate(date);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const w = await getAllData('weights');
    const p = await getAllData('photos');
    const m = await getData('settings', 'measurements');
    setWeights(w.sort((a, b) => a.id.localeCompare(b.id)));
    setPhotos(p.sort((a, b) => a.id.localeCompare(b.id)));
    setMeasurements(m || { entries: [] });
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

  async function saveMeasurement(field, value) {
    const updated = { ...measurements };
    if (!updated.entries) updated.entries = [];
    const today = formatDate(date);
    let entry = updated.entries.find(e => e.date === today);
    if (!entry) {
      entry = { date: today };
      updated.entries.push(entry);
    }
    entry[field] = value;
    updated.id = 'measurements';
    await setData('settings', updated);
    setMeasurements(updated);
  }

  const todayMeasurement = measurements?.entries?.find(e => e.date === dateStr) || {};

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

  const daysLeft = getDaysUntilGraduation(dateStr);
  const daysToEnd = getDaysUntilShredEnd(dateStr);
  const currentWeight = weights.length > 0 ? weights[weights.length - 1].weight : USER.startWeight;
  const projectedEndWeight = totalLost > 0 && weights.length > 2
    ? (currentWeight - (Number(totalLost) / weights.length) * daysToEnd * 0.14).toFixed(0)
    : null;

  return (
    <div className="page progress-page">
      <div className="tab-bar">
        <button className={`tab ${tab === 'weight' ? 'active' : ''}`} onClick={() => setTab('weight')}>
          Weight
        </button>
        <button className={`tab ${tab === 'body' ? 'active' : ''}`} onClick={() => setTab('body')}>
          Body
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
              <span className="stat-value">{weeklyAvg || '\u2014'}</span>
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

          {/* Graduation projection */}
          {daysToEnd > 0 && (
            <div className="card graduation-proj">
              {daysLeft > 0 && (
                <div className="grad-proj-row">
                  <span>{'\uD83C\uDF93'} Graduation in {daysLeft} days</span>
                </div>
              )}
              <div className="grad-proj-row">
                <span>{'\uD83D\uDC8E'} Shred complete in {daysToEnd} days</span>
                {projectedEndWeight && (
                  <span className="grad-proj-weight">Projected: ~{projectedEndWeight} lbs</span>
                )}
              </div>
            </div>
          )}

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

      {tab === 'body' && (
        <>
          <div className="card">
            <h3>Body Measurements</h3>
            <p className="hint" style={{ marginBottom: 12 }}>Measure bi-weekly (every 2 Sundays)</p>
            {['waist', 'chest', 'arms', 'thighs'].map(field => (
              <div key={field} className="measurement-row">
                <label className="measurement-label">{field.charAt(0).toUpperCase() + field.slice(1)} (in)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  placeholder="0.0"
                  value={todayMeasurement[field] || ''}
                  onChange={(e) => saveMeasurement(field, e.target.value)}
                  className="input-measurement"
                />
              </div>
            ))}
          </div>

          {measurements?.entries?.length > 0 && (
            <div className="card">
              <h3>Measurement History</h3>
              <div className="measurement-history">
                {[...measurements.entries].reverse().map((entry) => (
                  <div key={entry.date} className="measurement-entry">
                    <span className="measurement-date">{entry.date}</span>
                    <div className="measurement-values">
                      {entry.waist && <span>Waist: {entry.waist}"</span>}
                      {entry.chest && <span>Chest: {entry.chest}"</span>}
                      {entry.arms && <span>Arms: {entry.arms}"</span>}
                      {entry.thighs && <span>Thighs: {entry.thighs}"</span>}
                    </div>
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
            <p className="hint" style={{ marginBottom: 10 }}>Front, side, back \u2014 same spot, same lighting</p>
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
