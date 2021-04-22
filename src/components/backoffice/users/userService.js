/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

'use script';

const model = require('@models/index');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const responseUtils = require('@utils/responseUtils');

function findFirstStringInBracket(str){
    if(str.length > 0){
        let indexFirstBracketFound = str.indexOf("(");
        console.log("indexFirstBracketFound ==", indexFirstBracketFound)
        if(indexFirstBracketFound >= 0){
            let wordsAfterFirstBracket = str.substr( indexFirstBracketFound );
            console.log("wordsAfterFirstBracket ==", wordsAfterFirstBracket)
            if(wordsAfterFirstBracket){
                wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
                console.log("wordsAfterFirstBracket2 ==", wordsAfterFirstBracket)
                let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
                console.log("indexClosingBracketFound ==", indexClosingBracketFound)
                if(indexClosingBracketFound >= 0){
                    return wordsAfterFirstBracket.substring(0,indexClosingBracketFound);
                }
                else{
                    return '';
                }
            }else{
                return '';
            }
        }else{
            return '';
        }
    }else{
        return '';
    }
}


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
    },

    /**
     * get user
     *
     *
     * @async
     * @function
     * @desc
     * @param dataObjcet
     * @param callback
     * @returns {Object} data user
     */
    getUser: async (callback) => {
        let dataUser = await model.USER.sequelize.query("SELECT `USER`.`id`, `USER`.`UserName`, `Datauser`.`UserName` AS `ParentUserName` FROM `USERs` AS `USER` LEFT OUTER JOIN `USERs` AS `Datauser` ON `USER`.`Parent` = `Datauser`.`id`", { type: QueryTypes.SELECT });
        callback(null, responseUtils.success("data user retrieved", dataUser));
    },

    /**
     * refactor code
     *
     *
     * @async
     * @function
     * @desc
     * @param dataObjcet
     * @param callback
     * @returns String
     */
    refactorCode: async (word, callback) => {

        callback(null, await findFirstStringInBracket(word));
    }
}
