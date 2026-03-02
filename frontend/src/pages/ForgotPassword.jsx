import React, { useState } from 'react'
import '../LoginPage.css'
import logo from '../../assets/Images/resourceDirectory/logo.png'
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Password reset requested for:', email);
    };

    const handleClear = () => {
        setEmail('');
    };

    const navToWelcome = () => {
        navigate('/');
    }

    return (
        <div className="login-page">
            <header className="login-header">
                <div className="logo" aria-hidden="true">
                    <img src={logo} alt="App Logo" />
                </div>
            </header>

            <main className="login-main">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                    <h5>Email</h5>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="button-row" role="group">
                        <button type="button" onClick={handleClear}>Clear</button>
                        <button type="submit" className="login-button">Submit</button>
                    </div>

                    <div className="cancel-wrap">
                        <button type="button" className="cancel-button" onClick={navToWelcome}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
export default ForgotPasswordPage;