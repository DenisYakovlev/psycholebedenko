import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Appointment, Event, EventDetails, Contacts, User, Bot } from './pages';
import { BotLayout, MainLayout } from './layouts';
import { UserContext, UserContextProvider } from "./contexts";

export default function App(){
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>

          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />}/>
            <Route path="appointment" element={<Appointment />}/>

            <Route path="event">
              <Route index element={<Event />} />
              <Route path=":title" element={<EventDetails />} />
            </Route>
            
            <Route path="contacts" element={<Contacts />}/>
            <Route path="user" element={<User />}/>
          </Route>

          <Route path='/bot' element={<BotLayout />}>
            <Route>
              <Route index element={<Bot />}/>
            </Route>
          </Route>

        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
};
