const { responseModel } = require('../model');
const config = require('../config');
const { cardService, mongoService } = require('../service');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();



async function createPlayer(playerData) {

    try {

        let type = 'Player';

        let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        let factory = bizNetConnection.getBusinessNetwork().getFactory();

        let participant = factory.newResource(config.ns, type, playerData.email);

        participant.firstName = playerData.firstName;
        participant.lastName = playerData.lastName;

        let participantRegistry = await bizNetConnection.getParticipantRegistry(`${config.ns}.${type}`);
        await participantRegistry.add(participant);


        let identity = await bizNetConnection.issueIdentity(`${config.ns}.${type}#${playerData.email}`, playerData.firstName)


        await cardService.create(identity, participantRegistry);
        identity.type = type;
        identity.email = playerData.email;

        await mongoService.insert(identity)


        return responseModel.successResponse("Player created", identity);

    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Create player failed", {}, errMessage);
    }


}






module.exports = {
    createPlayer

}