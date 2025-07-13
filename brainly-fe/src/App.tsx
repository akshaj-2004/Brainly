import './App.css'
import { Dashboard } from './pages/Dashboard'
import RegisterPage from './pages/Register'
// import { Signin } from './pages/Signin'
// import { Signup } from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App
