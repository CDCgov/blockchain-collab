package gov.cdc.wonder.controller;

import java.math.BigInteger;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import gov.cdc.wonder.contracts.hello.Echo_sol_Echo;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/api/1.0/")
public class WonderController {

	private static final Logger logger = Logger.getLogger(WonderController.class);

	private static final BigInteger GAS_PRICE = new BigInteger("100000000000");
	private static final BigInteger GAS_LIMIT = new BigInteger("4712388");

	@Value("${blockchain.contracts.echo.address}")
	private String contractAddress;

	@RequestMapping(value = "echo", method = RequestMethod.POST)
	@ApiOperation(value = "Call the echoString method")
	@ResponseBody
	public ResponseEntity<JsonNode> echoString(@RequestParam(required = true) String message,
			@RequestParam(required = true) String privateKey) throws Exception {
		ObjectMapper mapper = new ObjectMapper();

		Web3j web3j = Web3j.build(new HttpService());
		logger.debug("[ETH-INFO] Connected to TestRPC");

		Credentials credentials = Credentials.create(privateKey);
		logger.debug("[ETH-INFO] Credentials: " + credentials.getAddress());

		Echo_sol_Echo ese = Echo_sol_Echo.load(contractAddress, web3j, credentials, GAS_PRICE, GAS_LIMIT);
		TransactionReceipt transactionReceipt = ese.echoString(new Utf8String(message)).get();

		JSONObject json = new JSONObject();
		json.put("to", transactionReceipt.getTo());
		json.put("hash", transactionReceipt.getTransactionHash());
		json.put("idx", transactionReceipt.getTransactionIndexRaw());
		json.put("blockHash", transactionReceipt.getBlockHash());
		json.put("blockNumber", transactionReceipt.getBlockNumber().toString());

		return (new ResponseEntity<JsonNode>(mapper.readTree(json.toString()), HttpStatus.OK));
	}

}