const { responseModel } = require('../model');
const config = require('../config');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();



async function info() {

    try {

        let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        let info = {
            name: bizNetDefination.getName(),
            version: bizNetDefination.getVersion(),
            description: bizNetDefination.getDescription(),
        };
        return responseModel.successResponse("Network info", info);

    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Network info failed", {}, errMessage);
    }


}



module.exports = {
    info
}