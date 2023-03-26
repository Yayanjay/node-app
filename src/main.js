/* eslint-disable no-unused-vars */
const express = require("express")
const router = express.Router();
const profile = require('./routes/profile')

router.use("/api/profile", profile)

module.exports = router