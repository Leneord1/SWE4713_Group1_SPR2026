import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomeScreen from './pages/welcomeScreen'
import DashboardInitial from './pages/initDashboard'
import Navbar from './navbar'
import { AuthProvider } from './AuthContext'

function App() {
  return(
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomeScreen/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardInitial/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
