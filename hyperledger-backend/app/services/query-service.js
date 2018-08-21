'use strict';

var basicService = require('./basic-service.js')

function ChaincodeService() {
}

ChaincodeService.prototype = {
    query: async function (enrollId, functionName, args) {
        const member_user = await basicService.getUser(enrollId);
        args.push(member_user.getName());
        const request = {
            chaincodeId: 'mycc',
            fcn: functionName,
            args: args
        };
        return basicService.channel.queryByChaincode(request).then((query_responses) => {
            if (query_responses && query_responses.length === 1) {
                return query_responses[0].toString();
            }
        }).catch((err) => {
            console.error('Failed to query successfully :: ' + err);
        });
    }
}

var chaincodeService = new ChaincodeService();

module.exports = chaincodeService;
