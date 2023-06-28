const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('../../handlers/routeHandlers/tokenHandler');

const handler = {};

handler.usersHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof (requestProperties.body.tosAgreement) === 'boolean' && requestProperties.body.tosAgreement ? requestProperties.body.tosAgreement : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read('users', phone, (err1, user) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                };

                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully'
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create user'
                        });
                    }
                });
            }
            else {
                callback(500, {
                    error: 'There was a problem in server side'
                });
            }
        });
    } else {
        callback(404, {
            message: 'Your request is not valid'
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('users', phone, (err, user) => {
                    const userObject = { ...parseJSON(user) };
                    if (!err && userObject) {
                        delete userObject.password;
                        delete userObject.tosAgreement;
                        callback(200, userObject);
                    } else {
                        callback(404, {
                            error: 'Requested user was not found'
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failure!'
                });
            }
        });
    }
    else {
        callback(404, {
            error: 'Requested user was not found'
        });
    }
};

handler._users.put = (requestProperties, callback) => {
    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    data.read('users', phone, (err1, user) => {
                        const userData = { ...parseJSON(user) };
                        if (!err1 && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (password) {
                                userData.password = hash(password);
                            }
                            data.update('users', phone, userData, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        message: 'User was updated successfully'
                                    });
                                } else {
                                    callback(500, {
                                        error: 'There was a problem in server side'
                                    });
                                }
                            });
                        }
                        else {
                            callback(400, {
                                error: 'You have a problem in your request'
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentication failure!'
                    });
                }
            });
        }
        else {
            callback(400, {
                error: 'You have a problem in your request'
            });
        }
    }
    else {
        callback(400, {
            error: 'Invalid phone number. Please try again!'
        });
    }
};

handler._users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === "string" && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    data.read('users', phone, (err1, userData) => {
                        if (!err1 && userData) {
                            data.delete("users", phone, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        "massage": "User was deleted successfully!"
                                    })
                                }
                            });
                        } else {
                            callback(500, { "error": "There was a server side problem" })
                        }
                    });
                } else {
                    callback(403, { "error": "Authentication failure!" })
                }
            });
    } else {
        callback(400, { "error": "There was a problem in your server" })
    }
};

module.exports = handler;