const express = require("express")
const router = express.Router()
const asod = require("jsonwebtoken")
const {registerUser, loginUser, getUser} = require("../controllers/user")
const jwt = require("jsonwebtoken")
const user = router
user.post("/register", async (req, res, next ) => {
    const result = await registerUser(req, res, next)
    if(result === "error"){
        res.json({
            "register": "failed",
            "password": "needs to be at least 4",
            "username": "needs to be at least 4"
        })
    }else {
     res.json({
        "register": "complete",
        "username": result.username
    })   
    }
    
})
user.post("/login", async (req, res, next) => {
    const token = await loginUser(req, res, next)
    res.json({user: {token}})
})
user.get("/", async (req, res, next) => {
    const result = await getUser(req, res, next)
    res.json(result)
})

module.exports = {user}