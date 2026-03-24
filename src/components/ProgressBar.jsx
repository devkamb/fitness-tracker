export default function ProgressBar({ label, current, target, unit }) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const over = current > target;

  return (
    <div className="progress-bar-container">
      <div className="progress-label">
        <span>{label}</span>
        <span className={over ? 'over' : ''}>
          {current} / {target} {unit} ({Math.round(pct)}%)
        </span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill ${over ? 'progress-over' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
