import React from 'react';
import './initDashboard.css';
import logo from '../assets/Images/resourceDirectory/logo.png';
import { useNavigate } from 'react-router-dom';

function DashboardInitial() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <header className="login-header">
        <div className="logo" aria-hidden="true">
          <img src={logo} alt="App Logo" />
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p className="muted">Welcome to your dashboard — manage your account and recent activity.</p>
          </div>

          <div className="dashboard-grid">
            <div className="stat">
              <div className="stat-title">Projects</div>
              <div className="stat-value">12</div>
            </div>
            <div className="stat">
              <div className="stat-title">Tasks</div>
              <div className="stat-value">34</div>
            </div>
            <div className="stat">
              <div className="stat-title">Messages</div>
              <div className="stat-value">5</div>
            </div>
            <div className="stat">
              <div className="stat-title">Alerts</div>
              <div className="stat-value">2</div>
            </div>
          </div>

          <div className="dashboard-actions">
            <button className="btn-primary" onClick={() => navigate('/login')}>Back to login</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardInitial;