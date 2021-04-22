/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

'use script';

const model = require('@models/index');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const responseUtils = require('@utils/responseUtils');

module.exports = {

    /**
     * Create a user
     *
     *
     * @async
     * @function
     * @desc
     * @param dataObjcet
     * @param callback
     * @returns {Object} data of created user
     */
    createUser: async (dataObjcet, callback) => {
        model.USER.create(dataObjcet).then( res => {

            callback(null, responseUtils.wrapResult("Successfully create a new user", res));
            return;
        }).catch( e => {
            callback(e);
        })
    }
}
