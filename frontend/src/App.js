import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home(){
  return (
    <h1>Testing frontend...😼🍇</h1>
  )
}

function Event(){
  return (
    <h1>Event route...🐔🐗🐘</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Home}/>
        <Route path="/event" element={null}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
