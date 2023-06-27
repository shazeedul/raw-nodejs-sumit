const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environments.secretKey)
            .update(str)
            .digest('hex');
        return hash;
    } else {
        return false;
    }
};

module.exports = utilities;
