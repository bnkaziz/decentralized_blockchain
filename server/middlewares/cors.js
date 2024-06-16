const cors = require("cors");

var whitelist = new Set([
  "http://localhost:3000",
  "https://decentralizedblockchain-production.up.railway.app",
  "https://railway.app",
  "https://centralizedrefundsystem.netlify.app",
  "https://netlify.app",
]);

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
};

module.exports = cors(corsOptions);
