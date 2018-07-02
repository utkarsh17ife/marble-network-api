const config = require('../config');
const IdCard = require('composer-common').IdCard;
const fs = require('fs');
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const WalletBackedCardStore = require('composer-common').WalletBackedCardStore;


async function create(identity, participantDetails) {

    const metadata = {
        userName: identity.userID,
        version: 1,
        enrollmentSecret: identity.userSecret,
        businessNetwork: config.networkName
    };


    const idCardData = new IdCard(metadata, config.connectionProfile);
    const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);

    let userCardDir = `${config.cardDir}/${metadata.userName}@${metadata.businessNetwork}`;
    await idCardData.toDirectory(userCardDir, fs);

    return;

}



module.exports = {
    create
}