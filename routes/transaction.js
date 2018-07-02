/**
 * Transaction routes
 */


var express = require('express');
var router = express.Router()
const { transactionCtrl } = require('../controller');


//Trande marble transaction
/**
 * URL: (POST) http://localhost:3000/rest/participant/tradeMarble
 * Request Obj:
 * {
 *	"creds": {
 *		"userID":"fnameP3",
 *		"userSecret":"IXFZZIqXUmmM"
 * },
 *	"transactionData":
 * {
 *		"marbleId": "m2",
 *		"newOwnerEmail": "player4@gmail.com"
 * }
 */
router.post('/tradeMarble', async (req, res) => {

    let result = await transactionCtrl.tradeMarble(req.body);

    res.status(result.code).send(result);

})



module.exports = router;