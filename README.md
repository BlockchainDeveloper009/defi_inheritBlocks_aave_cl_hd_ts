# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

>>> deploy scripts
>>>> local
>>>>>>start local node
    npx hardhat node
    npx hardhat run .\scripts\01_deployLocally_erc20WWeth.js --network localhost
>>>> network
    npx hardhat run .\scripts\01_deploy_networks_erc20WWeth.js --network mumbai

>>> run test 
npx hardhat test .\test\tests_erc20WWeth\unitTests_erc20Wweth\WillCreator.test.js

npx hardhat test .\test\tests_erc20WWeth\unitTests_erc20Wweth\WillCreator.test.js --network localhost

stage
npx hardhat test .\test\tests_erc20WWeth\staging_erc20Wweth\WWethcreateWillsERC20.staging.test.js --network localhost



>>> environment setup

npm init --yes
npm install --save-dev hardhat
npx hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox

12-dec-22
contractaddr=0xA9e7A34F06B54aabBDcdF47747eb590c93e400d9
https://mumbai.polygonscan.com/address/0x6e6BE4038EC867D426FF246c94DbdB8Ed8Ec66Fe#code

01-jan-23
0x03C5958b53233dd659EBAECFD5d42fEFdc4D1fDf
https://mumbai.polygonscan.com/address/0x6a054EBC3107f60F7f2f3473fB28486545eE3307#code

solc --userdoc --devdoc ex1.sol
[to start local ode](npx hardhat node | )