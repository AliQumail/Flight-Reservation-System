import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function loginUser(event) {


    event.preventDefault();
    const response = await fetch("http://localhost:3001/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId,
        password,
      }),
    });

    const data = await response.json();
  
    if (data.admin) {
      localStorage.setItem("token", data.admin);
      alert("Login successful");
      navigate("/dashboard", {
        state: {
          adminId: adminId,
        },
      });
      
    } 
    
  }

  return (
    <div className="container" >
      <NavBar/>
      <div className="row mt-5">
        <div className="col d-flex justify-content-center mt-5">
          <div>
          <h5 classNamr="text-center">Admin login</h5>
          <form onSubmit={loginUser} className="form-group">
            <input
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              type="text"
              placeholder="Admin ID"
              class="form-control mt-5"
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              class="form-control"
            />
            <br />
            <input type="submit" value="Login" className="btn btn-success"/>
          </form>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
