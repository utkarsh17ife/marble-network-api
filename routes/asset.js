/**
 * Asset management routes
 */


var express = require('express');
var router = express.Router()
const { assetCtrl } = require('../controller');


//create asset
/**
 * URL: (POST) http://localhost:3000/rest/asset/marble
 * {
 *	"marbleId": "123123",
 *	"size": "SMALL",
 *	"color": "PURPLE",
 *	"owner": "utkarsh18ife@gmail.com"
 *  }
 */
router.post('/marble', async (req, res) => {

    let result = await assetCtrl.addMarble(req.body);

    res.status(result.code).send(result);

})



module.exports = router;