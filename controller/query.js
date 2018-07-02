const { responseModel } = require('../model');
const config = require('../config');
const { cardService, mongoService } = require('../service');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();


async function getMarbles(marbleId) {

    try {

        let type = "Marble";

        let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        let factory = bizNetConnection.getBusinessNetwork().getFactory();

        let assetRegistry = await bizNetConnection.getAssetRegistry(`${config.ns}.${type}`);

        let marbles;
        if (marbleId) {
            marbles = await assetRegistry.get(marbleId);
        } else {
            marbles = await assetRegistry.getAll();
        }

        return responseModel.successResponse("Marble details", marbles);

    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Get marbles failed", {}, errMessage);
    }


}



async function getPlayers(email) {

    try {

        let type = "Player";

        let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        let factory = bizNetConnection.getBusinessNetwork().getFactory();

        let participantRegistry = await bizNetConnection.getParticipantRegistry(`${config.ns}.${type}`);

        let players;
        if (email) {
            players = await participantRegistry.get(email);
        } else {
            players = await participantRegistry.getAll();
        }

        return responseModel.successResponse("Player details", players);

    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Get players failed", {}, errMessage);
    }


}

module.exports = {
    getMarbles,
    getPlayers
}