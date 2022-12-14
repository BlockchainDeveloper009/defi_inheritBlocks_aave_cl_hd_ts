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
