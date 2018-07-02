/**
 * Query the blockchain
 */


var express = require('express');
var router = express.Router()
const { queryCtrl } = require('../controller');


router.get('/marble/list', async (req, res) => {

    let result = await queryCtrl.getMarbles();

    res.status(result.code).send(result);

})

router.get('/marble/:marbleId', async (req, res) => {

    let result = await queryCtrl.getMarbles(req.params.marbleId);

    res.status(result.code).send(result);

})


router.get('/player/list', async (req, res) => {

    let result = await queryCtrl.getPlayers();

    res.status(result.code).send(result);

})

router.get('/player/:email', async (req, res) => {

    let result = await queryCtrl.getPlayers(req.params.email);

    res.status(result.code).send(result);

})



module.exports = router;