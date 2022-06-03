const express = require("express")
const {verify} = require("../controllers/auth")
const {getLaundry, bookLaundry} = require("../controllers/laundry")
const laundry = express.Router()

laundry.get("/", verify, async (req, res, next) => {
    const result = await getLaundry(req.query)
    res.json({result})
})
laundry.post("/:id", verify, async (req, res, next) => {
    const result = await bookLaundry(req.params.id, req.body)
    res.json(result)
})
module.exports = {laundry}