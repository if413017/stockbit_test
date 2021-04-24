/*
 * Copyright (c) 2021 Samuel Napitupulu.
 * All rights reserved.
 */

'use script';

const model = require('@models/index');
const { QueryTypes } = require('sequelize');
const responseUtils = require('@utils/responseUtils');

function findFirstStringInBracket(str){
    if(str.length > 0){
        let temp=[],temp2=[], check=0;
        for(let x=0; x<str.length; x++){
            if(check===0){
                if(str[x]==='('){
                    check=1;
                }
            }else{
                if(str[x]===')'){
                    temp2=temp;
                    break;
                }else
                    temp.push(str[x]);
            }
        }
        return temp2.join("");
    }else
        return null;
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
     * @param word
     * @param callback
     * @returns String
     */
    refactorCode: async (word, callback) => {

        callback(null, await findFirstStringInBracket(word));
    },

    /**
     * anagram
     *
     *
     * @async
     * @function
     * @desc
     * @param callback
     * @returns Array
     */
    anagram: async (callback) => {
        let data=['kita', 'atik', 'tika', 'aku', 'makan', 'kia', 'kua']
        console.log("data")
        for(let a=0; a<data.length; a++){
            data[a]=[data[a],0]
        }

        let id=0, tampung=[]
        for(let z=0;z<data.length;z++){
            let temp=[]
            if(data[z][1]){
                continue
            }
            else{
                data[z]=[data[z][0],1]
                temp.push(data[z][0])
            }
            for(let x=z+1; x<data.length;x++){
                if(data[z][0].length==data[x][0].length){
                    let a = data[z][0];
                    let b =data[x][0];
                    let datax=[]
                    datax.length = data[z][0].length;
                    for(let c=0;c<a.length;c++){
                        for(let y=0;y<b.length;y++){
                            if(!datax[y] && a[c]===b[y]){
                                datax[y]=b[y]
                                break;
                            }
                        }
                    }
                    if(!datax.includes()){
                        data[x]=[data[x][0],1]
                        temp.push(data[x][0])
                    }
                }
            }
            tampung.push(temp)
            id++;
        }
        callback (null,tampung);
    }
}
