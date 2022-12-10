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
//hh test --grep "picks a winner"
//hardhat run test --grep "picks a winner"
describe("Lock", function () {
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
    

    return { lock, unlockTime, lockedAmount, owner, otherAccount, thirdAcct };
  }
      describe("test_configs", function () {
      it("print vars", async function () {
        const { lock, unlockTime, lockedAmount,  owner, otherAccount, thirdAcct } = await loadFixture(
          deployOneYearLockFixture
        );
        
        console.log(`lock - ${lock}`);
        console.log(`unlockTime - ${unlockTime}`);
        console.log(`lockedAmount - ${lockedAmount}`);
        console.log(`otherAccount - ${otherAccount}`);
        console.log(`thirdAcct - ${thirdAcct}`);
        const startDatestr = new Date('YYYY-MM-DD');
        const startDatestr_timestampInSeconds = Math.floor(startDatestr.getTime() / 1000);

        const dateStr = '2023-12-27';

        const date = new Date(dateStr);

        // // 👇️ timestamp in milliseconds
        // const timestampInMs = date.getTime();

        // 👇️ timestamp in seconds (Unix timestamp)
        const timestampInSeconds = Math.floor(date.getTime() / 1000);
        console.log(timestampInSeconds);
        const ONE_GWEI = 1_000_000_000;
        //web3.eth.abi.decodeParameters(typesArray, hexString)
      //  await lock.addADMINrole(); 
        await lock.addADMINrole({value:lockedAmount});
        let allAssets = await lock.getAllAsset();
        
        printToConsole('....allAssets before change.......')
        printToConsole(allAssets)
        
        await lock.init();
        let allAssets2 = await lock.getAllAsset();
        printToConsole(`allAssets2 after-- ${allAssets2}`)
        printToConsole('---')
        printToConsole(allAssets2)
        
        // const event = String.toString(await lock.a_createCryptoVault(
        //   "ca-0",
        //   startDatestr_timestampInSeconds,
        //   timestampInSeconds,
        //   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"));
        //   printToConsole("event expected");
        //   printToConsole(event)
        // await time.increaseTo(unlockTime);

        // await expect(lock.withdraw())
        //   .to.emit(lock, "Withdrawal")
        //   .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });


      it("get all Wills", async function () {
        const { lock, unlockTime, lockedAmount,  owner, otherAccount, thirdAcct } = await loadFixture(
          deployOneYearLockFixture
        );

        printToConsole(await lock.getAllBonds());

      
    });

  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

    describe("checkUpKeep", function () {
      it("returns false if people havent", async function () {

      //

        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        //   await network.provider.send("evm_increaseTime");
        //   //to send transaction, because checkUpKeep method is with 'public' keyword
        //   //  ------   await lock.checkUpkeep([])

        //   //to memic above line and not send txn, call the method as shown below
        //   const { upkeepNeeded } = await lock.callStatic.checkUpkeep([])
        //   assert(!upkeepNeeded);

        // await time.increaseTo(unlockTime);

        // await expect(lock.withdraw()).to.changeEtherBalances(
        //   [owner, lock],
        //   [lockedAmount, -lockedAmount]
        // );


      });
    });
/*
    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
    */
  });

