var Echo = artifacts.require("./echo.sol");

module.exports = function(deployer) {
  deployer.deploy(Echo);
};
