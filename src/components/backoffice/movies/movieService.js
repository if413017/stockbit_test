/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

'use script';

const model = require('@models/index');
const env = process.env;
const axios = require("axios");


module.exports = {

    /**
     * Search movies by keyword
     *
     *
     * @async
     * @function
     * @desc
     * @param params
     * @param callback
     * @returns {Object} List of movie
     */
    retrieveMovies: async (params, callback) => {
        try {

            if(!params.keyword){
                return callback("Went wrong")
            }
            console.log("env.OMDB_URL")
            let res = await axios.get(`${env.OMDB_URL}?apikey=${env.OMDB_KEY}&s=${params.keyword}&page=${params.page}`);
            await model.MOVIE_LOG.create({
                endpoint:`${env.OMDB_URL}?apikey=${env.OMDB_KEY}&s=${params.keyword}&page=${params.page}`,
                parameters: params
            })
            callback(null, res.data['Search']);
        } catch (e) {
            callback(e)
        }
    },

    /**
     * Get detail movie
     *
     *
     * @async
     * @function
     * @desc
     * @param params
     * @param callback
     * @returns {Object} Detail movie
     */
    retrieveDetail: async (params, callback) => {
        try {

            if(!params){
                return callback("Went wrong")
            }

            let res = await axios.get(`${env.OMDB_URL}?apikey=${env.OMDB_KEY}&i=${params}`);
            await model.MOVIE_LOG.create({
                endpoint:`${env.OMDB_URL}?apikey=${env.OMDB_KEY}&i=${params}`,
                parameters: params
            })
            callback(null, res.data);
        } catch (e) {
            callback(e)
        }
    },

}
