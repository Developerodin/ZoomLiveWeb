import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ZoomMeeetingRoom } from './Pages/ZoomMeeetingRoom';


function App() {
  return (
    <Router>
 
      <Routes>
          <Route path="/zoom-meeting" element={<ZoomMeeetingRoom/>} />
          <Route path="/" element={<Home/>} />
          </Routes>
      
    </Router>
  );
}

export default App;