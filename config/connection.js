const development = {
  database: "devtracker",
  username: "devtracker",
  password: "DvTr@cK@$",
  host: "localhost",
  dialect: "mysql"
};

const testing = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "mysql" || "sqlite" || "postgres"
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql" || "sqlite" || "postgres"
};

module.exports = {
  development,
  testing,
  production
};
