const redis = require("redis");

// Redis initialisation
const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

const start = async () => {
  await redisClient
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
};

start();

module.exports = redisClient;
