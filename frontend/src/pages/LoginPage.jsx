import React, { useState } from 'react'
import '../LoginPage.css'
import logo from '../../assets/Images/resourceDirectory/logo.png'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';
import { createUser } from '../services/userService';

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

    const handleLogin = async () => {
        try {
          // Get user by username
          const { data: userData, error: userError } = await supabase
          .from('user')
          .select('*')
          .eq('username', username)
          .single();

          if (userError || !userData) {
            alert('User not found');
            return;
          }

          // Get password hash from password table
          const { data: passwordData, error: passwordError } = await supabase
          .from('userPasswords')
          .select('password_hash')
          .eq('userID', userData.userID)
          .single();

          if (passwordError || !passwordData) {
            alert('Password record not found');
            return;
          }

          // Compare entered password with stored hash
          const isMatch = await bcrypt.compare(password, passwordData.password_hash);

          if (!isMatch) {
            alert('Invalid password');
            return;
          }

          // Check for suspension
          const today = new Date().toISOString().split('T')[0];

          if (
            userData.suspendFrom &&
            userData.suspendedTill &&
            today >= userData.suspendFrom &&
            today <= userData.suspendedTill
          ) {
            alert('Your account is currently suspended.');
            return;
          }

          // Route to correct dashboard based on role
          if (userData.role === 'administrator') {
            navigate('/admin-dashboard');
          }
          else if (userData.role === 'manager') {
            navigate('/manager-dashboard');
          }
          else if (userData.role === 'accountant') {
            navigate('/accountant-dashboard')
          }
          else {
            navigate('/');
          }
        }

        catch (error) {
          console.error('Login error:', error);
        }
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
            <button type="button" className= "login-button" onClick={handleLogin}>Login</button>
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
