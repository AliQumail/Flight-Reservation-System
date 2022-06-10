import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Passenger = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    flightNo,
    sourceLocation,
    destLocation,
    totalTime,
    economyPrice,
    firstClassPrice,
    businessPrice
  } = state; // Read values passed on state

  const [f, setF] = useState(flightNo);
  const [sl, setsl] = useState(sourceLocation);
  const [dl, setdl] = useState(destLocation);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [seatType, setSeatType] = useState("");
  const [seatNo, setSeatNo] = useState(Math.floor(Math.random() * 200 + 1));
  const [code,setCode] = useState(Date.now());

  
  const handleBookFlight = (e) => {
    e.preventDefault();
    
    if (!name || !age || !country || !occupation || !passportNo || !nationalID || !cardNumber || !cardMonth || !cardYear || !seatType) {
      alert("Empty fields are not allowed");
      return;
    }
    if (passportNo.length !== 9) {
      alert("Passport number should be of 9 digits");
      return;
    }
    if (nationalID.length !== 13) {
      alert("national ID should be of 13 digits");
      return 
    }
    if (cardNumber.length !== 16) {
      alert("card number should be of 16 digits");
      return 
    }

    setCode(Date.now())
    alert("Please save this unique key to access your flight details at /passenger/:key" + code);
   
      fetch("http://localhost:3001/addpassenger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          code,
          age,
          country,
          occupation,
          nationalID,
          cardNumber,
          passportNo,
          sourceLocation,
          destLocation,
          seatType,
          seatNo,
          flightNo,
        }),
      });
      
      navigate("/ticket", {
        state: {
          name: name,
          age: age,
          code:code,
          country: country,
          occupation: occupation,
          seatType: seatType,
          passportNo: passportNo,
          nationalID: nationalID,
          flightNo: f,
          sourceLocation: sl,
          destLocation: dl,
          seatNo: seatNo,
        },
      });
    
  };

  return (
    <Container>
      <Row className="mt-5">
        <h5 className="text-center">Please enter your details</h5>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center ">
          <form className="w-75 mt-5 " onSubmit={handleBookFlight}>
            <p className="h5">
              Booking for flight number <b>{f}</b> from <b>{sourceLocation}</b>{" "}
              to <b>{destLocation}</b>{" "}
            </p>
            <div class="form-group mt-5">
              <label for="exampleFormControlInput1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g Jone Herbet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Age</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g 23"
                min="1"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Country</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g Pakistan"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Occupation</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g Doctor"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>

            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">National ID</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="13 Digit number "
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Passport No</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="9 Digit passport number"
                value={passportNo}
                onChange={(e) => setPassportNo(e.target.value)}
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControlSelect1">Select seat type</label>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                value={seatType}
                onChange={(e) => setSeatType(e.target.value)}
              >
                <option value="">Select from options below</option>
                <option value="Economy">Economy - ${economyPrice}</option>
                <option value="Business">Business ${businessPrice}</option>
                <option value="First Class">First class ${firstClassPrice}</option>
              </select>
            </div>
            <h5 className="mt-5">Payment options</h5>
            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Card holder</label>
              <input
                type="string"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g Jone Murray"
              />
            </div>
            <div class="form-group mt-4">
              <label for="exampleFormControlInput1">Credit/Debit card</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="16 Digit Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <Row className="mt-4">
              <Col>
                <div class="form-group">
                  <label for="exampleFormControlInput1">CVC</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="eg 123"
                  />
                </div>
              </Col>
              <Col>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Expiration</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={cardMonth}
                    onChange={(e) => setCardMonth(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div class="form-group">
                  <label for="exampleFormControlInput1"></label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="YYYY"
                    min="2022"
                    value={cardYear}
                    onChange={(e) => setCardYear(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <input
              type="submit"
              className="btn btn-warning mt-5 btn-lg w-25"
              value="Book"
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Passenger;
