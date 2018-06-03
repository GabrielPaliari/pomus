// routes/index.js
const userRoutes = require('./user_routes');
const matchRoutes = require('./match_routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  matchRoutes(app, db);
  // Other route groups could go here, in the future
};