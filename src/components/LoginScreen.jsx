import { useState } from 'react';

const PASS = 'prashanth2026';

export default function LoginScreen({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pin === PASS) {
      localStorage.setItem('ft_auth', 'true');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">&#x1F4AA;</div>
        <h1>Prashanth's Fitness</h1>
        <p>16-Week Transformation</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="login-input"
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-full">
            Log In
          </button>
          {error && <p className="error-msg">Wrong password</p>}
        </form>
        <p className="login-hint">Default: prashanth2026</p>
      </div>
    </div>
  );
}
