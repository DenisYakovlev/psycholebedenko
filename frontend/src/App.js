import { BrowserRouter, Routes, Route } from "react-router-dom";

import { 
  Home,
  Appointment, 
  AppointmentCreate, 
  Event, 
  EventDetails, 
  Tests, 
  TestPage,
  ErrorPage,
  DevelopmentPage,
  ConstantLinkPage,
  User, 
  UserEvents,
  Exit, 
  Bot, 
  Admin,
  ScheduleCalendar,
  Planning,
  Users,
  Appointments,
  Assign,
  Events,
  EventsCreate,
  EventsUpdate
} from './pages';


import Consulting from "./pages/Home/Consulting/Consulting";

import { BotLayout, MainLayout, AdminLayout } from './layouts';
import { UserContextProvider, AuthModalContextProvider, AlertContextProvider} from "./contexts";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';



export default function App(){
  return (
    <BrowserRouter>
      <AlertContextProvider>
        <UserContextProvider>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <AuthModalContextProvider>
              <Routes>

                <Route path='/' element={<MainLayout />}>
                  <Route index element={<Home />}/>

                  <Route path="appointment">
                    <Route index element={<Appointment source="appointment"/>}/>
                    <Route path="create" element={<AppointmentCreate source={"/appointment"}/>}/>
                  </Route>

                  <Route path="event">
                    <Route index element={<Event source="event" />} />
                    <Route path=":id" element={<EventDetails />} />
                  </Route>
                  
                  <Route path="t">
                    <Route path=":hash" element={<ConstantLinkPage />}/>
                  </Route>
                  
                  <Route path="tests">
                    <Route index element={<Tests />} />
                    <Route path=":name" element={<TestPage />}/>
                  </Route>

                  {/*
                    In case of problems with client, toggle development page
                    
                    <Route path="tests" element={<DevelopmentPage />}/> 
                  */}

                  <Route path="user">
                    <Route index element={<User />}/>
                    <Route path="exit" element={<Exit />}/>
                  </Route>

                  <Route path="*" element={<ErrorPage />}/>

                </Route>

                <Route path='/bot' element={<BotLayout />}>
                  <Route>
                    <Route index element={<Consulting source="bot"/>}/>

                    {/* Use for auth check of bot app  */}
                    {/* <Route index element={<Bot/>}/> */}


                    <Route path="appointment">
                      <Route index element={<Appointment source="bot/appointment"/>}/>
                      <Route path="create" element={<AppointmentCreate source={"/bot/appointment"}/>}/>
                    </Route>

                    <Route path="event">
                      <Route index element={<Event source="bot/event"/>}/>
                      <Route path=":id" element={<EventDetails />} />
                    </Route>

                    
                    <Route path="tests">
                      <Route index element={<Tests />} />
                      <Route path=":name" element={<TestPage />}/>
                    </Route>

                    {/*
                    In case of problems with client, toggle development page
                    
                    <Route path="tests" element={<DevelopmentPage />}/> 
                    */}

                    <Route path="user" element={<User />}/>

                    <Route path="*" element={<ErrorPage />}/>
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
                    <Route path="participation" element={<UserEvents />}/>
                  </Route>

                  <Route path="events">
                    <Route index element={<Events />}/>
                    <Route path="create" element={<EventsCreate />}/>
                    <Route path="update" element={<EventsUpdate />}/>
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
      </AlertContextProvider>
    </BrowserRouter>
  )
};
