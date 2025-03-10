import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Send } from './pages/Send'  

function App() {
  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path ='/login' element={<Signin/>}/>
            <Route path='/' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<Send/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
