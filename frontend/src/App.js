import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Info from './pages/Info';
import Navbar from './components/Navbar'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/Info"
            element={<Info/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
