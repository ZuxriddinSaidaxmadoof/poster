const {Router} = require("express")
const router = Router();
const module_user = require("./modules/users/user.module.js")
const module_task = require("./modules/tasks/task.module.js")



router.use("/user", module_user.router);
router.use("/task", module_task.router);


module.exports = {router};


