// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { usersHandler } = require('./handlers/routeHandlers/usersHandler');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler');

const routes = {
    sample: sampleHandler,
    user: usersHandler,
    token: tokenHandler
};

module.exports = routes;