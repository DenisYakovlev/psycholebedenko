import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Appointment, Event, Contacts } from './pages';
import { MainLayout } from './layouts';
import { UserContext } from './contexts';

export default function App(){
  const [user, setUser] = useState()

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path="appointment" element={<Appointment />}/>
            <Route path="event" element={<Event />}/>
            <Route path="contacts" element={<Contacts />}/>
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
};
