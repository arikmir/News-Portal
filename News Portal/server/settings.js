//Settings
const settings = {
  port: process.env.PORT || 3000,

  newsApiUrl: process.env.NEWS_API_URL || "https://newsapi.org/",

  newsApiToken:
    process.env.NEWS_API_TOKEN || "c76e34e380c04ce5a2983ef4e74c3a7e",
  ipApiUrl: process.env.IP_API_URL || "http://ip-api.com/batch",
  ipApiFields: process.env.IP_API_FIELDS || 57539,
  logLevel: process.env.LOG_LEVEL || "dev",
};

module.exports = settings;
