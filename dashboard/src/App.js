import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
function App() {
  
  
  return (
        <div>
        
          <BrowserRouter>
          <NavBar></NavBar>
            <Routes>
            <Route path="/" element={<Home ></Home>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      
  );
}

export default App;
