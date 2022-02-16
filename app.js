"use strict"
require("dotenv").config();
const express = require("express");

const path = require("path");
const PORT = 3000;
const routerIndex = require("./routes/index")
const app = express();
const hbs = require("hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
hbs.registerPartials(path.join(__dirname, "./views/partials"));
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "hbs");

app.use("/", routerIndex);




app.listen(PORT, () => { console.log(`servidor corriendo en  http://localhost:${PORT}`); })