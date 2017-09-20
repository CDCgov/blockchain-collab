### Contracts

This project contains an HelloWorld [Solidity](https://solidity.readthedocs.io/en/develop/) contract for the moment.

The first step to achieve is to compile the contract. You can do it online using [remix IDE](https://remix.ethereum.org/) or by installing Truffle as explained below (you'll need `npm` installed on your machine):

First, install [Truffle](http://truffleframework.com/):

```
npm install -g truffle
```

Then, be sure that you have your `testrpc` running, and do the following steps (from the folder `wonder-vanilla`):

```
truffle compile
truffle deploy
```

The contract is now deployed in `testrpc`.

(For the moment, there is no tests but it should be added soon.)

Now, we can test in the console if it behaves as expected:

```
truffle console
truffle(development)> Echo.deployed().then(e => e.echoString("Hello World!"))
```

And you should get an object that looks like this:

```
{ tx: '0x698370000e7eae176086b7ba30bf4312893aa089dc7f92d3ca4f2b17c92fde86',
  receipt:
   { transactionHash: '0x698370000e7eae176086b7ba30bf4312893aa089dc7f92d3ca4f2b17c92fde86',
     transactionIndex: 0,
     blockHash: '0x819939bfc807d87acc7f0530d0f53b5aaaf87382e2f910278f58482b43370888',
     blockNumber: 5,
     gasUsed: 23728,
     cumulativeGasUsed: 23728,
     contractAddress: null,
     logs: [] },
  logs: [] }
```

Before switching to the DApp step, you need to included the compiled contracts to the DApp:

```
cd dapp
ln -s ../../build/contracts dapp/src/contracts
```

Now, you can switch to the DApp step.
