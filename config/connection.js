const development = {
  database: "devtracker",
  username: "devtracker",
  password: "DvTr@cK@$",
  host: "localhost",
  dialect: "mysql",
  stripeApiKey: process.env.STRIPESECRETKEY,
  emailId: process.env.EMAILID,
  emailPassword: process.env.EMAILPASSWORD
};

const testing = {
  database: "testDatabase",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: process.env.STRIPESECRETKEY,
  emailId: process.env.EMAILID,
  emailPassword: process.env.EMAILPASSWORD
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
  stripeApiKey: process.env.STRIPESECRETKEY,
  emailId: process.env.EMAILID,
  emailPassword: process.env.EMAILPASSWORD
};

module.exports = {
  development,
  testing,
  production
};
