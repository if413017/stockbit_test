'use strict';

const router = require('express').Router();

const backofficeRouterList = {
    'stockbit/user': 'backoffice/users/userAPI'

}


for (let item in backofficeRouterList) {
    router.use('/' + item, require('../../src/components/' + backofficeRouterList[item]))
}

module.exports = router;
