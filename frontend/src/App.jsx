import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomeScreen from './pages/welcomeScreen'
import DashboardInitial from './pages/initDashboard'
import Navbar from './navbar'
import { AuthProvider } from './AuthContext'
import ForgotPasswordPage from './pages/ForgotPassword'
import SignUpPage from './pages/SignUpPage'
function App() {
  return(
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomeScreen/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardInitial/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
