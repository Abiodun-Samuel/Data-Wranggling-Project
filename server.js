const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const writeStream = fs.createWriteStream("post.csv");
const homeRoute = require("./routes/homeRoutes.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", homeRoute);

// app.use(express.static(path.join(__dirname, "/public")));
//   res.sendFile(path.resolve(__dirname, "public", "index.html"))

// app.get("/", (req, res) => {
//   res.send("Welcome to my page");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App serving on " + PORT);
});
