/**
 * Participant management route
 */


var express = require('express');
var router = express.Router()
const { participantCtrl } = require('../controller');



//create player
/**
 * URL: (POST) http://localhost:3000/rest/participant/player
 * Request Obj:
 * {
 *	"email":"player1@gmail.com",
 *	"firstName":"fnameP1",
 *	"lastName":"lnameP1"
 *  }
 */
router.post('/player', async (req, res) => {

    let result = await participantCtrl.createPlayer(req.body);

    res.status(result.code).send(result);

})


module.exports = router;