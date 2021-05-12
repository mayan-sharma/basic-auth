const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // gets token from header
    const token = req.header("x-auth-token");
  
    // if token not found
    if (!token) return res.send("Access Denied!");

    try {
        // decodes token
        const decoded = jwt.verify(token, process.env.SECRET.toString());
        
        // gets user from the decoded token
        req.user = decoded;
        
        next();
    } catch (err) {
        res.status(400).send("Invalid token!");
    } 
};
