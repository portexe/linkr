import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { emailRegex } from '../../shared/constants';
import { fb } from '../../shared/service';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [pw, setPW] = useState('');
  const [verifyPW, setVerifyPW] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(
      email && emailRegex.test(email) && pw && verifyPW && pw === verifyPW,
    );
  }, [email, pw, verifyPW]);

  const signup = () => {
    if (valid) {
      fb.auth
        .createUserWithEmailAndPassword(email, pw)
        .then(() => console.log('Signup up success!'));
    }
  };

  return (
    <div className={styles.main}>
      <h1>Sign Up</h1>

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

      <input
        type="password"
        value={verifyPW}
        placeholder="Verify Password"
        onChange={e => setVerifyPW(e.target.value)}
      />

      <button onClick={signup} disabled={!valid}>
        Sign Up
      </button>
    </div>
  );
};
