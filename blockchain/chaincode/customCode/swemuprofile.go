
package main


import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type CoachingPlan struct {
	Coach       string `json:"coach"`
	Coachee     string `json:"coachee"`
	Goal        string `json:"goal"`
}

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}


func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {
	function, args := APIstub.GetFunctionAndParameters()
	if function == "createCoachingPlan" {
		return s.createCoachingPlan(APIstub, args)
	} else if function == "initLedger" {
     		return s.initLedger(APIstub)
    } else if function == "queryAllCoachingPlans" {
		return s.queryAllCoachingPlans(APIstub)
	} else if function == "getHistoryForKey" {
      		return s.getHistoryForKey(APIstub, args)
    }
	return shim.Error("Invalid Smart Contract function name. " + function)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {


	return shim.Success(nil)
}

func (s *SmartContract) createCoachingPlan(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	fmt.Printf("- createPlan:\n%s\n", args)

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	var plan = CoachingPlan{Coach: args[1], Coachee: args[2], Goal: args[3]}

	planAsBytes, _ := json.Marshal(plan)
	APIstub.PutState(args[0], planAsBytes)
	fmt.Printf("added to stub:\n%s\n", planAsBytes)
	return shim.Success(nil)
}

func (s *SmartContract) getHistoryForKey(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
    resultsIterator, err := APIstub.GetHistoryForKey(args[0])
    fmt.Printf("- history:\n%s\n", resultsIterator, args[0])
    if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false

	for resultsIterator.HasNext() {

		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString("\"")

		buffer.WriteString(", \"Plan\":")
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) queryAllCoachingPlans(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "PLAN0"
	endKey := "PLAN999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
			fmt.Printf("- test:\n%s\n", resultsIterator)

	for resultsIterator.HasNext() {

		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Plan\":")
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCoachingPlans:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func main() {
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
