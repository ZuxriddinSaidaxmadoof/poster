const {sign, verify} = require("jsonwebtoken")
const {jwtKey} = require("../../config/index.js")

function getToken(data){
    return sign(data, jwtKey);
}

function verifyToken(token){
    return verify(token, jwtKey);
}



module.exports = {getToken, verifyToken}
