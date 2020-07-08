const express = require("express");
const app = express();
const userRouter = require("./src/routes/user");
const sellItemRouter = require("./src/routes/sellItems");
const buyItemRouter = require("./src/routes/buyItems");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("./src/db/mongoose");

app.use(express.json());
app.use(userRouter);
app.use(sellItemRouter);
app.use(buyItemRouter);
app.use(cookieParser());

app.listen(5000, () => {
  console.log("port running");
});
