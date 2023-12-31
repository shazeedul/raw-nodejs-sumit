const environments = {};

// Local (default) environment
environments.local = {
    port: 3000,
    envName: 'local',
    secretKey: 'yyfrygryygygygjvjdjg',
    maxChecks: 5,
    twilio: {
        fromPhone: '+14178923941',
        accountSid: 'AC64bedf61d7bef97c456982cb79718377',
        authToken: 'aeec883971c2b679ecc9e274bc8305f8',
    },
};

// Production environment
environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'yyfrygryygygygjvjdjg',
    maxChecks: 5,
    twilio: {
        fromPhone: '+14178923941',
        accountSid: 'AC64bedf61d7bef97c456982cb79718377',
        authToken: 'aeec883971c2b679ecc9e274bc8305f8',
    },
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'local';

// Check that the current environment is one of the environments above, if not, default to local
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.local;

// Export the module
module.exports = environmentToExport;
