- Get the binaries curl -sSL https://goo.gl/fMh2s3 | bash

## GENERATING CRYPTO
from ./blockchain 
- cryptogen generate --config=./crypto-config.yaml ==> generates files in crypto-config
- export FABRIC_CFG_PATH=$PWD
- mkdir channel-artifacts
- configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block ==> generates genesis.block
- export CHANNEL_NAME=mychannel
- configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP

### DOCKER COMPOSE
edit  FABRIC_CA_SERVER_CA_KEYFILE=/etc/hyperledger/fabric-ca-server-config/e1ad4364ec8a7d79aa064e3fe36219ec9a9e3e5afab30ec747d22b4ba28c5321_sk --> replace with file generated in cryptoconfig/peerorgs/org1

### BASED ON
https://github.com/CATechnologies/blockchain-tutorials/wiki/Tutorial:-Hyperledger-Fabric-v1.1-%E2%80%93-Create-a-Development-Business-Network-on-zLinux#create-channel

### DEPLOY TO SWARM
https://medium.com/@malliksarvepalli/hyperledger-fabric-on-multiple-hosts-using-docker-swarm-and-compose-f4b70c64fa7d
