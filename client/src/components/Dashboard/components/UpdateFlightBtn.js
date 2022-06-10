import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

function UpdateFlightBtn(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [flightNo, setFlightNo] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [totalTime, setTotalTime] = useState();
  const [seats, setSeats] = useState();

  useEffect(() => {
    setFlightNo(props.flightNo);
    setSourceLocation(props.sourceLocation);
    setDestLocation(props.destLocation);
    setStartDate(props.startDate);
    setStartTime(props.startTime);
    setTotalTime(props.totalTime);
    setSeats(props.seats);
  }, [props.flightNo]);

  const handleUpdateFlight = (e) => {
    e.preventDefault();
    if (!flightNo || !sourceLocation || !destLocation) {
      alert("Empty fields are not allowed");
      return;
    }

    if (flightNo.length !== 4) {
      alert("flight number should be of 4 digits");
      return;
    }

    if (sourceLocation === destLocation) {
      alert("source and destination can't be same");
      return;
    }

    const latestDate = new Date();
    if (latestDate > startDate) {
      alert("Please select a valid date.");
      return;
    }

    if (
      flightNo &&
      sourceLocation &&
      destLocation &&
      startDate &&
      startTime &&
      totalTime &&
      seats
    ) {
      fetch("http://localhost:3001/updateflight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          flightNo,
          sourceLocation,
          destLocation,
          startDate,
          startTime,
          totalTime,
          seats,
        }),
      });
      alert("Successfully updated flight");
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <>
      <Button variant="secondary" className=" mt-1 w-75" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Flight Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateFlight}>
            <input
              value={flightNo}
              onChange={(e) => setFlightNo(e.target.value)}
              type="number"
              placeholder="Flight Number"
              class="form-control"
            />
            <br />
            <select
              value={sourceLocation}
              onChange={(e) => setSourceLocation(e.target.value)}
              class="form-select"
            >
              <option value="">Select source location</option>
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
            <br />
            <select
              value={destLocation}
              onChange={(e) => setDestLocation(e.target.value)}
              class="form-select"
            >
              <option value="">Select destination location</option>
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
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
              placeholderText="Select start date"
            />
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              className="form-control mt-3"
              placeholder="Select start time"
              
            />

            <input
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
              type="number"
              placeholder="Total trip time"
              class="form-control mt-3"
              min="1"
            />

            <input
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              type="number"
              placeholder="Total seats"
              class="form-control mt-3"
              min="1"
            />

            <input
              type="submit"
              value="Add"
              className="btn btn-primary w-100 mt-4"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateFlightBtn;
