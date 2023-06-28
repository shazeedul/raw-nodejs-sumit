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

utilities.randomString = (strLength) => {
    let length = strLength;
    length = typeof strLength === 'number' && strLength > 0 ? strLength : false;

    if (length) {
        const possibleCharacter = 'abcdefghijkmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i = 1; i <= length; i++) {
            const randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length));
            output += randomCharacter;
        }
        return output;
    }
    return false;
};

module.exports = utilities;
