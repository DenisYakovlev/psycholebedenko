import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Appointment, Event, Contacts, User, Bot } from './pages';
import { BotLayout, MainLayout } from './layouts';
import { UserContext } from './contexts';

export default function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('tokens')))

  useEffect(() => {
    const handleStorageUpdate = () =>{
      setUser(JSON.parse(localStorage.getItem('tokens')) || [])   
    }

    window.addEventListener("storage", handleStorageUpdate)
    return () => {window.removeEventListener("storage", handleStorageUpdate)}
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path="appointment" element={<Appointment />}/>
            <Route path="event" element={<Event />}/>
            <Route path="contacts" element={<Contacts />}/>
            <Route path="user" element={<User />}/>
          </Route>
          <Route path='/bot' element={<BotLayout />}>
            <Route>
              <Route index element={<Bot />}/>
            </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
};
