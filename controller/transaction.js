const { responseModel } = require('../model');
const config = require('../config');
const { cardService, mongoService } = require('../service');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();



async function tradeMarble(tradeMarbleData) {

    try {

        let type = "TradeMarble"
        let userType = "Player"
        let assetType = "Marble"

        let currentOwner = await mongoService.get(
            {
                $and: [
                    { userID: tradeMarbleData.creds.userID },
                    { userSecret: tradeMarbleData.creds.userSecret },
                    { type: userType },
                ]
            }
        )

        if (!(currentOwner && currentOwner.length)) {
            return responseModel.successResponse("Invalid credentials", {});
        } else {
            currentOwner = currentOwner[0];
        }

        let currentOwnerCard = `${tradeMarbleData.creds.userID}@${config.networkName}`;
        let bizNetDefination = await bizNetConnection.connect(currentOwnerCard);
        let factory = bizNetDefination.getFactory();

        delete tradeMarbleData.creds;

        let newOwnerRelation = factory.newRelationship(config.ns, userType, tradeMarbleData.transactionData.newOwnerEmail);

        let marbleRelation = factory.newRelationship(config.ns, assetType, tradeMarbleData.transactionData.marbleId);

        let transData = {
            "marble": marbleRelation,
            "newOwner": newOwnerRelation
        }


        const newTransaction = factory.newTransaction(`${config.ns}`, type);

        trans = Object.assign(newTransaction, transData);

        let res = await bizNetConnection.submitTransaction(trans);

        return responseModel.successResponse("Marbles traded", res);

    } catch (err) {

        console.log("in err");

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Transaction", {}, errMessage);
    }


}




module.exports = {
    tradeMarble
}