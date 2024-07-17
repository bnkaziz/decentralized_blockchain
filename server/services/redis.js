const redis = require("redis");

// Redis initialisation
let redisClient;
if (process.env.DEPLOYMENT === "local") {
  redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379",
  });
} else {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });
}

const start = async () => {
  await redisClient
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
};

start();

module.exports = redisClient;
