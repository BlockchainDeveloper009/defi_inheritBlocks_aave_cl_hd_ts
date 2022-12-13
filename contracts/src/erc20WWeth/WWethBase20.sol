// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./WWeth20.sol";

//import "./lib/willInfo.sol";

contract WWethBase20 is WWeth20 {
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
    enum baseStatus {
        Created,
        Started,
        Matured,
        Settled
    }
    struct willlInfo {
        //Person willCreator;
        string assetId;
        uint256 willStartDate;
        uint256 willMaturityDate;
        address willOwner;
        address willManager;
        address payable Benefitors;
        baseStatus s_baseStatus;
        //address Altcoinswap;
        // address payable[] willBenefitors;
    }
    struct cryptoAssetInfo {
        string AssetId;
        string Name;
        uint256 amount;
        bool isValue;
        cryptoAssetStatus assetStatus;
    }
    enum cryptoAssetStatus {
        Created,
        Assigned
    }
    mapping(address => uint) balances;
    mapping(address => mapping(address => bool)) approved;

    // function manipulateMapOfMap(uint spender) external {
    //     approved[msg.sender][spender] = true;                     //assign a value to the approved map
    //     approved[msg.sender][spender];                           //get the value of the map

    //     delete approved[msg.sender][spender] ;                    //delete the reference
    // }
    mapping(address => uint[]) scores;
}
