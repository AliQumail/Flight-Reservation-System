const mongoose = require("mongoose");

const Passenger = new mongoose.Schema({
  name: { type: String, required: true },
  code : {type: String},
  sourceLocation : { type: String, required: true },
  destLocation : { type: String, required: true },
  age : { type: Number, required: true },
  country : { type: String, required: true },
  occupation : { type: String, required: true },
  seatNo : { type: Number, required: true },
  seatType : { type: String, required: true },
  nationalID : { type: Number, required: true, unique: true },
  passportNo : { type: Number, required: true, unique: true },
  cardNumber : { type: Number , required: true },
  flightNo : { type: Number, required: true },
  
});

const model = mongoose.model("PassengerData", Passenger);

module.exports = model;