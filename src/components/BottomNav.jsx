const tabs = [
  { id: 'today', label: 'Today', icon: '\u2606' },
  { id: 'workout', label: 'Workout', icon: '\uD83C\uDFCB' },
  { id: 'progress', label: 'Progress', icon: '\uD83D\uDCC8' },
  { id: 'week', label: 'Week', icon: '\uD83D\uDCC5' },
  { id: 'settings', label: 'More', icon: '\u2699' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
