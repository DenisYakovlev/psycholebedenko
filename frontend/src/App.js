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
  Planning,
  Users,
  Appointments,
  Assign
} from './pages';

import { BotLayout, MainLayout, AdminLayout } from './layouts';
import { UserContextProvider, AuthModalContextProvider} from "./contexts";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';



export default function App(){
  return (
    <BrowserRouter>
        <UserContextProvider>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
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

                </Route>

                <Route path='/bot' element={<BotLayout />}>
                  <Route>
                    <Route index element={<Bot />}/>
                  </Route>
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Admin />}/>
                  <Route path="schedule">
                    <Route path="calendar" element={<ScheduleCalendar />}/>
                    <Route path="planning" element={<Planning />}/>
                  </Route>
                  <Route path="users">
                    <Route index element={<Users />}/>
                  </Route>
                  <Route path="appointments">
                    <Route index element={<Appointments />}/>
                    <Route path="assign" element={<Assign />}/>
                  </Route>
                </Route>

              </Routes>
            </AuthModalContextProvider>
          </QueryParamProvider>
        </UserContextProvider>
    </BrowserRouter>
  )
};
