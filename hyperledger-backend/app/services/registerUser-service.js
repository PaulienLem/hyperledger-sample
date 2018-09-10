'use strict';

var Fabric_CA_Client = require('fabric-ca-client');
var basicService = require('./basic-service.js')
var admin_user = null;
var member_user = null;

function RegisterUserService() {
}

RegisterUserService.prototype = {
    registerUser: async function (enrollId) {
        admin_user = await basicService.getUser('admin');
        const crypto_suite = basicService.crypto_suite;
        const fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null, '', crypto_suite);
        fabric_ca_client.register({
            enrollmentID: enrollId,
            affiliation: 'org1.department1',
            role: 'client'
        }, admin_user).then((secret) => {
            return fabric_ca_client.enroll({enrollmentID: enrollId, enrollmentSecret: secret});
        }).then((enrollment) => {
            return basicService.fabric_client.createUser({
                username: enrollId,
                mspid: 'Org1MSP',
                cryptoContent: {privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate}
            });
        }).then((user) => {
            member_user = user;
            return basicService.fabric_client.setUserContext(member_user);
        })
    }
};

var registerUserService = new RegisterUserService();
module.exports = registerUserService;