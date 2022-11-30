// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Vault.sol";
import "./lib/willInfo.sol";
import "./BaseWill.sol";

contract CryptoWillCreator is BaseWill {
    bool DoesAdminExist;

    bool OneBondinCirculation;

    address payable[] public buyers;

    // JSON-like structure containing info on each bond
    // mapping of a bond to its information (of type Info above)
    mapping(uint256 => willlInfo) public s_willlInfo;
    address s_bondBankAddress;

    //this line is to create an array to keep track of the bonds
    willlInfo[] public s_willsinExistence;

    mapping(address => uint[]) public userCreatedWills;

    //this is to create an ADMIN role
    mapping(address => bool) public adminrole;

    event willCreated(
        string indexed willofPropertyName,
        uint256 willStartDate,
        uint256 willMaturityDate,
        uint cryptoWillId
    );

    constructor(string memory uri_) BaseWill("") {
        uri_ = "";
    }

    // function createCashvault () external {

    // }
    mapping(string => cryptoAssetInfo) public cryptoAssets;
    string[] s_arr_cryptoAssetIds;
    uint256 s_assetsCurrentId = 0;
    uint256 s_currentBondId = 0;

    function createAsset(string memory assetName, uint256 assetAmount)
        public
        payable
    {
        //,
        string memory locId = string.concat(
            "ca-",
            Strings.toString(s_assetsCurrentId)
        );
        s_arr_cryptoAssetIds.push(locId);
        cryptoAssets[locId].AssetId = locId;
        cryptoAssets[locId].Name = assetName;
        cryptoAssets[locId].amount = assetAmount;
        cryptoAssets[locId].isValue = true;
        s_assetsCurrentId++;
    }

    // function receive() external payable { }
    function getAsset(string memory _assetId) external view returns (bool) {
        return (cryptoAssets[_assetId].isValue == true);
    }

    function getAllAsset() external view returns (string[] memory) {
        return s_arr_cryptoAssetIds;
    }

    function init() external {
        createAsset("t1", 20000000);
        createAsset("t2", 2222222222);
        createAsset("t3", 33333333333);
        // createCryptoVault("ca-0", 7, 7,100,[0x17F6AD8Ef982297579C203069C1DbfFE4348c372]);
        // createCryptoVault("ca-1", 7, 7,100,["0x17F6AD8Ef982297579C203069C1DbfFE4348c372"]);
    }

    function c_getContractBalance(address ContractAddress)
        public
        view
        returns (uint)
    {
        return ContractAddress.balance;
    }

    function a_createCryptoVault(
        string memory _assetId,
        uint256 willStartDate,
        uint256 willMaturityDate,
        address payable Benefitors
    ) public payable {
        require(
            adminrole[msg.sender] == true,
            "You must be an admin to do this"
        );
        require(
            cryptoAssets[_assetId].isValue == true, //"' "+_assetId + "' crypto asset Not found"
            "' crypto asset Not found"
        );

        s_willlInfo[s_currentBondId].assetId = _assetId;
        uint256 m_willCreationTimeStamp = block.timestamp;

        s_willlInfo[s_currentBondId].willStartDate = willStartDate;
        s_willlInfo[s_currentBondId].willMaturityDate = willMaturityDate;
        s_willlInfo[s_currentBondId].willManager = msg.sender;
        s_willlInfo[s_currentBondId].willOwner = msg.sender;

        s_willlInfo[s_currentBondId].Benefitors = payable(Benefitors);

        _mint(
            address(this),
            s_currentBondId,
            cryptoAssets[_assetId].amount,
            "0x"
        );
        userCreatedWills[msg.sender].push(s_currentBondId);
        // s_willsinExistence.push(
        //     willlInfo(
        //         _assetId,
        //         m_willCreationTimeStamp,
        //         willMaturityDate,
        //         msg.sender
        //     )
        // );

        //payable(msg.sender).transfer(cryptoAssets[_assetId].amount);
        // transferFrom(msg.sender, address(this), cryptoAssets[_assetId].amount);

        unchecked {
            s_currentBondId++;
        }

        emit willCreated(
            //s_currentBondId - 1,

            _assetId,
            block.timestamp,
            willMaturityDate,
            s_currentBondId - 1
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

    function setApproval(uint willId) public {
        _setApprovalForAll(
            s_willlInfo[willId].willOwner,
            s_willlInfo[willId].Benefitors,
            true
        );
    }

    function settleAssets(uint256 willId) external payable {
        string memory asst = s_willlInfo[willId].assetId;
        // s_willlInfo[willId].Benefitors.transfer(
        //     cryptoAssets[asst].amount);

        safeTransferFrom(
            address(this),
            s_willlInfo[willId].Benefitors,
            willId,
            cryptoAssets[asst].amount,
            "0x0"
        );
    }

    fallback() external payable {
        // custom function code
    }

    receive() external payable {
        // custom function code
    }
}
