// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
//import "./Vault.sol";
//import "./lib/willInfo.sol";
import "./WWethBase20.sol";
import "hardhat/console.sol";

contract consumeWWethcreateWillsERC20 is WWethcreateWillsERC20 {
    function init() external {
        uint256 amt1 = 1 * 10 * 18;
        uint256 amt2 = 2 * 10 * 18;
        uint256 amt3 = 3 * 10 * 18;

        createAsset("t1", amt1);
        createAsset("t2", amt2);
        createAsset("t3", amt3);
        uint256 amt4 = 3 * 10 * 1;

        createAsset("t4", amt4);
        // createCryptoVault("ca-1", 7, 7,100,["0x17F6AD8Ef982297579C203069C1DbfFE4348c372"]);
    }

    function createTxn_zero() external payable {
        a_createCryptoVault(
            "ca-0",
            20221210,
            20221220,
            payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
        );
    }

    function createTxn_one() external payable {
        a_createCryptoVault(
            "ca-1",
            20221210,
            20221220,
            payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
        );
    }
}
