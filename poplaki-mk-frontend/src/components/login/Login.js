import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../sharedStyles/FormStyles.css';
import api from '../../axios/axios';
import CustomContainer from '../customContainer/CustomContainer';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    api
      .post('/auth/token', body)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        const parts = accessToken.split('.');

        const payload = JSON.parse(atob(parts[1]));
        setUser({ payload });
        setError(null);
        navigate('/complaints');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error);
      });
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <CustomContainer minHeight={80}>
      <div className="auth-container">
        <h2 className="auth-title">Најава</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="email"
            placeholder="Е-маил"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Лозинка"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">
            Најави се
          </button>
        </form>
      </div>
    </CustomContainer>
  );
}

export default Login;
