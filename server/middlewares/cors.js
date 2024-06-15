const cors = require("cors");

var whitelist = new Set([
  "https://decentralizedblockchain-production.up.railway.app",
  // `http://0.0.0.0:${process.env.PORT || 3000}`,
  // `https://0.0.0.0:${process.env.PORT || 3000}`,
  // "http://example1.com",
  // "http://example1.com",
  // "http://localhost:9982",
  // "http://127.0.0.1:9982",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://magical-pegasus-f42cbc.netlify.app",
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
