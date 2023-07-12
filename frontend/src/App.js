import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Event from './pages/Event/Event'
import Layout from './pages/Layout/Layout';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="event" element={<Event />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
