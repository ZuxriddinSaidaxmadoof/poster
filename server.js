const express = require("express");
const app = express();
const {port} = require("./config/index.js");
const routes = require("./src/routes/app_module.js")
// const views = require("./src/routes/app_module.js")

const {join} = require("path")
const cookieParser = require('cookie-parser');




app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(require("cors")("*"));
app.use("/api", routes.router);
app.use(cookieParser());



app.listen(port, () => {
    console.log(`Server run on port http://localhost:${port}`);
})
