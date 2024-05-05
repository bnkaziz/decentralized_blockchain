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
        console.log(`Session ${sessionId} added to set for user ${user_id}`);
      }
    }
  );
  console.log("AFTER!!!");
};

// (On logout) Delete the session from the user's set
const deleteSessionFromUserSet = async (user_id, sessionId, callback) => {
  const sessionIDs = await redisClient
    .sMembers(`user_sessions:${user_id}`)
    .catch((err) => callback(err));

  if (!sessionIDs) return;

  console.log(`This user has ${sessionIDs.length} sessions.`);
  if (sessionIDs.length > 0) {
    // If it's the last session then delete the set directly.
    if (sessionIDs.length === 1) {
      await redisClient.del(`user_sessions:${user_id}`);
    } else {
      await redisClient.sRem(`user_sessions:${user_id}`, `sess:${sessionId}`);
    }
  }
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
    sessionIDs.forEach(async (sessionID) => {
      console.log(`Deleting session ${sessionID} ...`);
      await redisClient.del(sessionID);
    });
  }

  console.log(`Deleting set of sessions...`);
  await redisClient.del(`user_sessions:${user_id}`);
};

module.exports = {
  addSessionToUserSet,
  deleteSessionFromUserSet,
  deleteAllUserSessions,
};
