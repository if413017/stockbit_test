/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

const route = require('express').Router();
const httpStatus = require('http-status-codes');
const userServices = require('./userService');
const responseUtils = require('@utils/responseUtils');

route.post('/', async (req, res) => {
    try {
        const dataObject = req.body;

        await userServices.createUser(dataObject, (error, result)=>{
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed("Failed create a new user", error));
            } else {
                res.status(httpStatus.OK).send(responseUtils.success(result.message, result.data));
            }
        })
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
});

route.get('/', async (req, res) => {
    try {

        await userServices.getUser( (error, result)=>{
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed("Failed create a new user", error));
            } else {
                res.status(httpStatus.OK).send(result);
            }
        })
    } catch (e) {
        console.log(e)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
});

route.get('/refactor-code/:word', async (req, res) => {
    try {
        await userServices.refactorCode( req.params.word, (error, result)=>{
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed("Failed refactor code", error));
            } else {
                res.status(httpStatus.OK).send(result);
            }
        })
    } catch (e) {
        console.log(e)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
});



module.exports = route;
