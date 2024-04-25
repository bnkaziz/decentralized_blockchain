const redisClient = require("../services/redis");

// Function to add session ID to a set for a user
const addSessionToUserSet = (user_id, sessionId) => {
  console.log(`user_sessions:${user_id}`, `sess:${sessionId}`);
  redisClient.sAdd(
    `user_sessions:${user_id}`,
    `sess:${sessionId}`,
    (err, reply) => {
      if (err) {
        console.error("Error adding session to set:", err);
      } else {
        console.log(`Session ${sessionId} added to set for user ${userId}`);
      }
    }
  );
  console.log("AFTER!!!");
};

// Function to delete all sessions for a user
const deleteAllUserSessions = (user_id, callback) => {
  redisClient.sMembers(`user_sessions:${user_id}`, (err, sessionIds) => {
    if (err) return callback(err);
    if (sessionIds.length === 0) return callback();

    // Delete all sessions
    sessionIds.forEach((sessionId) => {
      redisClient.del(sessionId);
    });

    // Delete the set containing now-deleted session IDs
    redisClient.del(`user_sessions:${user_id}`, (err, reply) => {
      if (err) {
        return callback(err);
      } else {
        callback(
          null,
          `Deleted ${sessionIds.length} sessions for user ${user_id}`
        );
      }
    });
  });
};

module.exports = {
  addSessionToUserSet,
  deleteAllUserSessions,
};
