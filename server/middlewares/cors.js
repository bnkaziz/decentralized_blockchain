const cors = require("cors");

var whitelist = new Set([
  "http://example1.com",
  "http://localhost:9982",
  "http://localhost:3000",
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