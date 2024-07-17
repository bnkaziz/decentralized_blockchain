const RedisStore = require("connect-redis").default;
const session = require("express-session");
const redisClient = require("../services/redis");
// import { createClient } from "redis";

// const RedisStore = connectRedis(session);

// redis configuration
// let redisClient = redis.createClient({
//   url: "redis://localhost:6379",
// });

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: "sessionID",
  cookie: {
    secure: process.env.NODE_ENV === "development" ? false : true, // IT SHOULD BE TRUE IN PRODUCTION. If true, only transmits cookie over https.
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 30, // in ms (set to 1 month)
    domain:
      process.env.NODE_ENV === "development" ? "localhost" : process.env.DOMAIN,
    path: "/",
  },
});
