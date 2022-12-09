const {ethers} = require("hardhat");
const { HardhatConfig, HardhatUserConfig } = require("hardhat/types");

const { extendConfig, extendEnvironment } = require("hardhat/config");

async function main(hre) {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  //const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("WWethcreateWillsERC20");
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  const lock = await Lock.deploy();

  await lock.deployed();

   // deploy the contract
   const deployedVerifyContract = await Lock.deploy();

   await deployedVerifyContract.deployed();
 
   // print the address of the deployed contract
   console.log("Verify Contract Address:", deployedVerifyContract.address);
 
   console.log("Sleeping.....");
   // Wait for etherscan to notice that the contract has been deployed
   await sleep(10000);
 
   // Verify the contract after deploying
   await hre.run("verify:verify", {
     address: deployedVerifyContract.address,
     constructorArguments: [],
   });

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(hre).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
