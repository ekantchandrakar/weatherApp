const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Get
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App...",
    name: "Ekant"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me...",
    name: "Ekant"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How can I help you!!!",
    title: "Help",
    name: "Ekant"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide the address"
    });
  }
  geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lattitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});


app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found",
    name: "Ekant"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "404 - Page Not Found",
    name: "Ekant"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
