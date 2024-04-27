const redisClient = require("../services/redis");

// Function to add session ID to a set for a user
const addSessionToUserSet = async (user_id, sessionId) => {
  console.log(`user_sessions:${user_id}`, `sess:${sessionId}`);
  await redisClient.sAdd(
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
const deleteAllUserSessions = async (user_id, callback) => {
  console.log(`(Redis) Accessing for user ${user_id}...`);
  const sessionIDs = await redisClient
    .sMembers(`user_sessions:${user_id}`)
    .catch((err) => callback(err));

  if (!sessionIDs) return;

  console.log(`This user has ${sessionIDs.length} sessions.`);

  if (sessionIDs.length > 0) {
    sessionIDs.forEach((sessionID) => {
      console.log(`Deleting session ${sessionID} ...`);
      redisClient.del(sessionID);
    });
  }

  console.log(`Deleting set of sessions...`);
  redisClient.del(`user_sessions:${user_id}`);

  // , (err, sessionIds) => {
  //   console.log("if (err)");
  //   if (err) return callback(err);
  //   console.log("if (length === 0)");
  //   if (sessionIds.length === 0) return callback();

  //   // Delete all sessions
  //   console.log("(Redis) For each session -> delete");
  //   sessionIds.forEach((sessionId) => {
  //     redisClient.del(sessionId);
  //   });

  //   // Delete the set containing now-deleted session IDs
  //   console.log("(Redis) Deleting the set of all his sessions...");
  //   redisClient.del(`user_sessions:${user_id}`, (err, reply) => {
  //     if (err) {
  //       return callback(err);
  //     } else {
  //       callback(
  //         null,
  //         `Deleted ${sessionIds.length} sessions for user ${user_id}`
  //       );
  //     }
  //   });
  // });
};

module.exports = {
  addSessionToUserSet,
  deleteAllUserSessions,
};
