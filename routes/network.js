/**
 * Network info route
 */

var express = require('express');
var router = express.Router()
const { networkCtrl } = require('../controller');


/**
 * URL: (GET) http://localhost:3000/network/info
 */
router.get('/info', async (req, res) => {

    let result = await networkCtrl.info();

    res.status(result.code).send(result);

})



module.exports = router;