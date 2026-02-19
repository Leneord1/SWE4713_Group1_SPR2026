import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
import WelcomeScreen from './welcomeScreen'
import DashboardInitial from './initDashboard'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardInitial/>} />
      </Routes>
    </Router>
  )
}

export default App
