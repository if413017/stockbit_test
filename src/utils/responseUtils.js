/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

'use strict';

let resFormat;

module.exports = {
    success: function (message, data) {
        const count = data != null ? data.length : 0;
        resFormat =  {
            status: count === 0 ? 'false' : 'success',
            message: message,
            count: count,
            data: data
        }

        if (data === null || count === 0){
            delete resFormat.data;
            delete resFormat.count;
        }

        return resFormat;
    },

    /**
     * Wrap function result with count and data attribute eventhough it's a null
     *
     * @param message
     * @param data
     * @return {{data: *, count: number, message: *, status: string}}
     */
    successCompleteForm: function (message, data) {
        const count = data != null ? data.length : 0;
        resFormat =  {
            status: 'success',
            message: message,
            count: count,
            data: data
        }

        return resFormat;
    },

    OK: function (message, data) {
        const count = data != null ? data.length : 0;

        resFormat =  {
            status: 'OK',
            message: message,
            count: count,
            data: data
        }

        if (data === null || count === 0){
            delete resFormat.data;
            delete resFormat.count;
        }

        return resFormat;
    },

    failed: function (message, error) {
        return resFormat =  {
            status: 'failed',
            message: message,
            error: error
        }
    },

    /**
     * Wrap function result message and data before callback to routing layer
     *
     * @param message
     * @param data
     * @return {{message: *}}
     */
    wrapResult: function (message, data) {
        const resFormat = {
            message: message
        }

        if(data !== null || data.length > 0){
            resFormat.data = data;
        }
        return resFormat;
    }


}
