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
- guide for linux setup: https://medium.com/@patdhlk/how-to-install-go-1-9-1-on-ubuntu-16-04-ee64c073cd79

<h2>Run blockchain</h2>

- Run ./start.sh from the blockchain folder. This should start the following containers
    * dev-peer0.org1.example.com-mycc-v0
    * peer0.org1.example.com
    * ca.example.com
    * cli
    * orderer.example.comto 
- to redeploy chaincode: ./teardown.sh and restart (TODO - solve this more efficiently)

<h2>Run backend</h2>
* npm install
* npm start


<h2>Using the API</h2>
- GET to http://localhost:9000/v1/register-user/<username> to register a user
- GET to http://localhost:9000/v1/query/<user>/queryAllCoachingPlans/1 to get all coachingPlans
- POST to http://localhost:9000/v1/invoke with body
        ``` 

        {
          "invokeArgs": [
            "KEY1", "Coach", "Coachee", "Goal"
          ],
          "invoker": "SomeUser",
          "invokeFcn": "createCoachingPlan"
        }
