# hyperledger-sample

SETUP

- make sure go is installed correctly and $GOPATH and $GOROOT are set
- Setup on my Mac:
* Install go with homebrew
* Edit ~/.bash_profile :
export GOPATH=$HOME/go
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin
* In paulien/go : created src/github.com/hyperledger and cloned http://gerrit.hyperledger.org/r/fabric into it 
- ./scripts/bootstrap.sh


BLOCKCHAIN

- ./start.sh
- after/on redeploy chaincode: ./teardown.sh

START BACKEND
- npm install
- npm start

