import styles from './styles.module.css';
import { fb } from '../../shared/service';
import { useEffect, useState } from 'react';
import { emailRegex } from '../../shared/constants';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setValid(email && emailRegex.test(email) && pw);
  }, [email, pw]);

  const login = () => {
    if (valid) {
      setError('');
      fb.auth
        .signInWithEmailAndPassword(email, pw)
        .then(res => {
          if (!res.user) {
            setError("We're having trouble logging you in. Please try again.");
          }
        })
        .catch(err => {
          if (
            err.code === 'auth/invalid-email' ||
            err.code === 'auth/wrong-password'
          ) {
            setError('Invalid credentials');
          } else if (err.code === 'auth/user-not-found') {
            setError('No account for this email');
          } else {
            setError('Something went wrong :(');
          }
        });
    }
  };

  return (
    <div className={styles.main}>
      <h1>Log In</h1>

      <input
        type="email"
        value={email}
        placeholder="Email Address"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={pw}
        placeholder="Password"
        onChange={e => setPW(e.target.value)}
      />

      <button onClick={login} disabled={!valid}>
        Log In
      </button>

      {error && <div className={`error-message ${styles.error}`}>{error}</div>}
    </div>
  );
};
