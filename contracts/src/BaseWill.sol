// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Vault.sol";
import "./lib/willInfo.sol";

contract BaseWill is ERC1155, ERC1155Holder, Vault {
    struct Person {
        string firstName;
        string lastName;
        string dateOfBirth;
    }
    struct Proof {
        string ssn;
        string driverLicense;
    }
    struct Property {
        uint PropertyType; //0 - crypto assets, 1  Real estate
    }
    struct willlInfo {
        //Person willCreator;
        string assetId;
        uint256 willStartDate;
        uint256 willMaturityDate;
        address willManager;
        address payable Benefitors;
        //address Altcoinswap;
        // address payable[] willBenefitors;
    }
    struct cryptoAssetInfo {
        string AssetId;
        string Name;
        uint256 amount;
        bool isValue;
    }

    constructor(string memory uri_) ERC1155("") {
        uri_ = "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    mapping(address => uint) balances;
    mapping(address => mapping(address => bool)) approved;

    // function manipulateMapOfMap(uint spender) external {
    //     approved[msg.sender][spender] = true;                     //assign a value to the approved map
    //     approved[msg.sender][spender];                           //get the value of the map

    //     delete approved[msg.sender][spender] ;                    //delete the reference
    // }
    mapping(address => uint[]) scores;

    function manipulateArrayMap() external {
        scores[msg.sender].push(1); //assign a value;
        scores[msg.sender].push(2); //assign another element

        scores[msg.sender][0]; //access the element in the map array

        scores[msg.sender][1] = 5; //update an element in the map array in index 1

        delete scores[msg.sender][0]; //delete the element in the index 0 of the map array
    }
}
