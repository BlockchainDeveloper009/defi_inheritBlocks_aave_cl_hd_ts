const {ethers} = require("hardhat");
const { HardhatConfig, HardhatUserConfig } = require("hardhat/types");

const { extendConfig, extendEnvironment } = require("hardhat/config");
const fs = require('fs'); 

async function main(hre) {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  //const lockedAmount = ethers.utils.parseEther("1");

  const localDeploymentPublicAddr1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  const localDeploymentPrivateAddr1 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  const contractName = ["WWethcreateWillsERC20"]
  const Lock = await ethers.getContractFactory(contractName[0]);
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  const lock = await Lock.deploy();

  await lock.deployed();

   // deploy the contract
   const deployedVerifyContract = await Lock.deploy();

   await deployedVerifyContract.deployed();

   const currentDate = new Date();
   content = `\n $ ${currentDate} | ${contractName[0]} | ${lock.address}`
   fs.appendFile('./erc20deploymentLog.txt', content, (err) => {
     if (err) {
       console.error(err);
       return;
     }
   });
 
 

  console.log(` 'WWethcreateWillsERC20' deployed to ${lock.address}`);

    console.log('Content written to file successfully.');
  
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
