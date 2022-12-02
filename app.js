const express = require("express");
const cors = require("cors");
const app = express();

// setting

app.set("port", process.env.PORT || 8000);

// middleware

app.use(cors());
app.use(express.json());

// routes

app.use("/api/v1/post", require("./routes/post.routes"));
app.use("/api/v1/user", require("./routes/users.routes"));

module.exports = app;
