// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { usersHandler } = require('./handlers/routeHandlers/usersHandler');

const routes = {
    sample: sampleHandler,
    user: usersHandler,
};

module.exports = routes;