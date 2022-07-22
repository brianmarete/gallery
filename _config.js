var config = {}

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;


// Update to have your correct username and password
config.mongoURI = {
  production: process.env.MONGO_DB_PROD_URI,
  development: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  test: process.env.MONGO_DB_TEST_URI,
};
module.exports = config;
