import { Button } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import img from "./bg.jpg";

const Home = () => {
  return (
    <div className="home-body">
      <div className="container">
        <NavBar />
       
        <div className="row mt-5">
          <div className="col col-6 mt-5">
            <div className="">
              <h5 className="welcome-msg">Welcome to Avian Airlines!</h5>
              <p className="msg-2 mt-3">
                Fly with us and experience the exceptional
              </p>
              <a className="home-book-btn mt-5" href="/searchflights" >Book now</a>
            </div>
          </div>
          <div className="col col-6 mt-5">
            <img src={img} className="bg-img" alt="not supported" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
