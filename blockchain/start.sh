#!/bin/bash

set -ev

export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up -d ca.example.com orderer.example.com peer0.org1.example.com couchdb cli

export FABRIC_START_TIMEOUT=10
sleep ${FABRIC_START_TIMEOUT}

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx
docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b mychannel.block

docker exec -it cli sh -c "CORE_PEER_ADDRESS=peer0.org1.example.com:7051 peer chaincode install -n mycc -p github.com/customCode -v v0"
docker exec -it cli sh -c "CORE_PEER_ADDRESS=peer0.org1.example.com:7051 peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n mycc -v v0 -c '{\"Args\":[]}'"
node enrollAdmin.js