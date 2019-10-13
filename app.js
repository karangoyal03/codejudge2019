var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const productsRouter = require("./routes/products");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/products", productsRouter);

module.exports = app;
