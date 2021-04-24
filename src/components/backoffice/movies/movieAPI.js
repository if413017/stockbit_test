/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

const route = require('express').Router();
const httpStatus = require('http-status-codes');
const movieServices = require('./movieService');
const responseUtils = require('@utils/responseUtils');

route.get('/search', async (req, res) => {
    try {

        await movieServices.retrieveMovies(req.query, (error, result)=>{
            if (error) {
                console.log(error)
                res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed("Failed to retrieve movie list.", error));
            } else {
                res.status(httpStatus.OK).send(responseUtils.success("Successfully retrieve movie list.", result));
            }
        })
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
});

route.get('/detail', async (req, res) => {
    try {

        await movieServices.retrieveDetail(req.query.imdbID, (error, result)=>{
            if (error) {
                res.status(httpStatus.BAD_REQUEST).send(responseUtils.failed("Failed to retrieve given movie's detail.", error));
            } else {
                res.status(httpStatus.OK).send(responseUtils.success("Successfully retrieve movie's detail.", result));
            }
        })
    } catch (e) {
        console.log(e)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    }
});


module.exports = route;
