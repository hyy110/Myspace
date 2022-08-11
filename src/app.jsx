import React, { Component } from 'react';
import NavBar from './components/navbar';
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router';
import Home from './components/content/home';
import Friends from './components/content/friends';
import Userdynamics from './components/content/userdynamics';
import Login from './components/content/login';
import Register from './components/content/register';
import NotFound from './components/content/notfound';


const App = () => {
  return ( 
    <React.Fragment>
        <NavBar />
        <Routes>
          <Route path="/myspace" element={<Home />}/>
          <Route path="/myspace/home" element={<Home />}/>
          <Route path="/myspace/friends" element={<Friends />}/>
          <Route path="/myspace/userdynamics/:userid" element={<Userdynamics />}/>
          <Route path="/myspace/login" element={<Login />}/>
          <Route path="/myspace/register" element={<Register />}/>
          <Route path="/myspace/404" element={<NotFound />}/>
          <Route path="/myspace/*" element={<Navigate replace to="/404"/>}/>
        </Routes>
    </React.Fragment>
    
  );
}

export default App