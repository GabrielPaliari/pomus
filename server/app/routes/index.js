// routes/index.js
const userRoutes = require('./user_routes');
const matchRoutes = require('./match_routes');
const eventRoutes = require('./event_routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  matchRoutes(app, db);
  eventRoutes(app, db);
  // Other route groups could go here, in the future
};