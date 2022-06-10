const mongoose = require("mongoose");

const ScheduleFlight = new mongoose.Schema({
  flightNo: { type: Number, required: true, unique: true },
  sourceLocation : { type: String, required: true },
  destLocation : { type: String, required: true },
  startDate : { type: String, required: true },
  startTime : { type: String, required: true },
  seats: { type: Number, required: true},
  economyPrice : { type: Number, required: true },
  businessPrice : { type: Number, required: true },
  firstClassPrice : { type: Number, required: true },
  totalTime : { type: Number, required: true },
  noOfPassengers : { type: Number, required: true }
});

const model = mongoose.model("scheduleFlightData",  ScheduleFlight);

module.exports = model;
