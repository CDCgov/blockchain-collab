package gov.cdc.wonder.contracts.hello;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.concurrent.Future;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;

/**
 * Auto generated code.<br>
 * <strong>Do not modify!</strong><br>
 * Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>, or {@link org.web3j.codegen.SolidityFunctionWrapperGenerator} to update.
 *
 * <p>Generated with web3j version 2.3.0.
 */
public final class Echo_sol_Echo extends Contract {
    private static final String BINARY = "6060604052341561000f57600080fd5b5b6102128061001f6000396000f300606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630d7e2fce811461003d575b600080fd5b341561004857600080fd5b61008e60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061012b95505050505050565b60405173ffffffffffffffffffffffffffffffffffffffff841681526020810183905260606040820181815290820183818151815260200191508051906020019080838360005b838110156100ee5780820151818401525b6020016100d5565b50505050905090810190601f16801561011b5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b6000806101366101d4565b30600060028682604051602001526040518082805190602001908083835b6020831061017457805182525b601f199092019160209182019101610154565b6001836020036101000a03801982511681845116808217855250505050505090500191505060206040518083038160008661646e5a03f115156101b657600080fd5b50506040518051905090508181879450945094505b50509193909250565b602060405190810160405260008152905600a165627a7a72305820d79a22f4a6d8021bcfb98bfafaef627f2b5a2ad6f87c462a11be237e1a37bf040029";

    private Echo_sol_Echo(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    private Echo_sol_Echo(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public Future<TransactionReceipt> echoString(Utf8String instr) {
        Function function = new Function("echoString", Arrays.<Type>asList(instr), Collections.<TypeReference<?>>emptyList());
        return executeTransactionAsync(function);
    }

    public static Future<Echo_sol_Echo> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, BigInteger initialWeiValue) {
        return deployAsync(Echo_sol_Echo.class, web3j, credentials, gasPrice, gasLimit, BINARY, "", initialWeiValue);
    }

    public static Future<Echo_sol_Echo> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, BigInteger initialWeiValue) {
        return deployAsync(Echo_sol_Echo.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "", initialWeiValue);
    }

    public static Echo_sol_Echo load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Echo_sol_Echo(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public static Echo_sol_Echo load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Echo_sol_Echo(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }
}
