const {hash, compare} = require("bcrypt");


async function hashPasword(data){
    const salt = 10;

    return await hash(data, salt) 
}

async function verifyPassword(data, hashData){
    return await compare(data, hashData);
}

module.exports = {hashPasword, verifyPassword};

