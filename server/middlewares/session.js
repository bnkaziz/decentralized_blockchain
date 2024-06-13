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
  secret: "crypto-ali",
  saveUninitialized: false,
  resave: false,
  name: "sessionID",
  cookie: {
    secure: true, // IT SHOULD BE TRUE IN PRODUCTION. If true, only transmits cookie over https.
    // httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60, // in ms
    domain: process.env.LOCALHOST,
    path: "/",
  },
});
