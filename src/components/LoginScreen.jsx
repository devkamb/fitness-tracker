import { useState } from 'react';

const PASS = 'prashanth2026';

export default function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pin === PASS) {
      setSuccess(true);
      localStorage.setItem('ft_auth', 'true');
      setTimeout(() => onLogin(), 400);
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 1500);
    }
  }

  return (
    <div className="login-screen">
      <div className={`login-card ${success ? 'login-success' : ''} ${error ? 'login-shake' : ''}`}>
        <div className="login-avatar">
          <div className="login-avatar-inner">P</div>
        </div>
        <h1>Prashanth</h1>
        <p className="login-subtitle">16-Week Transformation</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="login-input"
            autoComplete="off"
          />
          <button type="submit" className="login-btn">
            {success ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : 'Sign In'}
          </button>
        </form>
        {error && <p className="login-error">Incorrect password</p>}
      </div>
    </div>
  );
}
