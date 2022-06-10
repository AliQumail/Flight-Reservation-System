import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ShowPassengers from "./ShowPassengers";
import UpdateFlightBtn from "./UpdateFlightBtn";
const FlightDetails = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/getallflights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
      });
  }, [flights]);

  const handleDelete = (id) => {
    console.log(id);
    fetch("http://localhost:3001/deleteflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    alert("flight deleted succesfully")
  };

  return (
    <div>
      {flights.map((flight) => {
        return (
          <div className="row view-flight-box mt-4 p-3 mb-4">
            <div className="col-4">
              <div>
                <text className="locations bg-white">
                  <b>{flight.sourceLocation}</b> to <b>{flight.destLocation}</b>
                </text>
                <p>
                  {" "}
                  Departure date : {flight.startDate} <br /> Departure time :
                  {flight.startTime}
                </p>
              </div>
            </div>
            <div className="col-2">
              <div>
                <text> Flight No : {flight.flightNo} </text>
                <br/>
                <text style={{ color: "red" }}>
                  Seats available : {flight.seats - flight.noOfPassengers} 
                </text>
                <br/>
                <text>Total time : <b>{flight.totalTime}</b> Hours</text>

              </div>
            </div>
            <div className="col-3">
              <div>
                <text>
                 
                  <b>Economy price</b> : $ {flight.economyPrice}
                  <br />
                  <b>Business price</b> : $ {flight.businessPrice}
                  <br />
                  <b>First class price</b> : $ {flight.firstClassPrice}
                </text>
              </div>
            </div>
            <div className="col-3">
              <Button
                onClick={() => handleDelete(flight._id)}
                className="btn btn-danger  w-75"
              >
                Delete
              </Button>

              <UpdateFlightBtn
                id={flight._id}
                source={flight.sourceLocation}
                dest={flight.destLocation}
                flightNo={flight.flightNo}
                date={flight.startDate}
                time={flight.startTime}
                totalTime={flight.totalTime}
                seats={flight.seats}
              />

              <ShowPassengers id={flight.flightNo} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightDetails;
