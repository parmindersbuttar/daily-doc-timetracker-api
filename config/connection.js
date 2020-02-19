const development = {
  database: "timeTracker",
  username: "timetracker",
  password: "Tim$Tr@Ck$r@123",
  host: "localhost",
  dialect: "mysql",
  stripeApiKey: "sk_test_Ekic7MilcWatXXX6sk0hR46K00TKet5uTm"
};

const testing = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: "sk_test_Ekic7MilcWatXXX6sk0hR46K00TKet5uTm"
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: "sk_test_Ekic7MilcWatXXX6sk0hR46K00TKet5uTm"
};

module.exports = {
  development,
  testing,
  production
};
