const express = require("express");
const app = express();
const userRouter = require("./src/routes/user");
const sellItemRouter = require("./src/routes/sellItems");
const buyItemRouter = require("./src/routes/buyItems");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
require("./src/db/mongoose");

app.use(express.json());
app.use(userRouter);
app.use(sellItemRouter);
app.use(buyItemRouter);
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
