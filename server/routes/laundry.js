const express = require("express")
const {verify} = require("../controllers/auth")
const {getAllLaundries, bookLaundry, createLaundry} = require("../controllers/laundry")
const laundry = express.Router()

laundry.get("/create", verify, async (req, res, next) => {
    const result = await createLaundry(req.query)
    res.json({result})
})
laundry.post("/:id", verify, async (req, res, next) => {
    const result = await bookLaundry(req.params.id, req.user.userId)
    res.json(result)
})
laundry.get("/", verify, async (req, res, next) => {
    const result = await getAllLaundries(req.query)
    res.json({result})
})
module.exports = {laundry}