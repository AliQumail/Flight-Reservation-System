const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Admin = require("./models/admin.model");
const Passenger = require("./models/passenger.model");
const ScheduleFlight = require("./models/scheduleFlight.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/airlineDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const start = async function() {
//     const newPassword = await bcrypt.hash("admin123", 2);
//     Admin.create({
//         adminId: "admin",
//         password: newPassword
//     });

// }
// start()

app.post("/addflight", async (req, res) => {
  const {
    flightNo,
    sourceLocation,
    destLocation,
    startDate,
    startTime,
    totalTime,
    seats,
  } = req.body;
  ScheduleFlight.create({
    flightNo: flightNo,
    sourceLocation: sourceLocation,
    destLocation: destLocation,
    startDate: startDate.slice(0, 9),
    startTime: startTime,
    seats: seats,
    totalTime: totalTime,
    economyPrice: totalTime * 75,
    businessPrice: totalTime * 175,
    firstClassPrice: totalTime * 325,
    noOfPassengers: 0,
  });
});

app.post("/addpassenger", async (req, res) => {
  const {
    name,
    code,
    age,
    sourceLocation,
    destLocation,
    nationalID,
    passportNo,
    occupation,
    cardNumber,
    seatNo,
    seatType,
    country,
    flightNo,
  } = req.body;

  Passenger.create({
    name: name,
    code: code,
    age: age,
    nationalID: nationalID,
    passportNo: passportNo,
    occupation: occupation,
    cardNumber: cardNumber,
    seatNo: seatNo,
    seatType: seatType,
    country: country,
    flightNo: flightNo,
    sourceLocation: sourceLocation,
    destLocation: destLocation,
  });

  const getflight = await ScheduleFlight.findOne({ flightNo });
  const newPassengers = (await getflight.noOfPassengers) + 1;
  console.log(newPassengers);

  await ScheduleFlight.findOneAndUpdate(
    { flightNo },
    { noOfPassengers: newPassengers }
  );
});

app.get("/getallflights", async (req, res) => {
  const flights = await ScheduleFlight.find();
  return res.json(flights);
});

app.get("/getallpassengers", async (req, res) => {
  const passengers = await Passenger.find();
  return res.json(passengers);
});

app.post("/deleteflight", (req, res) => {
  console.log("this -> " + req.body.id);
  ScheduleFlight.deleteOne({ _id: req.body.id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

app.post("/adminlogin", async (req, res) => {
  const admin = await Admin.findOne({
    adminId: req.body.adminId,
  });

  if (!admin) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    admin.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        adminId: admin.adminId,
      },
      "secret123"
    );

    return res.json({ status: "ok", admin: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/updateflight", async (req, res) => {
  console.log(req.body);

  ScheduleFlight.updateOne(
    { _id: req.body.id },
    {
      flightNo: req.body.flightNo,
      sourceLocation: req.body.sourceLocation,
      destLocation: req.body.destLocation,
      startDate: req.body.startDate.slice(0, 9),
      startTime: req.body.startTime,
      seats: req.body.seats,
      totalTime: req.body.totalTime,
      economyPrice: req.body.totalTime * 75,
      businessPrice: req.body.totalTime * 175,
      firstClassPrice: req.body.totalTime * 325,
    },
    function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    }
  );
});

app.post("/cancelflight", async (req, res) => {
  console.log("this -> " + req.body);
  const {flightNo} = req.body
  Passenger.deleteOne({ _id: req.body.id }, function (err) {
    if (err) return handleError(err);
  });
  const getflight = await ScheduleFlight.findOne({ flightNo });
  const newPassengers = (await getflight.noOfPassengers) - 1;
  console.log(newPassengers);

  await ScheduleFlight.findOneAndUpdate(
    { flightNo },
    { noOfPassengers: newPassengers }
  );
});

// app.post("/getpassengerdetails", async (req, res) => {
//   console.log(req.body)
//   const passenger = await Passenger.findOne({
//     _id: req.body.id,
//   });
//   console.log("hellow")
//   if (passenger) {
//     console.log("data is " + passenger);
//     return res.json({data: passenger});
//   }
//   return res.json({ status: "error", error: "Invalid" });

// })

app.listen(3001, () => {
  console.log("Working on port 3001");
});
