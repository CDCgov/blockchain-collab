package gov.cdc.wonder.controller;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import gov.cdc.wonder.contracts.hello.Echo_sol_Echo;
import gov.cdc.wonder.helper.ContractHelper;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/api/1.0/")
public class WonderController {

	@RequestMapping(value = "echo", method = RequestMethod.POST)
	@ApiOperation(value = "Call the echoString method")
	@ResponseBody
	public ResponseEntity<JsonNode> echoString(@RequestParam(required = true) String message,
			@RequestParam(required = false) String privateKey) throws Exception {
		ObjectMapper mapper = new ObjectMapper();

		Echo_sol_Echo ese;
		if (privateKey != null && !privateKey.isEmpty())
			ese = ContractHelper.getEchoContract(privateKey);
		else
			ese = ContractHelper.getEchoContract();
		TransactionReceipt transactionReceipt = ese.echoString(new Utf8String(message)).get();

		JSONObject receipt = new JSONObject();
		receipt.put("transactionHash", transactionReceipt.getTransactionHash());
		receipt.put("transactionIndex", transactionReceipt.getTransactionIndex());
		receipt.put("blockHash", transactionReceipt.getBlockHash());
		receipt.put("blockNumber", transactionReceipt.getBlockNumber());
		receipt.put("gasUsed", transactionReceipt.getGasUsed());
		receipt.put("cumulativeGasUsed", transactionReceipt.getCumulativeGasUsed());
		receipt.put("contractAddress", transactionReceipt.getContractAddress());

		JSONObject json = new JSONObject();
		json.put("tx", transactionReceipt.getTransactionHash());
		json.put("receipt", receipt);

		return (new ResponseEntity<JsonNode>(mapper.readTree(json.toString()), HttpStatus.OK));
	}

}