import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Ticket.css"

const Ticket = () => {


  const [passengers, setPassengers] = useState([]);
  const [code, setCode] = useState();
  const [input, setInput]= useState();
  const handleSearch = () => {
     setCode(input)
  }
  const handleCancel = (id,flightNo) => {
    fetch("http://localhost:3001/cancelflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        flightNo:flightNo
      }),
    });
    alert("Passenger flight cancelled");
  };

  useEffect(() => {
    fetch("http://localhost:3001/getallpassengers")
      .then((res) => res.json())
      .then((data) => {
        setPassengers(data);
      });
  }, []);

  return (
    <div className="container">
      <NavBar />
      <div className="row ">
        <div className="d-flex justify-content-center mt-3">
        <input
          type="text"
          value={input}
          className=""
          placeholder="Enter your unique flight key"
          onChange={(e) => setInput(e.target.value)}
          style={{width:"300px"}}
        />
        
        <input type="button" value="search" className="btn btn-success mr-2"
        onClick={handleSearch}
        />
        </div>
      </div>

      {passengers
        .filter((passenger) => passenger.code === code)
        .map((passenger) => {
          return (
            <div className="">
              <h4 className="text-center mt-5">
                Welcome to the Passenger details!
              </h4>
              <p className="text-center">
                Your unique flight key is : {passenger.code}
              </p>
              
              <div className="container mt-5">
                <div className="row d-flex justify-content-center mt-5">
                  <div className="col col-9 border">
                    <div className="row boarding-pass pt-2 pb-1">
                      <h5 className="boarding-pass-heading">BOARDING PASS</h5>
                    </div>
                    <div className="row mt-5">
                      <div className="col col-4 ticket-details">
                        Name : <i>{passenger.name}</i>
                      </div>
                      <div className="col col-4 ticket-details">
                        Age : <i>{passenger.age}</i>
                      </div>
                      <div className="col col-4 ticket-details">
                        Country : <i>{passenger.country}</i>
                      </div>
                      <hr />
                    </div>
                    <div className="row mt-3">
                      <div className="col col-4 ticket-details">
                        From : {passenger.sourceLocation}
                      </div>
                      <div className="col col-4 ticket-details">
                        To : {passenger.destLocation}
                      </div>
                      <div className="col col-4 ticket-details">
                        Passport No : {passenger.passportNo}
                      </div>
                      <hr />
                    </div>
                    <div className="row mt-3 mb-2">
                      <div className="col col-4 ticket-details">
                        Flight No : {passenger.flightNo}
                      </div>
                      <div className="col col-4 ticket-details">
                        Seat Type : {passenger.seatType}
                      </div>
                      <div className="col col-4 ticket-details">
                        Seat No : {passenger.seatNo}{" "}
                      </div>
                    </div>
                    <div className="row boarding-pass mt-5">.</div>

                    <div></div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center">
                Please not that this flight is only partially refundable
              </p>
              <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger mb-2 text-center btn-lg"
                onClick={() => handleCancel(passenger._id,passenger.flightNo)}
              >
                Cancel Flight
              </button>
              </div>
              
            </div>
          );
        })}
        
    </div>
  );
};

export default Ticket;
