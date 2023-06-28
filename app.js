// const { sendTwilioSms } = require('./helpers/notifications');

const server = require('./lib/server');
const worker = require('./lib/worker');

const app = {};

app.init = () => {
    server.init();
    worker.init();
};

app.init();

module.exports = app;

// sendTwilioSms('01731993333', 'Hello World!', (err) => {
//     console.log(`This is the error: ${err}`);
// });
// sendTwilioSms('01571228259', 'Hello World!', (err) => {
//     console.log(`This is the error: ${err}`);
// });
