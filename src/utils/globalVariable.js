const path = require('path');
const env = require('dotenv').config();

const apiVersion = 'v1';
const endPointPrefix = '/API/' + apiVersion + '/';

function getEndPoint() {
    return endPointPrefix;
}

function getPath() {
    return path.resolve(__dirname);
}

module.exports = {
    getEndPoint,
    getPath
}
