import React from 'react'
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="login-page">
      <header className="login-header">
        <div className="logo-placeholder" aria-hidden="true">
          {/* logo goes here */}
        </div>
      </header>

      <main className="login-main">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h1>Login</h1>
          <p>Welcome back! Please enter your credentials to log in.</p>
          <h5>Username</ h5>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
          />

          <h5>Password</ h5>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
          />

          <div className="button-row" role="group">
            <button type="submit">Help</button>
            <button type="button">Forgot Password?</button>
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </form>
      </main>
    </div>

  )
}

export default LoginPage
