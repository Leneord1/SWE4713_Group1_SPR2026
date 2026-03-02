import React, { useState } from 'react'
import '../LoginPage.css'
import logo from '../../assets/Images/resourceDirectory/logo.png'
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../utils/passwordValidation';
import { hashPassword } from '../utils/passwordHash';

function SignUpPage() {
    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        const validation = validatePassword(newPassword);
        setPasswordErrors(validation.errors);
        
        if (newPassword.length > 0) {
            setShowPasswordErrors(true);
        } else {
            setShowPasswordErrors(false);
        }

        if (confirmPassword && newPassword === confirmPassword) {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        
        if (newConfirmPassword && newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleClear = () => {
        setemail('');
        setPassword('');
        setConfirmPassword('');
        setPasswordErrors([]);
        setShowPasswordErrors(false);
        setConfirmPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validation = validatePassword(password);
        setPasswordErrors(validation.errors);
        setShowPasswordErrors(true);

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }

        if (validation.isValid && password === confirmPassword && email.trim()) {
            try {
                const hashedPassword = await hashPassword(password);
                console.log('Signup data:', { email, passwordHash: hashedPassword });
            } catch (error) {
                console.error('Error hashing password:', error);
            }
        }
    };

    const navToWelcome = () => {
        navigate('/');
    }

    const navToLogin = () => {
        navigate('/login');
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
                    <h1>Sign Up</h1>
                    <p>Create a new account. Please enter your credentials.</p>
                    
                    <h5>email</h5>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        placeholder="email"
                        aria-label="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                    />

                    <h5>Password</h5>
                    <input
                        className={`input ${showPasswordErrors && passwordErrors.length > 0 ? 'input-error' : ''}`}
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    
                    {showPasswordErrors && passwordErrors.length > 0 && (
                        <div className="error-messages" role="alert">
                            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#dc2626', fontSize: '13px' }}>
                                {passwordErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h5>Confirm Password</h5>
                    <input
                        className={`input ${confirmPasswordError ? 'input-error' : ''}`}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        aria-label="confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    
                    {confirmPasswordError && (
                        <div className="error-messages" role="alert" style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
                            {confirmPasswordError}
                        </div>
                    )}

                    <div className="button-row" role="group">
                        <button type="submit" className="login-button">Sign Up</button>
                        <button type="button" onClick={handleClear}>Clear</button>
                    </div>
                    <div className="button-row" role="group">
                        <button type="button" onClick={navToLogin}>
                            Already have an account? 
                        </button>
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

export default SignUpPage
