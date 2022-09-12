const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
exports.auth = function(req, res, next){
    const headers = req.headers.authorization
    if(headers && headers != "Bearer no user found" && headers != "Bearer null"){
        console.log(headers)
        // gets bearer token and splits it then takes the token.
        const auth = headers.split(" ")[1]
        req.user = jwt.verify(auth, JWT_SECRET)
        next() 
    }else {
        next()
    }
}
exports.verify = (req, res, next) => {
    if(req.user){
        next()
    }else{
        res.send(401).status("not logged in")
    }
}