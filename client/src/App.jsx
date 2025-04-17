import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, Dashboard } from "./components"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={
          <>
            <Auth />
          </>
        } />
        <Route path='/Dashboard/*' element={
          <>
            <Dashboard />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
