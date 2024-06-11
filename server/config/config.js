const node_env = process.env.NODE_ENV;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const config = {
  development: {
    db: {
      username,
      password,
      database,
      host,
      port,
    },
  },
  production: {
    db: {
      username,
      password,
      database,
      host,
      port,
    },
  },
};

module.exports = config[node_env];
