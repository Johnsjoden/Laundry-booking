const express = require("express")
const router = express.Router()
const asod = require("jsonwebtoken")
const {registerUser, loginUser} = require("../controllers/user")
const jwt = require("jsonwebtoken")
const user = router
user.post("/register", async (req, res, next ) => {
    const result = await registerUser(req, res, next)
    res.json({
        "register": "complete",
        "username": result.username
    })
})
user.post("/login", async (req, res, next) => {
    console.log(req.body)
    const token = await loginUser(req, res, next)
    res.json({user: {token}})
})

module.exports = {user}