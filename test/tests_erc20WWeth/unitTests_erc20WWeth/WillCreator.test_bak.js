const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
let debugMode = true;
//https://ethereum.stackexchange.com/questions/52913/how-can-i-get-the-data-returned-from-solidity-function-from-transaction-id-in-we
function printToConsole(str)
{ if(debugMode)
  {
    console.log(str);
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
    async function deployOneYearLockFixture() {
      const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
      const ONE_GWEI = 1_000_000_000;

      const lockedAmount = ONE_GWEI;
      const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount, thirdAcct] = await ethers.getSigners();
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
      console.log(`contract address: ${lock.deployTransaction.creates}`);
      await lock.init();
      return { lock, unlockTime, lockedAmount, owner, otherAccount, thirdAcct };
    }

    describe("desc_test_configs", function () {

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


          it("does 'ca-0' exist? ", async function () {
            const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
            expect(await lock.checkAssetisAvailable('ca-0')).to.equal(true);
          });
      
          it("does 'ca-1' exist? ", async function () {
            const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
            expect(await lock.checkAssetisAvailable('ca-1')).to.equal(true);
          });
          it("does 'ca-3' exist? ", async function () {
            const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
            expect(await lock.checkAssetisAvailable('ca-3')).to.equal(true);
          }); 
      
          it("get all Wills", async function () {
              const { lock, unlockTime, lockedAmount,  owner, otherAccount, thirdAcct } = await loadFixture(
                deployOneYearLockFixture
              );

              //printToConsole(await lock.getAllBonds());
          });

          it("create test Txns_a_createCryptoVault1", async function () {
            const { lock, unlockTime, lockedAmount,  owner, otherAccount, thirdAcct } = await loadFixture(
              deployOneYearLockFixture
            );
            
            lockedAmount = 1_000_000_000_000_000_000 ;
            await expect(
              await lock.a_createCryptoVault(
                "ca-0",
                willStartDate,
                willEndDate,
                hardhat_BenefitorAddr
                
              )
              
            ).to.emit(lock, "willCreated")
            .withArgs(0, hardhat_BenefitorAddr, willEndDate, lockedAmount); // We accept any value as `when` arg
            
           
          });

          it("a_createCryptoVault2", async function () {
            const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
            printToConsole(await lock.a_createCryptoVault(
              "ca-1",
              willStartDate,
              willEndDate,
              hardhat_BenefitorAddr
              
            ));
          }); 
          it("getUserCreatedBonds ", async function () {
            const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
            const { userCreatedBonds } = await lock.getUserCreatedBonds();
            console.log('----');
            console.log(userCreatedBonds);
            console.log('----');

          }); 
    
    });


    describe("desc_Deployment", function () {
        it("Should have admin role", async function () {
          const { lock, unlockTime, owner } = await loadFixture(deployOneYearLockFixture);
          
          await lock.addADMINrole();
          
          expect(await lock.checkIfAddminRoleIsPresent()).to.equal(true);
        });
    
        it("Should set the right owner", async function () {
          const { lock, owner } = await loadFixture(deployOneYearLockFixture);
          
          expect(await lock.owner()).to.equal(owner.address);
        });
    
      
        it("Should receive and store the funds to lock", async function () {
          const { lock, lockedAmount } = await loadFixture(
            deployOneYearLockFixture
          );
    
          expect(await ethers.provider.getBalance(lock.address)).to.equal(
            lockedAmount
          );
        });
    
        it("Should fail if the unlockTime is not in the future", async function () {
          // We don't use the fixture here because we want a different deployment
          const latestTime = await time.latest();
          const Lock = await ethers.getContractFactory("Lock");
          // await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
          //   "Unlock time should be in the future"
          // );
        });
    });


    describe("desc_Events_createMetamaskTxn", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );
        
        const willId = 2;
        
        const maturityDate = 20221220;
        lockedAmount = 3 * 10 * 1;
      
        // await expect(
        //         printToConsole(await lock.a_createCryptoVault(
        //           meta_txnAsst,
        //           willStartDate,
        //           willEndDate,
        //         meta_benefitorAddr
        //     ))
        //   ).to.emit(lock, "willCreated")
        //   .withArgs(willId, meta_benefitorAddr, willEndDate, lockedAmount); // We accept any value as `when` arg
          
        //   it(`does '${meta_txnAsst}' exist? `, async function () {
        //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);
            
        //     expect(await lock.checkAssetisAvailable(meta_txnAsst)).to.equal(false);
        //   });
        // });
      });
    });


    describe("desc_Withdrawals", function () {
      describe("Validations", function () {
        it("Should revert with the right error if called too soon", async function () {
          const { lock } = await loadFixture(deployOneYearLockFixture);
  
          await expect(lock.withdraw()).to.be.revertedWith(
            "You can't withdraw yet"
          );
        });
  
        it("Should revert with the right error if called from another account", async function () {
          const { lock, unlockTime, otherAccount } = await loadFixture(
            deployOneYearLockFixture
          );
  
          // We can increase the time in Hardhat Network
          await time.increaseTo(unlockTime);
  
          // We use lock.connect() to send a transaction from another account
          await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
            "You aren't the owner"
          );
        });
  
        it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
          const { lock, unlockTime } = await loadFixture(
            deployOneYearLockFixture
          );
  
          // Transactions are sent using the first signer by default
          await time.increaseTo(unlockTime);
  
          await expect(lock.withdraw()).not.to.be.reverted;
        });
      });
    });

    describe("desc_Events_settleAssets", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        const willId = 2;
        const benefitorAddr = 0xf821142CC270dAb63767cFAae15dC36D1b043348;
        const maturityDate = 20221220;
        lockedAmount = 3 * 10 * 1;
        //await time.increaseTo(unlockTime);

        await expect(lock.settleAssets(0))
          .to.emit(lock, "willSettled")
          .withArgs(willId, benefitorAddr, maturityDate, lockedAmount); // We accept any value as `when` arg
      });
    });

});


//VITE_FIREBASE={"apiKey":"slslsls","slsls":"lelsls"}
//const p = process?.env ? process.env : import.meta.env;
//const firebase_config = JSON.parse(p.VITE_FIREBASE);
/*
CLIENT_SECRET = "{
  "type": "service_account",
  "project_id": "gobirdie-landing-page",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY----- xxxxx -----END PRIVATE KEY-----\n",
  "client_email": "xxxxxxx@gobirdie-landing-page.iam.gserviceaccount.com",
  "client_id": "xxxxxxxxx",
  "auth_uri": "xxxxxx",
  "token_uri": "xxxxxxx": "xxxxxxxx": "xxxxxxxxx"
}" 

*/