const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");



let debugMode = true;
//https://ethereum.stackexchange.com/questions/52913/how-can-i-get-the-data-returned-from-solidity-function-from-transaction-id-in-we
function printToConsole(str)
{ if(debugMode)
  {
    console.log('--------------')
    console.log(str);
    console.log('==============')
  }
  
}
const meta_benefitorAddr = 0xf821142CC270dAb63767cFAae15dC36D1b043348;
const meta_txnAsst = "ca-3";
const hardhat_BenefitorAddr="0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
      
const willStartDate = 20221210;
const willEndDate = 20221220;

//hh test --grep "picks a winner"
//hardhat run test --grep "picks a winner"
describe("Main_describe", function () {
  
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let deployedContractAddr;
    async function deployOneYearLockFixture() {
      
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;

      const lockedAmount = ONE_GWEI;
      const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      const contracts = [
        "./artifacts/contracts/src/erc20WWeth/WWethcreateWillsERC20", 
        "../../../artifacts/contracts/src/erc20WWeth/WWethcreateWillsERC20",
        "WWethcreateWillsERC20"];
        
      const Lock = await ethers.getContractFactory(contracts[2]);
      const lock = await Lock.deploy();
      console.log('Lock-----bytecode' )
      // console.log('deployTransaction<hash,type,accessList,blockHash,blockNumber,transactionIndex, from, gasPrice, gasLimit, to, value, nonce, data>')
      
      console.log('lock-----abi, signer, provider, callstatic, estimageGas, populateTransaction, filters, Approval, runningEvents, address')
      console.log('deployTransaction<hash,type,accessList,blockHash,blockNumber,transactionIndex, from, gasPrice, gasLimit, to, value, nonce, data, r,s,v,chainId>')
      deployedContractAddr = lock.deployTransaction.creates;
      console.log(`contract address: ${deployedContractAddr}`);
      // const initresult = await lock.init();
      
      // printToConsole(initresult.data);
      // const allSS = await lock.getAllAsset();
      // printToConsole(allSS.data);
      //console.log();
      return { lock, unlockTime, lockedAmount, owner, otherAccount };
    }

    describe("desc_test_configs",  function () {

          // it("print vars", async function () {
          //   const { lock, unlockTime, lockedAmount,  owner, otherAccount, thirdAcct } = await loadFixture(
          //     deployOneYearLockFixture
          //   );
            
   
          //   const startDatestr = new Date('YYYY-MM-DD');
          //   const startDatestr_timestampInSeconds = Math.floor(startDatestr.getTime() / 1000);

          //   const dateStr = '2023-12-27';

          //   const date = new Date(dateStr);

          //   // // 👇️ timestamp in milliseconds
          //   // const timestampInMs = date.getTime();

          //   // 👇️ timestamp in seconds (Unix timestamp)
          //   const timestampInSeconds = Math.floor(date.getTime() / 1000);
          //   console.log(timestampInSeconds);
          //   const ONE_GWEI = 1_000_000_000;
          //   //web3.eth.abi.decodeParameters(typesArray, hexString)
          //    //  await lock.addADMINrole(); 
          //   await lock.addADMINrole({value:lockedAmount});
          //   let allAssets = await lock.getAllAsset();
            
          //   printToConsole('....allAssets before change.......')
          //   printToConsole(allAssets)
            
          //   await lock.init();
          //   let allAssets2 = await lock.getAllAsset();
          //   printToConsole(`allAssets2 after-- ${allAssets2}`)
          //   printToConsole('---')
          //   printToConsole(allAssets2)
            
          //             // const event = String.toString(await lock.a_createCryptoVault(
          //             //   "ca-0",
          //             //   startDatestr_timestampInSeconds,
          //             //   timestampInSeconds,
          //             //   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"));
          //             //   printToConsole("event expected");
          //             //   printToConsole(event)
          //             // await time.increaseTo(unlockTime);

          //             // await expect(lock.withdraw())
          //             //   .to.emit(lock, "Withdrawal")
          //             //   .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
          // });
          
          it("no assets shoudl exist ", async function () {
            const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
            // const contractAddress = deployedContractAddr;
            // printToConsole(`contractADdr: ${contractAddress}`)
            // const myContract = await hre.ethers.getContractAt("WWethcreateWillsERC20", contractAddress);

          //  await lock.init();
            expect(await lock.checkAssetisAvailable('ca-0')).to.equal(false);
            
          });

          // it("create assets ", async function (lock) {
            
          //   await lock.init();
            
          // });
      
          it("does 'ca-0' exist? ", async function () {
            

            const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
            let amt1 = 1 * 10 * 18;
            
            const asstId = await lock.createAsset("t0", amt1);
            printToConsole(`does 'ca-0' exist? --> ${asstId} `);
        
            
            expect(await lock.checkAssetisAvailable('ca-0')).to.equal(true);
            
          });
      
          it("does 'ca-1' exist? ", async function () {
            
            const { lock } = await loadFixture(deployOneYearLockFixture);
            let amt2 = 2 * 10 * 18;
            const asstId = await lock.createAsset("t1", amt2);

            printToConsole(`does 'ca-1' exist? --> ${asstId} `);

            expect(await lock.checkAssetisAvailable('ca-1')).to.equal(true);
          });
          it("does 'ca-2' exist? ", async function () {
            const { lock } = await loadFixture(deployOneYearLockFixture);
            let amt3 = 3 * 10 * 18;
            const asstId = await lock.createAsset("t2", amt3);

            printToConsole(`does 'ca-2' exist? --> ${asstId} `);
            
            expect(await lock.checkAssetisAvailable('ca-3')).to.equal(true);
          }); 
          it("create 'ca-3' exist? ", async function () {
            const { lock } = await loadFixture(deployOneYearLockFixture);
              let amt4 = 3 * 10 * 1;
              const asstId =await lock.createAsset("t3", amt4);
              printToConsole(`does 'ca-2' exist? --> ${asstId} `);
            
            expect(await lock.checkAssetisAvailable('ca-3')).to.equal(true);
          }); 
          it("does 'ca-10' exist? ", async function () {
            const { lock } = await loadFixture(deployOneYearLockFixture);
              
            
            expect(await lock.checkAssetisAvailable('ca-10')).to.equal(true);
          }); 
      
          it("get all Wills", async function () {
            

              //printToConsole(await lock.getAllBonds());
          });

          it("create test Txns_a_createCryptoVault1", async function () {
            const { lock } = await loadFixture(deployOneYearLockFixture);

            let amt1 = 1 * 10 * 18;
            await expect(
              await lock.a_createCryptoVault(
                "ca-0",
                willStartDate,
                willEndDate,
                hardhat_BenefitorAddr
                
              )
              
            ).to.emit(lock, "willCreated")
            .withArgs(0, hardhat_BenefitorAddr, willEndDate, amt1); // We accept any value as `when` arg
            
           
          });

          it("recreate a_createCryptoVault1", async function () {
            
            const { lock } = await loadFixture(deployOneYearLockFixture);
            await lock.a_createCryptoVault(
              "ca-0",
              willStartDate,
              willEndDate,
              hardhat_BenefitorAddr
              
            );
          }); 
          it("a_createCryptoVault2", async function () {
            
            const { lock } = await loadFixture(deployOneYearLockFixture);
            await lock.a_createCryptoVault(
              "ca-1",
              willStartDate,
              willEndDate,
              hardhat_BenefitorAddr
              
            );
          }); 

          it("getUserCreatedBonds ", async function () {
            // debond
            // Debond-Token
            // Debond-Governace
            // Debond-Bank
            // Debond-oracle
            // Debond-bank
            // Debond-Exchange
            // 
            const { lock,owner } = await loadFixture(deployOneYearLockFixture);
            const userCreatedBonds  = await lock.getUserCreatedBonds(owner.address);
            console.log('----');
            console.log(userCreatedBonds);
            console.log('----');

          }); 

          it("getTransactionCount", async function () {
            // debond
            // Debond-Token
            // Debond-Governace
            // Debond-Bank
            // Debond-oracle
            // Debond-bank
            // Debond-Exchange
            // 
            const { lock,owner } = await loadFixture(deployOneYearLockFixture);
            const userCreatedBonds  = await lock.getUserCreatedBonds(owner.address);
            console.log('----');
            console.log(web3.eth.getTransactionCount);
            console.log('----');

          }); 
    
    });


    

});

