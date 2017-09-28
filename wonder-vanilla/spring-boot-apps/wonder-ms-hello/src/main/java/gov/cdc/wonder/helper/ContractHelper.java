package gov.cdc.wonder.helper;

import java.io.IOException;
import java.math.BigInteger;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.Wallet;
import org.web3j.crypto.WalletFile;
import org.web3j.protocol.ObjectMapperFactory;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.http.HttpService;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import gov.cdc.wonder.contracts.hello.Echo_sol_Echo;

@Component
public class ContractHelper {

	private static final Logger logger = Logger.getLogger(ContractHelper.class);

	private static final BigInteger GAS_PRICE = new BigInteger("100000000000");
	private static final BigInteger GAS_LIMIT = new BigInteger("4712388");

	private static String contractAddress;
	private static String password;
	private static String c_privateKey;
	private static Echo_sol_Echo ese;

	public static Echo_sol_Echo getEchoContract(String privateKey) {
		if (ese == null || c_privateKey == null || !c_privateKey.equals(privateKey)) {

			Web3j web3j = Web3j.build(new HttpService());
			logger.debug("[ETH-INFO] Connected to TestRPC");

			Credentials credentials = Credentials.create(privateKey);
			logger.debug("[ETH-INFO] Credentials: " + credentials.getAddress());

			logger.debug("[ETH-INFO] Loading contract: " + contractAddress);
			ese = Echo_sol_Echo.load(contractAddress, web3j, credentials, GAS_PRICE, GAS_LIMIT);

			c_privateKey = privateKey;
		}
		return ese;
	}

	public static Echo_sol_Echo getEchoContract()
			throws JsonParseException, JsonMappingException, IOException, CipherException {
		Web3j web3j = Web3j.build(new HttpService());
		logger.debug("[ETH-INFO] Connected to TestRPC");

		ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
		WalletFile walletFile = objectMapper
				.readValue(ContractHelper.class.getResourceAsStream("/accountKeystore.json"), WalletFile.class);
		Credentials credentials = Credentials.create(Wallet.decrypt(password, walletFile));
		logger.debug("[ETH-INFO] Credentials: " + credentials.getAddress());

		logger.debug("[ETH-INFO] Loading contract: " + contractAddress);
		ese = Echo_sol_Echo.load(contractAddress, web3j, credentials, GAS_PRICE, GAS_LIMIT);

		logger.debug("[ETH-INFO] Starting the observable...");
		ese.newMessageEventObservable(DefaultBlockParameterName.EARLIEST, DefaultBlockParameterName.LATEST)
				.subscribe(messageEvent -> {
					logger.debug("[ETH-INFO] A new message has been posted from " + messageEvent.from + ": "
							+ messageEvent.message);
				});

		return ese;
	}

	@Value("${blockchain.contracts.echo.address}")
	public void setContractAddress(String contractAddress) {
		ContractHelper.contractAddress = contractAddress;
	}

	@Value("${account.password}")
	public void setPassword(String password) {
		ContractHelper.password = password;
	}
}
