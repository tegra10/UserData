"use strict";
const express = require("express");
const Router = express.Router();
const { getUser, postUser } = require("../controllers/user.controller.js");

Router.get("/", getUser);
Router.post("/", postUser);

module.exports = Router;
