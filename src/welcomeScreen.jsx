import React from 'react';
import './welcomeScreen.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/resourceDirectory/logo.png';


function WelcomeScreen() {
    const navigate = useNavigate();

    const navToLogin = () => {
        navigate('/login');
    }
  return (
    <div className="welcome-screen">
      <header className="login-header">
        <div className="logo" aria-hidden="true">
          <img src={logo} alt="App Logo" />
        </div>
      </header>

      <main className="welcome-main">
        <div className="welcome-card">
          <h1>Welcome to the App!</h1>
          <p>Please log in to continue.</p>
          <div className="actions">
            <button className="btn-primary" onClick={navToLogin}>
              Go to Login Page
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;