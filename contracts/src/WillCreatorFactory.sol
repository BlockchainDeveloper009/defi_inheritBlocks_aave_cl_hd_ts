// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Vault.sol";
import "./lib/willInfo.sol";

contract WillCreatorFactory is ERC1155, ERC1155Holder, Vault {
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    bool DoesAdminExist;

    bool OneBondinCirculation;

    address payable[] public buyers;

    // JSON-like structure containing info on each bond
    struct Person {
        string firstName;
        string lastName;
        string dateOfBirth;
        
    }
   
    struct Proof{
        string ssn;
        string driverLicense;
    }
    struct Property{
        uint PropertyType; //0 - crypto assets, 1  Real estate
    }
    struct willlInfo {
        //Person willCreator;
        string willofPropertyName;
        
        uint256 willStartDate;
        uint256 willMaturityDate;
        
        address willManager;
        //address Altcoinswap;
       // address payable[] willBenefitors;
    }

    // mapping of a bond to its information (of type Info above)
    mapping(uint256 => willlInfo) public s_willlInfo;

    uint256 s_currentBondId;
    address s_bondBankAddress;

    //this line is to create an array to keep track of the bonds
    willlInfo[] public s_willsinExistence;

    mapping(address => uint[]) public userCreatedWills;

    //this is to create an ADMIN role
    mapping(address => bool) public adminrole;

    event willCreated(
        uint256 indexed willId,
        string indexed willofPropertyName,
        uint256 willStartDate,
        uint256 willMaturityDate
        
    );

    constructor(string memory uri_) ERC1155("") {
        uri_ = "";
    }
    function createCryptoVault () external {

    }
    function createCashvault () external {

    }
    function createWill(
        string memory willofPropertyName,
        uint256 willStartDate,
        uint256 willMaturityDate,
        uint256 amount
    ) external {
        require(
            adminrole[msg.sender] == true,
            "You must be an admin to do this"
        );
        require(
            OneBondinCirculation == false,
            "There can only be one bond at a time"
        );

        s_willlInfo[s_currentBondId].willofPropertyName = willofPropertyName;
        uint256 m_willCreationTimeStamp = block.timestamp;
        
        s_willlInfo[s_currentBondId].willStartDate = willStartDate;
        s_willlInfo[s_currentBondId].willMaturityDate = willMaturityDate;
         

        s_willlInfo[s_currentBondId].willManager = msg.sender;

        OneBondinCirculation = true;

        _mint(address(this), s_currentBondId, 0, "0x");
        userCreatedWills[msg.sender].push(s_currentBondId);

        s_willsinExistence.push(
            willlInfo(
                willofPropertyName,
                m_willCreationTimeStamp,
                willMaturityDate,
                msg.sender
            )
        );

        unchecked {
            s_currentBondId++;
        }
        emit willCreated(
            s_currentBondId - 1,
            willofPropertyName,
            block.timestamp,
            willMaturityDate
        );
    }

    //this function is to initialize the admin role. This will provide the devs with funds
    function addADMINrole() external payable {
        // require (msg.value == 0 ether, " please send .001 ether");
        require(
            DoesAdminExist == false,
            "Only one Admin is allowed to issue bonds"
        );

        adminrole[msg.sender] = true;
        DoesAdminExist = true;
    }

    //returns Bonds created by a single user
    function getUserCreatedBonds(address addr)
        external
        view
        returns (uint[] memory)
    {
        return userCreatedWills[addr];
    }

    //returns all Bonds in existence
    function getAllBonds() external view returns (willlInfo[] memory) {
        return s_willsinExistence;
    }

    // returns true, if admin flag is set to calling address;else false
    function checkIfAddminRoleIsPresent() public view returns (bool) {
        if (adminrole[msg.sender] == true) {
            return true;
        } else {
            return false;
        }
    }
}
