import React, { useState } from 'react'
import '../LoginPage.css'
import logo from '../../assets/Images/resourceDirectory/logo.png'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClear = () => {
        setUsername('');
        setPassword('');
    };

    const navToWelcome = () => {
        navigate('/');
    }
    const navToDash = () => {
        navigate('/dashboard');
    }
    const navToForgotPassword = () => {
        navigate('/forgot-password');
    }
    const navToSignUp = () => {
        navigate('/signup');
    }
  return (
    <div className="login-page">
      <header className="login-header">
        <div className="logo" aria-hidden="true">
            <img src={logo} alt="App Logo" />
        </div>
      </header>

      <main className="login-main">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h1>Login</h1>
          <p>Welcome back! Please enter your credentials to log in.</p>
          <h5>Username</h5>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            aria-label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h5>Password</h5>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-row" role="group">
            <button type="submit">Help</button>
            <button type="button" onClick={navToForgotPassword}>Forgot Password?</button>
            <button type="button" onClick={navToSignUp}>Sign Up</button>
            <button type="button" className= "login-button" onClick={navToDash}>Login</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </div>

          <div className="cancel-wrap">
            <button type="button" className="cancel-button" onClick={navToWelcome}>Cancel</button>
          </div>
        </form>
      </main>
    </div>

  )
}

export default LoginPage
