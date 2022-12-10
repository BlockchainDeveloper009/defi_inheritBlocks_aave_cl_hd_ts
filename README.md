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
    npx hardhat run .\scripts\01_deploy_erc20WWeth.js --network mumbai
>>>> network
    npx hardhat run .\scripts\01_deploy_networks_erc20WWeth.js --network mumbai

>>> run test 
npx hardhat test .\test\tests_erc20WWeth\unitTests_erc20Wweth\WillCreator.test.js