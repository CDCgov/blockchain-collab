### Blockchain Info

Right now, we tested two platforms: `testrpc` and `geth`.

#### TestRPC

[testrpc](https://github.com/ethereumjs/testrpc) is very easy for developments. However, it contains some bugs (especially for the events) and the community around `testrpc` is a bit slow to solve these bugs.

To install it:

```
npm install -g ethereumjs-testrpc
testrpc
```

#### Geth

[Geth](https://github.com/ethereum/go-ethereum) is a multipurpose command line tool that runs a full Ethereum node implemented in Go.

To install it:

```
brew tap ethereum/ethereum
brew install ethereum
```

(If the previous instructions are not relevant for your environments, please refer to: https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)

`geth` is a bit more complicated than `testrpc` because it doesn't initialize automatically at the startup. Let's configure it now. Open a terminal, and go to the folder `wonder-vanilla/blockchain`. First, create the folder where `geth` will store all data:

```
mkdir -p ~/.ethereum/myethnet
```

Then, create a new account:

```
geth --datadir ~/.ethereum/myethnet account new
```

It will ask you a passphrase. In our case, we'll type `pass` and it will display the new account address:

```
WARN [09-28|08:50:44] No etherbase set and no accounts found as default
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: pass
Repeat passphrase: pass
Address: {0ce6184b8462231d03987421d6ed061ef8edf7de}
```

Now, your account is created but its balance is null. Update the `genesis.json` file and change the account address with the one that you just generated. It should look like that:

```
{
	"config": {
		"chainId": 15,
		"homesteadBlock": 0,
		"eip155Block": 0,
		"eip158Block": 0
	},
	"gasLimit": "0x8000000",
	"difficulty": "0x400",
	"alloc": {
		"0ce6184b8462231d03987421d6ed061ef8edf7de": {
			"balance": "200000000000000000000000"
		}
	}
}
```

Now, we can initialize or ethereum node using this file:

```
geth --datadir ~/.ethereum/myethnet init genesis.json
```

And you should get a trace like this one:

```
INFO [09-28|08:57:06] Allocated cache and file handles         database=/Users/benc/Documents/workspaces/blockchain/blockchain-collab/wonder-vanilla/blockchain/myethnet/geth/chaindata cache=16 handles=16
INFO [09-28|08:57:06] Writing custom genesis block
INFO [09-28|08:57:06] Successfully wrote genesis state         database=chaindata                                                                                                       hash=7c7384…3004e5
INFO [09-28|08:57:06] Allocated cache and file handles         database=/Users/benc/Documents/workspaces/blockchain/blockchain-collab/wonder-vanilla/blockchain/myethnet/geth/lightchaindata cache=16 handles=16
INFO [09-28|08:57:06] Writing custom genesis block
INFO [09-28|08:57:06] Successfully wrote genesis state         database=lightchaindata                                                                                                       hash=7c7384…3004e5
```

Now, you can start your `geth` node:

```
geth --rpcapi "eth,net,web3,personal" --rpc --rpcaddr="0.0.0.0" --datadir ~/.ethereum/myethnet --mine
```

But you are not done yet, to simplify the deployment of your contracts with `truffle`, you need to make this newly created account the default one, and to unlock it. Open a new terminal, and connect to your `geth` node:

```
geth attach rpc:http://localhost:8545
```

First, make the default account the only account that we created:

```
eth.defaultAccount = eth.accounts[0]
```

It should print the address of the account that we created above. Then, you need to unlock the account. If you don't do it, `truffle` won't be able to deploy the contracts:

```
personal.unlockAccount(eth.accounts[0])
```

You can check the balance of all accounts by first creating the following function:

```
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in eth.accounts) {
        var acct = eth.accounts[acctNum];
        var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
        totalBal += parseFloat(acctBal);
        console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
    }
    console.log("  Total balance: " + totalBal + " ether");
};
```

Then, just call it:

```
> checkAllBalances();
  eth.accounts[0]: 	0xb9e81aefb238289071b81e3d53a9045626ef020a 	balance: 200155 ether
  Total balance: 200155 ether
```

And you are done!
