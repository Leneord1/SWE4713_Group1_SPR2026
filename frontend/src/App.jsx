import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
import WelcomeScreen from './welcomeScreen'
import DashboardInitial from './initDashboard'
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
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
