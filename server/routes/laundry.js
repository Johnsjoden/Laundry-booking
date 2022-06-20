const express = require("express")
const {verify} = require("../controllers/auth")
const {getAllLaundries, bookLaundry, createLaundry, unbookLaundry} = require("../controllers/laundry")
const laundry = express.Router()

laundry.get("/create", verify, async (req, res, next) => {
    const result = await createLaundry(req.query)
    res.json({result})
})
laundry.post("/", verify, async (req, res, next) => {
    const result = await bookLaundry(req.body, req.user.userId)
    res.json({result})
})
laundry.get("/", verify, async (req, res, next) => {
    const result = await getAllLaundries(req.query)
    res.json({result})
})
laundry.delete("/:id", verify, async (req, res, next) => {
    const result = await unbookLaundry(req, res, next)
    res.json({result})
})
module.exports = {laundry}