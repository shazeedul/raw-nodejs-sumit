const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environments');

const server = {};

server.handleReqRes = handleReqRes;

server.createServer = () => {
    const createServerVariable = http.createServer(handleReqRes);
    createServerVariable.listen(environment.port, () => {
        console.log(`Environment variable: ${process.env.NODE_ENV}`);
        console.log(`Server is listening on port ${environment.port}`);
    });
}


server.init = () => {
    server.createServer();
}

module.exports = server;