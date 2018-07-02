const { responseModel } = require('../model');
const config = require('../config');
const { cardService, mongoService } = require('../service');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();



async function addMarble(marbleData) {

    try {

        let type = "Marble";
        let userType = "Player";

        let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        let factory = bizNetConnection.getBusinessNetwork().getFactory();

        let assetRegistry = await bizNetConnection.getAssetRegistry(`${config.ns}.${type}`);

        let ownerRelations = factory.newRelationship(config.ns, userType, marbleData.owner);
        let newMarble = factory.newResource(config.ns, type, marbleData.marbleId);

        delete marbleData.owner;

        newMarble.owner = ownerRelations;

        newMarble = Object.assign(newMarble, marbleData);

        let res = await assetRegistry.add(newMarble);

        return responseModel.successResponse("Marble added", res);

    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Create marble failed", {}, errMessage);
    }


}

module.exports = {
    addMarble
}