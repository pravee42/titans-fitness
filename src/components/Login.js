import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/login.css';
import eyeImage from '../img/eye.png';
import brand from '../img/brand.png';
import insta from '../img/insta.png';
import whatsapp from '../img/whatsapp.png';
import tele from '../img/location.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://gym-backend-apis.onrender.com/login', { email, password });
      const authToken = response.data.token;
      setToken(authToken);
      localStorage.setItem('token', authToken);
      console.log('Login successful', response.data);
      window.location.href = '/Dashboard';
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  useEffect(() => {
    if (token) {
      window.location.href = '/Dashboard';
    }
  }, [token]);

  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="example@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={eyeImage}
                alt="Toggle Password Visibility"
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
      <footer className="footer-container">
        <div className="footer-footer">
          <div className="footer-col">
            <img src={brand} alt="Tshirt12439" className="footer-tshirt12" />
            <span className="footer-text">
              <span>Unleash Your Inner Titan at Titans Fitness Gym -</span>
              <br />
              <span>Where Strength Meets Passion!</span>
            </span>
            <button className="rounded-full border border-white bg-70AB0E-800 px-8 mt-5 py-3 flex items-center justify-center text-white">
              Drop a line
            </button>
          </div>
          <div className="footer-col1">
            <div className="footer-row">
              <div className="footer-col2">
                <span className="footer-text09">Contact</span>
                <div className="footer-list">
                <a href="tel:+918489135973">+91 8489135973</a>
                  <a href="tel:+919043931098">+91 9043931098</a>
                  <a href="mailto:thetitanfitnessstudio@gmail.com">thetitanfitnessstudio@gmail.com</a>
                </div>
              </div>
              <div className="footer-col3">
                <span className="footer-text15">Follow us</span>
                <div className="footer-list1">
                  <a href="https://www.instagram.com/the_titans_fitness_studio?igsh=MWNmODMwcTFoZDhjdQ%3D%3D&utm_source=qr">
                    <img src={insta} alt="Instagram" className="footer-item" />
                  </a>
                  <a href="https://wa.me/919043931098">
                    <img src={whatsapp} alt="WhatsApp" className="footer-item1" />
                  </a>
                  <a href="https://maps.app.goo.gl/bmQFcQ2PV89kd2Px6?g_st=iw">
                    <img src={tele} alt="Telegram" className="footer-item2" />
                  </a>
                </div>
              </div>
            </div>
            <span>© 2023 — Copyright</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
