#!/bin/bash

set -e
docker-compose -f docker-compose.yml kill && docker-compose -f docker-compose.yml down

rm -fr ./hfc-key-store

docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

