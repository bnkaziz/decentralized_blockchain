const express = require("express");
const app = express();
const cors = require("./middlewares/cors");
const userRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const adminRouter = require("./routes/Admin");
const session = require("./middlewares/session");

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

db.sequelize.sync().then(() => {
  app.listen(9982, () => {
    console.log("Server running on port: 9982");
  });
});
