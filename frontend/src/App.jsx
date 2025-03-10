import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/components/Signup'
import { Send } from './pages/components/Send'  
import './App.css'

function App() {
  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path ='/login' element={<Signin/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<Send/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
