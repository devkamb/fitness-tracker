export default function Checkbox({ checked, onChange, label, disabled = false }) {
  return (
    <button
      className={`checkbox-row ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onChange}
      type="button"
    >
      <span className={`checkbox-icon ${checked ? 'checkbox-checked' : ''}`}>
        {checked ? '\u2713' : ''}
      </span>
      <span className="checkbox-label">{typeof label === 'string' ? label : label}</span>
    </button>
  );
}
