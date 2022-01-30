const Migrations = artifacts.require("./Migrations.sol");
const Kepler = artifacts.require("./Kepler.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Kepler, "Hello, Klaytn");
};
