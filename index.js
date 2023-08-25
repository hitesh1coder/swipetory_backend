const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const StoryRoutes = require("./Routes/StoryRoute");
const AuthRoute = require("./Routes/AuthRoute");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: "Hello server" });
});

const port = process.env.PORT || 5000;

// DataBase Connection
mongoose
  .connect(process.env.MONGODB_PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => console.log("connection error: " + err));

//   listen on port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// usage of routes
app.use("/auth", AuthRoute);
app.use("/story", StoryRoutes);
