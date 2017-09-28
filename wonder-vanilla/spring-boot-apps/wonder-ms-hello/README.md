# Spring Boot App

This project contains a very basic Spring Boot app providing an API for the Echo contract.

## How to configure it?

### How to configure the contract?

You need to be sure that you deployed the Hello contracts. When you did it (using Truffle), you probably saw:

```
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xa1546d7ebae7e709472285dc8af806131d996fd48d9de4851e54fa389b128c6f
  Migrations: 0xe710680398a56d1f32d930039339978a4ddd9c99
Saving successful migration to network...
  ... 0x9751632fda9a2d86e5791139ab86f364983c849ab6ce7a66e4c58bc73218435e
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Echo...
  ... 0x7b804204ded462c2fade1d3e695f1e885b7b07e549e438e60bd161677424a10d
  Echo: 0xb1d562b861d955de2fac347d440977119e425fad
Saving successful migration to network...
  ... 0x51d9a27946455e28ce6aeb1ca9bfb1d74fcc15fa74eed074e88ae59e0ecc4c75
Saving artifacts...
```

Be sure to remember the contract address. In the case above, it's the value `0xb1d562b861d955de2fac347d440977119e425fad`. This value has to be saved in the file `src/main/resources/application.properties`:

```
blockchain.contracts.echo.address=0xb1d562b861d955de2fac347d440977119e425fad
```

### How to authenticate?

If you use `testrpc`, you should have seen something like that at the startup:

```
EthereumJS TestRPC v4.0.1 (ganache-core: 1.0.1)

Available Accounts
==================
(0) 0x723d476ef50d875f6ab1efe0f061b1b4545019d6
...

Private Keys
==================
(0) 2937fcdddd83168e65755b83d936581ded0f98b116017e251aa52fe236db2a43
...

HD Wallet
==================
Mnemonic:      screen reduce quiz click merry soft define wagon total boss wear sight
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
```

Remember the private key, it will be used to identify you in the call.

If you use `geth`, you won't need to provide a private key during the call. But you need to import the account in the project. In the data directory of `geth`, you should see the account certificate:

```
$ ls -l ~/.ethereum/myethnet/keystore/
total 8
-rw-------  1 benc  staff  491 28 Sep 09:11 UTC--2017-09-28T08-11-33.598844191Z--0ce6184b8462231d03987421d6ed061ef8edf7de
```

You need to copy this file in the `wonder-ms-hello` project:

```
cp ~/.ethereum/myethnet/keystore/UTC--2017-09-28T08-11-33.598844191Z--0ce6184b8462231d03987421d6ed061ef8edf7de \
  <SPRING BOOT APP HOME>/src/main/resources/accountKeystore.json
```

And update the passphrase in the `application.properties` file if necessary:

```
account.password=pass
```

## How to run it?

When you are in the project, execute the following command:

```
mvn clean spring-boot:run
```

It will start the Spring Boot app.

## How to use it?

Just open your browser on the following URL:

```
http://localhost:8080/swagger-ui.html
```

And you can use the echo API. You need to authenticate with the private key if you use `testrpc`. Otherwise, if you use `geth`, it will use the certificate embedded in the project. It will output a message like that:

```
{
  "tx": "0xe596f18c9d02e0a5b076797be795649f7ca5657fedbaa57dc2c438cab3517f06",
  "receipt": {
    "blockHash": "0x22a10dab7404ee1d4ba8fed532b8d9bc32882f4f6056602684b2c4a743e31953",
    "gasUsed": 25425,
    "blockNumber": 14,
    "cumulativeGasUsed": 25425,
    "transactionIndex": 0,
    "transactionHash": "0xe596f18c9d02e0a5b076797be795649f7ca5657fedbaa57dc2c438cab3517f06"
  }
}
```

![Screenshot](./screenshot.png "Swagger Documentation")

You'll notice that we added some log messages when we connect to the blockchain, and inside the observable:

```
[ETH-INFO] Connected to TestRPC
[ETH-INFO] Credentials: 0x0ce6184b8462231d03987421d6ed061ef8edf7de
[ETH-INFO] Loading contract: 0xf6ac9f7e62251221b574181808bd1907bc647b5f
[ETH-INFO] Starting the observable...
[ETH-INFO] A new message has been posted from 0x0ce6184b8462231d03987421d6ed061ef8edf7de: Hello Ben!
```

Each time, that the method `echoString` in the contract is called, a new event is created, and a new log message will be displayed (whatever how the contract is called). If you try with truffle:

```
$ truffle console
truffle(development)> Echo.deployed().then(e => e.echoString("Hello from Truffle!"))
{ tx: '0x2b13ef6201f0ea78ab2757f23dd2a42ddc1035c5a7a5bccd8be34248836092ef',
  receipt:
   { blockHash: '0xa637b590a79bdf943e0a9647a584f5b97a59fd7c59712532d6efea1daee117b5',
     blockNumber: 824,
     contractAddress: null,
     cumulativeGasUsed: 27101,
     from: '0x0ce6184b8462231d03987421d6ed061ef8edf7de',
     gasUsed: 27101,
     logs: [ [Object] ],
     logsBloom: '0x00000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000400000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000',
     root: '0xd48a43d47337084cbad93689c69a96f5556aab79cfcbd23fb52239fd29bec049',
     to: '0xf6ac9f7e62251221b574181808bd1907bc647b5f',
     transactionHash: '0x2b13ef6201f0ea78ab2757f23dd2a42ddc1035c5a7a5bccd8be34248836092ef',
     transactionIndex: 0 },
  logs:
   [ { address: '0xf6ac9f7e62251221b574181808bd1907bc647b5f',
       blockNumber: 824,
       transactionHash: '0x2b13ef6201f0ea78ab2757f23dd2a42ddc1035c5a7a5bccd8be34248836092ef',
       transactionIndex: 0,
       blockHash: '0xa637b590a79bdf943e0a9647a584f5b97a59fd7c59712532d6efea1daee117b5',
       logIndex: 0,
       removed: false,
       event: 'NewMessage',
       args: [Object] } ] }
```

You'll see the following message in the log of the `wonder-ms-hello` project:

```
[ETH-INFO] A new message has been posted from 0x0ce6184b8462231d03987421d6ed061ef8edf7de: Hello from Truffle!
```

## Want to know how the Java wrapper has been generated...

First, I installed `web3j`:

```
brew tap web3j/web3j
brew install web3j
```

Then, I generated the contracts in a format required by `web3j`:

```
solcjs echo.sol --bin --abi --optimize -o <SPRING BOOT APP HOME>/src/main/resources/
```

And, I generated the Java wrapper:

```
web3j solidity generate \
	<SPRING BOOT APP HOME>/src/main/resources/echo_sol_Echo.bin \
	<SPRING BOOT APP HOME>/src/main/resources/echo_sol_Echo.abi \
	-o  <SPRING BOOT APP HOME>/src/main/java/ \
	-p gov.cdc.wonder.contracts.hello
```
