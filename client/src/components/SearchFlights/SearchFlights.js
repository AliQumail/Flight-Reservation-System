import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./SearchFlights.css";

const SearchFlights = () => {
  const [searchSource, setSearchSource] = useState("");
  const [searchDest, setSearchDest] = useState("");
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  const handleBooking = (flight) => {
    const {
      flightNo,
      sourceLocation,
      destLocation,
      totalTime,
      businessPrice,
      economyPrice,
      firstClassPrice,
    } = flight;

    console.log("inside handle : " + flightNo + sourceLocation, destLocation);
    navigate("/booking", {
      state: {
        flightNo: flightNo,
        sourceLocation: sourceLocation,
        destLocation: destLocation,
        totalTime: totalTime,
        businessPrice: businessPrice,
        economyPrice: economyPrice,
        firstClassPrice: firstClassPrice,
      },
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/getallflights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
      });
  }, [flights]);

  return (
    <Container>
      <NavBar />
      <Row className="mt-5">
        <Col className="col-6">
          <select
            value={searchSource}
            onChange={(e) => setSearchSource(e.target.value)}
            class="form-select"
          >
            <option value="">Search Source</option>
            <option value="Lahore, Pakistan">Lahore, Pakistan</option>
            <option value="London, United Kingdom">
              London, United Kingdom
            </option>
            <option value="Toronto, Canada">Toronto, Canada</option>
            <option value="Tokyo, Japan">Tokyo, Japan</option>
            <option value="Delhi, India">Delhi, India</option>
            <option value="Istanbul, Turkey">Istanbul, Turkey</option>
            <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
          </select>
        </Col>
        <Col className="col-6">
          <select
            value={searchDest}
            onChange={(e) => setSearchDest(e.target.value)}
            class="form-select"
          >
            <option value="">Search destination</option>
            <option value="London, United Kingdom">
              London, United Kingdom
            </option>
            <option value="Lahore, Pakistan">Lahore, Pakistan</option>
            <option value="Toronto, Canada">Toronto, Canada</option>
            <option value="Tokyo, Japan">Tokyo, Japan</option>
            <option value="Delhi, India">Delhi, India</option>
            <option value="Istanbul, Turkey">Istanbul, Turkey</option>
              <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
          </select>
        </Col>
        
      </Row>
      <Row>
        <Col>
          <div className="container mt-5">
          
            {!searchSource &&
              !searchDest &&
              flights.map((flight) => {
                return (
                  <div className="row view-flight-box mt-4 p-3">
                    <div className="col-4">
                      <div>
                        <text className="locations bg-white">
                          <b>{flight.sourceLocation}</b> to{" "}
                          <b>{flight.destLocation}</b>
                        </text>

                        <p>
                          {" "}
                          Departure date : {flight.startDate} <br />
                          Departure time : {flight.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div>
                        <text> Flight No : {flight.flightNo} </text>
                        <p style={{ color: "red" }}>
                          {" "}
                          Seats available : {flight.seats - flight.noOfPassengers} 
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="price-outer-div">
                        <text className="price">
                          Price starting from : <b>${flight.economyPrice}</b>
                        </text>
                      </div>
                    </div>
                    <div className="col-2">
                      <Button
                        onClick={() => handleBooking(flight)}
                        className="btn btn-danger btn-lg w-75"
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                );
              })}
                {searchSource &&
              searchDest &&
              flights
                .filter(
                  (flight) =>
                    flight.sourceLocation === searchSource &&
                    flight.destLocation === searchDest
                )
                .map((flight) => {
                  return (
                    <div className="row view-flight-box mt-4 p-3">
                    <div className="col-4">
                      <div>
                        <text className="locations bg-white">
                          <b>{flight.sourceLocation}</b> to{" "}
                          <b>{flight.destLocation}</b>
                        </text>

                        <p>
                          {" "}
                          Departure date : {flight.startDate} <br />
                          Departure time : {flight.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div>
                        <text> Flight No : {flight.flightNo} </text>
                        <p style={{ color: "red" }}>
                          {" "}
                          Seats available : {flight.seats}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="price-outer-div">
                        <text className="price">
                          Price starting from : <b>${flight.economyPrice}</b>
                        </text>
                      </div>
                    </div>
                    <div className="col-2">
                      <Button
                        onClick={() => handleBooking(flight)}
                        className="btn btn-danger btn-lg w-75"
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                  );
                })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchFlights;
