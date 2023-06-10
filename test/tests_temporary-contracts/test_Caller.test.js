const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

require("@nomiclabs/hardhat-web3");
//require("@nomiclabs/hardhat-ethers");
//console.log(await web3.eth.getBlockNumber());



describe("temporary-contracts", function () {

    async function deployOneYearLockFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const contracts = [
            "Caller", 
            "../../../artifacts/contracts/temprorary-contracts/Caller",
            "WWethcreateWillsERC20"];
            
        const Lock = await ethers.getContractFactory(contracts[0]);
        const lock = await Lock.deploy();
        return { lock,  owner, otherAccount };
    }

    
    describe("desc_test_configs",  function () {

        it("gas price exist ", async function () {
            const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
            // const contractAddress = deployedContractAddr;
            // printToConsole(`contractADdr: ${contractAddress}`)
            // const myContract = await hre.ethers.getContractAt("WWethcreateWillsERC20", contractAddress);

          //  await lock.init();
          var t = await lock.getGasLimit();
          console.log(`t ===> ${t}`);
          console.log(t);
            expect(t).to.equal(1000);
            
        });
        it("'ethers' gets Block Number ", async function () {
            console.log(await ethers.provider.getBlockNumber());
            
        });
        it("'web3' gets Block Number ", async function () {
            console.log(await web3.eth.getBlockNumber());
            
        });

    });

});