#!/bin/bash

set -e
docker-compose -f docker-compose.yml kill && docker-compose -f docker-compose.yml down

rm -fr ../hyperledger-backend/app/services/hfc-key-store

docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

