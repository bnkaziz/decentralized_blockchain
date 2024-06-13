const express = require("express");
const app = express();
const cors = require("./middlewares/cors");
const userRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const adminRouter = require("./routes/Admin");
const session = require("./middlewares/session");

// package.json:"start": "node --env-file=.env index.js"

// If running behind a proxy
// app.set("trust proxy", 1);

app.options("*", cors);
app.use(cors);

// Database
const db = require("./models");

// Session
app.use(session);

app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log("Server running on port: " + port);
  });
});
