const {Router} = require("express")
const router = Router();
const module_user = require("./modules/users/user.module.js")


router.use("/api", module_user.router);

module.exports = {router};


