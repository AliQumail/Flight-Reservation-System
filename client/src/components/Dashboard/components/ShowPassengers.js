import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";



function AddFlightBtn(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/getallpassengers")
      .then((res) => res.json())
      .then((data) => {
        setPassengers(data);
      });
  }, [passengers]);

  const handleCancel = (id,flightNo) => {
    fetch("http://localhost:3001/cancelflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        flightNo: flightNo
      }),
    });
    alert("Passenger flight cancelled")
  }



  
  return (
    <>
      <Button variant="success" className="mt-1 w-75" onClick={handleShow}>
        Passengers
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Passengers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {
            passengers.filter(passenger => passenger.flightNo === props.id ).map((passenger) => {
              return (
                <div className="row bg-white">
                  <text>Name : <b>{[passenger.name]}</b></text>
                  <text>Age : {[passenger.age]}</text>
                  <text>Country : {[passenger.country]}</text>
                  <text>Occupation : {[passenger.occupation]}</text>
                  <text> Seat No : {[passenger.seatNo]}</text>
                  <text>Seat type : {[passenger.seatType]}</text>
                  <text>National ID : {[passenger.nationalID]}</text>
                  <text>Flight No : {[passenger.flightNo]}</text>
                  <text>{props.id}</text>
                  <button className="btn btn-danger btn-sm w-25 mb-5" onClick={() => handleCancel(passenger._id,passenger.flightNo)}>Cancel Flight</button>

                  
                  <hr/>
                </div>
              );
            }
        )}
           
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

export default AddFlightBtn;