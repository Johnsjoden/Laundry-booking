const express = require("express")
const {verify} = require("../controllers/auth")
const {getLaundry} = require("../controllers/laundry")
const laundry = express.Router()

laundry.get("/", verify, async (req, res, next) => {
    const result = await getLaundry(req.query)
    res.json({result})
})
laundry.post("/", verify, async (req, res, next) => {
    const update = req.body
    res.json({"hello": "hello"})
})
module.exports = {laundry}