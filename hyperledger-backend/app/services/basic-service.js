'use strict';

var Fabric_Client = require('fabric-client');
var path = require('path');
var fabric_client = new Fabric_Client();
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:7051');
channel.addPeer(peer);
var order = fabric_client.newOrderer('grpc://localhost:7050')
channel.addOrderer(order);
var store_path = path.join('blockchain/hfc-key-store');
let crypto_suite = null;

function BasicService() {
}

BasicService.prototype = {
    getUser: async function (enrollId) {
        return Fabric_Client.newDefaultKeyValueStore({
            path: store_path
        }).then((state_store) => {
            fabric_client.setStateStore(state_store);
            crypto_suite = Fabric_Client.newCryptoSuite();
            var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
            crypto_suite.setCryptoKeyStore(crypto_store);
            fabric_client.setCryptoSuite(crypto_suite);
            return fabric_client.getUserContext(enrollId, true);
        }).then((user_from_store) => {
            if (!(user_from_store && user_from_store.isEnrolled())) {
                throw new Error('Failed to get user.... run registerUser.js');
            }
            return [user_from_store, channel,fabric_client,peer, crypto_suite]
        })
    }
}

var basicService = new BasicService();

module.exports = basicService;
