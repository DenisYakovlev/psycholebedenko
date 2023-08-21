import { BrowserRouter, Routes, Route } from "react-router-dom";

import { 
  Home,
  Appointment, 
  AppointmentCreate, 
  Event, 
  EventDetails, 
  Contacts, 
  User, 
  Exit, 
  Bot, 
  Admin,
  ScheduleCalendar,
  Planning
} from './pages';

import { BotLayout, MainLayout, AdminLayout } from './layouts';
import { UserContextProvider, AuthModalContextProvider} from "./contexts";


export default function App(){
  return (
    <BrowserRouter>
        <UserContextProvider>
          <AuthModalContextProvider>
            <Routes>

              <Route path='/' element={<MainLayout />}>
                <Route index element={<Home />}/>

                <Route path="appointment">
                  <Route index element={<Appointment />}/>
                  <Route path="create" element={<AppointmentCreate />}/>
                </Route>

                <Route path="event">
                  <Route index element={<Event />} />
                  <Route path=":title" element={<EventDetails />} />
                </Route>
                
                <Route path="contacts" element={<Contacts />}/>
                <Route path="user">
                  <Route index element={<User />}/>
                  <Route path="exit" element={<Exit />}/>
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                  <Route index element={<Admin />}/>
                  <Route path="schedule">
                    <Route path="calendar" element={<ScheduleCalendar />}/>
                    <Route path="planning" element={<Planning />}/>
                  </Route>
                </Route>
              </Route>

              <Route path='/bot' element={<BotLayout />}>
                <Route>
                  <Route index element={<Bot />}/>
                </Route>
              </Route>

            </Routes>
          </AuthModalContextProvider>
        </UserContextProvider>
    </BrowserRouter>
  )
};
