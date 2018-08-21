# hyperledger-sample

<h2>Setup</h2>

- make sure go is installed correctly and $GOPATH and $GOROOT are set
- Setup I used on Mac:
    * Install go with homebrew
    * Edit ~/.bash_profile :
        * export GOPATH=$HOME/go
        * export GOROOT=/usr/local/opt/go/libexec
        * export PATH=$PATH:$GOPATH/bin
        * export PATH=$PATH:$GOROOT/bin
    * In (username)/go : created src/github.com/hyperledger and cloned http://gerrit.hyperledger.org/r/fabric into it 
- Install the platform-specific binaries https://hyperledger-fabric.readthedocs.io/en/latest/install.html 

<h2>Run blockchain</h2>

- ./start.sh
- to redeploy chaincode: ./teardown.sh and restart (TODO - solve this more efficient)

<h2>Run backend</h2>
- npm install
- npm start

