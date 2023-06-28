const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

const app = {};

app.handleReqRes = handleReqRes;

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Environment variable: ${process.env.NODE_ENV}`);
        console.log(`Server is listening on port ${environment.port}`);
    });
};

app.createServer();
