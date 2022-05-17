const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
//body parser:

//Use this array as your (in-memory) data store.
let bookings = [
  {
    id: 1,
    title: "Mr",
    firstName: "Jimi",
    surname: "Hendrix",
    email: "jimi@example.com",
    roomId: 2,
    checkInDate: "2017-11-21",
    checkOutDate: "2017-11-23",
  },
  {
    id: 2,
    title: "King",
    firstName: "James",
    surname: "Brown",
    email: "jamesbrown@example.com",
    roomId: 1,
    checkInDate: "2018-02-15",
    checkOutDate: "2018-02-28",
  },
  {
    id: 3,
    title: "Queen",
    firstName: "Aretha",
    surname: "Franklin",
    email: "aretha@example.com",
    roomId: 5,
    checkInDate: "2018-03-01",
    checkOutDate: "2018-04-09",
  },
  {
    id: 4,
    title: "Mr",
    firstName: "Stevie",
    surname: "Wonder",
    email: "stevie@example.com",
    roomId: 6,
    checkInDate: "2017-12-25",
    checkOutDate: "2018-01-03",
  },
  {
    id: 5,
    title: "Mr",
    firstName: "John",
    surname: "Lennon",
    email: "lennon@example.com",
    roomId: 3,
    checkInDate: "2017-08-30",
    checkOutDate: "2017-10-02",
  },
];

//Read one booking, specified by an ID
app.get("/bookings/:searchId", (req, res) => {
  const { searchId } = req.params;
  const searchBooking = bookings.find((booking) => booking.id == searchId);
  if (searchBooking) {
    return res.json(searchBooking);
  } else {
    return res.status(404).send("id is not valid");
  }
});

//Delete a booking, specified by an ID
app.delete("/bookings/:bookingId", (req, res) => {
  const { bookingId } = req.params;
  const deletedBooking = bookings.find((booking) => {
    return booking.id === Number(bookingId);
  });
  if (deletedBooking) {
    bookings = bookings.filter((item) => item.id !== Number(bookingId));
    res.json(bookings);
  } else {
    res.status(404).json(`no booking with the id of ${bookingId}`);
  }
});
app.get("/", (req, res) => {
  res.send("Hotel booking server.  Ask for /bookings, etc.");
});
//Create a new booking:
app.post("/bookings", (req, res) => {
  const {
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate,
  } = req.body;
  if (
    title === undefined ||
    firstName === undefined ||
    surname === undefined ||
    email === undefined ||
    roomId === undefined ||
    checkInDate === undefined ||
    checkOutDate === undefined
  ) {
    const response = `msg: you are missing the ${
      !title
        ? "title"
        : !firstName
        ? "firstName"
        : !surname
        ? "surname"
        : !email
        ? "email"
        : !roomId
        ? "roomId"
        : !checkInDate
        ? "checkInDate"
        : "checkOutDate"
    } key`;
    return res.status(400).json(response);
  }
  const bookingObject = {
    id: bookings.length,
    title,
    firstName,
    surname,
    email,
    roomId,
    checkInDate,
    checkOutDate,
  };
  bookings.push(bookingObject);
  res.send(bookings);
});

//Read all bookings
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT || 4000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
