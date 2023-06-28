// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { usersHandler } = require('./handlers/routeHandlers/usersHandler');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler');
const { checkHandler } = require('./handlers/routeHandlers/checkHandler');

const routes = {
    sample: sampleHandler,
    user: usersHandler,
    token: tokenHandler,
    check: checkHandler,
};

module.exports = routes;