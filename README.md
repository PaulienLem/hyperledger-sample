# Hyperledger example

<h2>Setup</h2>

- make sure go is installed correctly and $GOPATH and $GOROOT are set
- Setup on Mac:
    * Install go 
    * Edit ~/.bash_profile :
        ``` 
         export GOPATH=$HOME/go
         export GOROOT=/usr/local/opt/go/libexec
         export PATH=$PATH:$GOPATH/bin
         export PATH=$PATH:$GOROOT/bin   
    * In (username)/go : create src/github.com/hyperledger and cloned http://gerrit.hyperledger.org/r/fabric into it 
- Install the platform-specific binaries https://hyperledger-fabric.readthedocs.io/en/latest/install.html 

<h2>Run blockchain</h2>

- Run ./start.sh from the blockchain folder. This should start the following containers
    * dev-peer0.org1.example.com-mycc-v0
    * peer0.org1.example.com
    * ca.example.com
    * cli
    * couchdb
    * orderer.example.com
- to redeploy chaincode: ./teardown.sh and restart (TODO - solve this more efficiently)

<h2>Run backend</h2>
* npm install
* npm start


<h2>Using the API</h2>
- GET to http://localhost:9000/v1/register-user/<username> to register a user
- GET to http://localhost:9000/v1/query/<user>/queryAllCoachingPlans/1 to get all coachingPlans
- POST to http://localhost:9000/v1/invoke with body
        {
          "invokeArgs": [
            "KEY", "Coach", "Coachee", "Goal"
          ],
          "invoker": "SomeUser",
          "invokeFcn": "createCoachingPlan"
        }
