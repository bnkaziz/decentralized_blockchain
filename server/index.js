const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const session = require("./middlewares/session");

// If running behind a proxy
// application.set("trust proxy", 1);

// Database
const db = require("./models");

// Session
app.use(session);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);

db.sequelize.sync().then(() => {
  app.listen(9982, () => {
    console.log("Server running on port: 9982");
  });
});
