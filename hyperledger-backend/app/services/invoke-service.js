'use strict';

var basicService = require('./basic-service.js')
var member_user = null;
var tx_id = null;

function InvokeService() {
}

InvokeService.prototype = {
    invoke: async function (enrollId, functionName, args) {
        const infoArray = await basicService.getUser(enrollId);
        const user_from_store = infoArray[0];
        const channel = infoArray[1];
        const fabric_client = infoArray[2];
        const peer = infoArray[3]
        member_user = user_from_store;
        args.push(member_user.getName());
        tx_id = fabric_client.newTransactionID();
        var request = {
            chaincodeId: 'mycc',
            fcn: functionName,
            args: args,
            chainId: 'mychannel',
            txId: tx_id
        };
        channel.sendTransactionProposal(request).then((results) => {
            var proposalResponses = results[0];
            var proposal = results[1];
            let isProposalGood = false;
            if (proposalResponses && proposalResponses[0].response && proposalResponses[0].response.status === 200) {
                isProposalGood = true;
            }
            if (isProposalGood) {
                var request = {
                    proposalResponses: proposalResponses,
                    proposal: proposal
                };
                var transaction_id_string = tx_id.getTransactionID();
                var promises = [];
                var sendPromise = channel.sendTransaction(request);
                promises.push(sendPromise);
                let event_hub = channel.newChannelEventHub(peer);
                let txPromise = new Promise((resolve, reject) => {
                    let handle = setTimeout(() => {
                        event_hub.unregisterTxEvent(transaction_id_string);
                        event_hub.disconnect();
                        resolve({event_status: 'TIMEOUT'});
                    }, 3000);
                    event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
                            clearTimeout(handle);
                            var return_status = {event_status: code, tx_id: transaction_id_string};
                            resolve(return_status);
                        }, (err) => {
                            reject(new Error('There was a problem with the eventhub ::' + err));
                        },
                        {disconnect: true}
                    );
                    event_hub.connect();
                });
                promises.push(txPromise);
                return Promise.all(promises);
            } else {
                throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
            }
        }).then((results) => {
                if (!(results && results[0] && results[0].status === 'SUCCESS')) {
                    console.error('Failed to order the transaction. Error code: ' + results[0].status);
                }
                return results[1].event_status;
            }
        ).catch((err) => {
            console.error('Failed to invoke successfully :: ' + err);
        });
    }
}


var invokeService = new InvokeService();

module.exports = invokeService;
