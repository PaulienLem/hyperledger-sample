'use strict';

var Fabric_CA_Client = require('fabric-ca-client');
var tlsOptions = {
    trustedRoots: [],
    verify: false
};
var basicService = require('../hyperledger-backend/app/services/basic-service');
var fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', tlsOptions, 'ca.example.com', basicService.crypto_suite);
var admin_user = null;

fabric_ca_client.enroll({
    enrollmentID: 'admin',
    enrollmentSecret: 'adminpw'
}).then((enrollment) => {
    return basicService.fabric_client.createUser({
        username: 'admin',
        mspid: 'Org1MSP',
        cryptoContent: {privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate}
    });
}).then((user) => {
    admin_user = user;
    basicService.fabric_client.setUserContext(admin_user);
}).catch((err) => {
    throw new Error('Failed to enroll admin');
});
