import { HardhatUserConfig, extendEnvironment, task} from "hardhat/config";
//import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
//require("@nomicfoundation/hardhat-toolbox");
//require("dotenv").config({ path: ".env" });



let POLY_ALCHEMY_API_KEY_URL = process.env.POLY_ALCHEMY_API_KEY_URL;
let GOERLI_ALCHEMY_API_KEY_URL = process.env.GOERLI_ALCHEMY_API_KEY_URL;   
let learnweb3_pk:any = process.env.LEARNWEB3DEVACCT_2   
let PRIVATE_KEY:string = "0xe62c67b5957d55905f510f374e16465d480287b5f87364f7f30330699e927648";
POLY_ALCHEMY_API_KEY_URL='https://polygon-mumbai.g.alchemy.com/v2/3b2s_ycI-VRJbbV-stREOv_x1w3XC5LQ'
GOERLI_ALCHEMY_API_KEY_URL='https://eth-goerli.g.alchemy.com/v2/FV2iJUUiDrWhIRvvrDLwfmWoNOxFcx6X'
learnweb3_pk='78b08f305e50cb84a2dad4ccd6c3debbe38b0cae2117e655667f8ae873f5cbb7'
//extendEnvironment((hre) => { hre.myPlugin = "Hello World"; });

//

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
// task action function receives the Hardhat Runtime Environment as second argument
task(
  "blockNumber",
  "Prints the current block number",
  async (_, { ethers }) => {
    await ethers.provider.getBlockNumber().then((blockNumber) => {
      console.log("Current block number: " + blockNumber);
    });
  }
);
// extendEnvironment((hre) => {
//   const Web3 = require("web3");
//   hre.Web3 = Web3;

//   // hre.network.provider is an EIP1193-compatible provider.
//   hre.web3 = new Web3(hre.network.provider);
// });
//process.env.MUMBAI_PRIVATE_KEY;
let POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;
// console.log(`POLY_ALCHEMY_API_KEY_URL -- ${POLY_ALCHEMY_API_KEY_URL}`)
// console.log(`GOERLI_ALCHEMY_API_KEY_URL -- ${GOERLI_ALCHEMY_API_KEY_URL}`)
// console.log(`learnweb3_pk -- ${learnweb3_pk}`)
// console.log(`PRIVATE_KEY -- ${PRIVATE_KEY}`)
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: POLY_ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_ALCHEMY_API_KEY_URL,
      accounts: [learnweb3_pk],
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],

    },
  },
  
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
  gasReporter: {
    currency: 'GBP',
    gasPrice: 50
  },
  
      
};

export default config;
