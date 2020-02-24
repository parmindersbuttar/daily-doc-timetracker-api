const development = {
  database: "timeTracker",
  username: "timetracker",
  password: "Tim$Tr@Ck$r@123",
  host: "localhost",
  dialect: "mysql",
  stripeApiKey: "sk_test_eld7kXhDPjw8QlcfHfxDZvTA00ghT2stUG",
  emailId: "dailydocapp@gmail.com",
  emailPassword: "scotty1999"
};

const testing = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: "sk_test_eld7kXhDPjw8QlcfHfxDZvTA00ghT2stUG",
  emailId: "dailydocapp@gmail.com",
  emailPassword: "scotty1999"
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: "sk_test_eld7kXhDPjw8QlcfHfxDZvTA00ghT2stUG",
  emailId: "dailydocapp@gmail.com",
  emailPassword: "scotty1999"
};

module.exports = {
  development,
  testing,
  production
};
