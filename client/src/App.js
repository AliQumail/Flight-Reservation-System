
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './components/AdminLogin/AdminLogin';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import SearchFlights from './components/SearchFlights/SearchFlights';
import Passenger from './components/Passenger/Passenger';
import Ticket from './components/Ticket/Ticket';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/searchflights" exact element={<SearchFlights/>} />
          <Route path="/booking" exact element={<Passenger/>} />
          <Route path="/adminlogin" exact element={<AdminLogin/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
          {/* <Route path="/ticket" exact element={<Ticket/>} /> */}
          <Route path="/ticket" exact element={<Ticket/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
