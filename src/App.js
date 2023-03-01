import logo from './logo.svg';
import React from "react";
import { Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import NotFound from './Components/Pages/NotFound';
const Home = React.lazy(() => import('./Components/Pages/Home.js'))
const Header = React.lazy(() => import('./Components/Pages/Header'))
const Footer = React.lazy(() => import('./Components/Pages/Footer'))
const Market = React.lazy(()=> import ('./Components/Pages/Market'))
const About = React.lazy(()=> import ('./Components/Pages/About'))
function App() {
  return (
    <div className="App">
      
     
     
      <Suspense fallback={<div>Loading...</div>}>
      <Header/>
     
                <Routes>
                <Route path='*' element={<Home/>}></Route>
                <Route path='/shop' element={<Market/>}></Route>
                <Route path='/About' element={<About/>}></Route>
                </Routes>
<Footer/>
            </Suspense>
    </div>
  );
}

export default App;
