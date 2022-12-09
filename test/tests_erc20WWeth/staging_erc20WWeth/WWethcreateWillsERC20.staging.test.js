const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
//.\artifacts\contracts\src\erc20WWeth\WWethcreateWillsERC20

describe("Raffle Staging Tests", function () {

        let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])

              raffle = await ethers.getContract("WWethcreateWillsERC20", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

         describe("fulfillRandomWords", function () {

         });
});