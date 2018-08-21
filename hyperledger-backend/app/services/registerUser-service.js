'use strict';

var Fabric_CA_Client = require('fabric-ca-client');
var member_user = null;
var basicService = require('./basic-service.js')
var admin_user = null;

function RegisterUserService() {
}

RegisterUserService.prototype = {
    registerUser: async function (enrollId) {
        const infoArray = await basicService.getUser('admin');
        const user_from_store = infoArray[0];
        const fabric_client = infoArray[2];
        const crypto_suite = infoArray[4];
        member_user = user_from_store;
        const fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null, '', crypto_suite);
        admin_user = user_from_store;
        fabric_ca_client.register({
            enrollmentID: enrollId,
            affiliation: 'org1.department1',
            role: 'client'
        }, admin_user).then((secret) => {
            return fabric_ca_client.enroll({enrollmentID: enrollId, enrollmentSecret: secret});
        }).then((enrollment) => {
            return fabric_client.createUser({
                username: enrollId,
                mspid: 'Org1MSP',
                cryptoContent: {privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate}
            });
        }).then((user) => {
            member_user = user;
            return fabric_client.setUserContext(member_user);
        }).catch((err) => {
            console.error('Failed to register: ' + err);
        });
    }
};

var registerUserService = new RegisterUserService();
module.exports = registerUserService;