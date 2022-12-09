import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const POLY_ALCHEMY_API_KEY_URL = process.env.POLY_ALCHEMY_API_KEY_URL;
let PRIVATE_KEY:string = "0xe62c67b5957d55905f510f374e16465d480287b5f87364f7f30330699e927648";
//process.env.MUMBAI_PRIVATE_KEY;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;
console.log(`PRIVATE_KEY -- ${PRIVATE_KEY}`)
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: POLY_ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};

export default config;
