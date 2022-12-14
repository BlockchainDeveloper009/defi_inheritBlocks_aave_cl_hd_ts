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

/** **********************************************
 * @notice
 * *******************************************
 * title cryptoWill creator
 *
 * author Harish
 * @dev uses erc20
 * contract purpose:
 * step1: Allows user to create assets(crypto coin value)
 * step2: Using asssetIds, create new Wills with start, maturity date, benefitors
 *         todo : start,end date to unix time stamp
 *         todo : get benefitors (payabel address [])
 *
 * Highlights :  chainlink KeepUp
 * variable naming:
 * //s_ = storage vars
 * //i_ immutable vars
 * // Chainlink oracle -> Automated Execution (Chainlink Keepers)
 * dec/09/2022 - add require statements to all methods
 * - burn the old will after hitting settle
 * - find out why contract doesnt get credited
 * - create new ds to fetch wills by maturity date either struct or new mapping + array combination
 * - Access control: https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks
 */
//error Raffle__UpkeepNotNeeded1(uint256 currentBalance, uint256 numPlayers, uint256 raffleState);

contract WWethcreateWillsERC20 is WWethBase20 {
    error Raffle__NotEnoughETHEntered();
    error Raffle__UpkeepNotNeeded();
    /* states variables */
    mapping(string => cryptoAssetInfo) public cryptoAssets;
    string[] s_arr_cryptoAssetIds;
    uint256 s_assetsCurrentId = 0;
    uint256 s_currentBondId = 0;
    uint256 private immutable i_entranceFee = 1;

    bool s_DoesAdminExist;

    bool s_OneBondinCirculation;

    // JSON-like structure containing info on each bond
    // mapping of a bond to its information (of type Info above)
    mapping(uint256 => willlInfo) public s_willlInfo;
    address s_bondBankAddress;

    //this line is to create an array to keep track of the bonds
    willlInfo[] public s_willsinExistence;

    mapping(address => willlInfo[]) public userCreatedWills;
    mapping(uint => uint[]) public s_WillsByMaturityDate;
    mapping(uint => uint) public s_MaturityDates;

    //this is to create an ADMIN role
    mapping(address => bool) public adminrole;

    /* Events */
    event willCreated(
        string indexed willofPropertyName,
        uint256 willStartDate,
        uint256 willMaturityDate,
        uint cryptoWillId
    );
    event willSettled(
        uint indexed cryptoWillId,
        address indexed benefitor,
        uint256 willMaturityDate,
        uint256 willAmount
    );

    struct willsByMaturitydates {
        uint maturityDate;
        uint willId;
    }

    // function createCashvault () external {

    // }

    modifier onlyAdmin() {
        require(
            adminrole[msg.sender] == true,
            "You must be an admin to do this"
        );
        _;
    }
    modifier onlyValidAsset(string memory locId) {
        require(
            cryptoAssets[locId].assetStatus == cryptoAssetStatus.Created,
            "Asset is not in Created Status "
        );
        _;
    }

    // modifier onlyNewAsset(string memory locId) {
    //     require(
    //         (cryptoAssets[locId].assetStatus != cryptoAssetStatus.Created &&
    //         cryptoAssets[locId].assetStatus != cryptoAssetStatus.Assigned ),
    //         "onlyNewAssets"
    //     );
    //     _;
    // }

    function createAsset(
        string memory assetName,
        uint256 assetAmount
    ) public returns (string memory) {
        //,
        string memory locId = string.concat(
            "ca-",
            Strings.toString(s_assetsCurrentId)
        );
        s_arr_cryptoAssetIds.push(locId);
        cryptoAssets[locId].AssetId = locId;
        cryptoAssets[locId].Name = assetName;
        cryptoAssets[locId].amount = assetAmount;

        cryptoAssets[locId].assetStatus = cryptoAssetStatus.Created;

        s_assetsCurrentId++;
        return locId;
    }

    // function receive() external payable { }
    function checkAssetisAvailable(
        string memory _assetId
    ) external view returns (bool) {
        return (cryptoAssets[_assetId].assetStatus ==
            cryptoAssetStatus.Created);
    }

    function getAllAsset() external view returns (string[] memory) {
        return s_arr_cryptoAssetIds;
    }

    function init() external virtual {
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

    function createTxn_zero() external payable virtual {
        a_createCryptoVault(
            "ca-0",
            20221210,
            20221220,
            payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
        );
    }

    function createTxn_one() external payable virtual {
        a_createCryptoVault(
            "ca-1",
            20221210,
            20221220,
            payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
        );
    }

    function createTxn_Metamask() external payable {
        a_createCryptoVault(
            "ca-3",
            20221210,
            20221220,
            payable(0xf821142CC270dAb63767cFAae15dC36D1b043348)
        );
    }

    function c_getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function a_createCryptoVault(
        string memory _assetId,
        uint256 willStartDate,
        uint256 willMaturityDate,
        address payable Benefitors
    ) public payable onlyValidAsset(_assetId) {
        s_willlInfo[s_currentBondId].assetId = _assetId;
        uint256 m_willCreationTimeStamp = block.timestamp;

        s_willlInfo[s_currentBondId].willStartDate = willStartDate;
        s_willlInfo[s_currentBondId].willMaturityDate = willMaturityDate;
        s_willlInfo[s_currentBondId].willManager = msg.sender;
        s_willlInfo[s_currentBondId].willOwner = msg.sender;
        s_willlInfo[s_currentBondId].s_baseStatus = baseStatus.Started;
        s_willlInfo[s_currentBondId].Benefitors = payable(Benefitors);

        cryptoAssets[_assetId].assetStatus = cryptoAssetStatus.Assigned;
        _mint(
            address(this),
            //s_currentBondId,
            cryptoAssets[_assetId].amount
        );
        userCreatedWills[msg.sender].push(s_willlInfo[s_currentBondId]);
        uint dateHash = generateHash(willMaturityDate);
        s_WillsByMaturityDate[willMaturityDate].push(s_currentBondId);
        //s_maturityDates.push(s_willlInfo);
        s_MaturityDates[willMaturityDate]++;
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
            _assetId,
            willStartDate,
            willMaturityDate,
            s_currentBondId - 1
        );
        // @todo implement maturity date based wills
    }

    //this function is to initialize the admin role. This will provide the devs with funds
    function addADMINrole() external payable {
        // require (msg.value == 0 ether, " please send .001 ether");
        require(
            s_DoesAdminExist == false,
            "Only one Admin is allowed to issue bonds"
        );
        // if (msg.value < i_entranceFee) {
        //     revert Raffle__NotEnoughETHEntered();
        // }

        adminrole[msg.sender] = true;
        s_DoesAdminExist = true;
    }

    //returns Bonds created by a single user
    function getUserCreatedBonds(
        address addr
    ) external view returns (willlInfo[] memory) {
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

    //0x1c91347f2A44538ce62453BEBd9Aa907C662b4bD
    function settleAssets(uint256 willId) public payable {
        string memory asst = s_willlInfo[willId].assetId;
        require(
            s_willlInfo[willId].s_baseStatus == baseStatus.Started,
            "Will not in Start Status"
        );
        //require for maturity date comparisoin
        //add only owner can call
        // s_willlInfo[willId].Benefitors.transfer(
        //     cryptoAssets[asst].amount);

        //safeTransferFrom(address(this),s_willlInfo[willId].Benefitors, willId, cryptoAssets[asst].amount, "0x0");
        payable(s_willlInfo[willId].Benefitors).transfer(
            cryptoAssets[asst].amount
        );
        s_willlInfo[willId].s_baseStatus = baseStatus.Settled;
        emit willSettled(
            willId,
            s_willlInfo[willId].Benefitors,
            s_willlInfo[willId].willMaturityDate,
            cryptoAssets[asst].amount
        );
    }

    function getWillStatus(uint willId) public view returns (string memory) {
        if (s_willlInfo[willId].s_baseStatus == baseStatus.Created) {
            return "Created";
        }
        if (s_willlInfo[willId].s_baseStatus == baseStatus.Started) {
            return "Started";
        }
        if (s_willlInfo[willId].s_baseStatus == baseStatus.Matured) {
            return "Matured";
        }
        if (s_willlInfo[willId].s_baseStatus == baseStatus.Settled) {
            return "Settled"; //Started, Matured, Settled
        }
    }

    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    //0x540d7E428D5207B30EE03F2551Cbb5751D3c7569

    fallback() external payable override {
        // custom function code
    }

    receive() external payable override {
        // custom function code
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getMaturityDates() public {}

    function getWillsByMaturityDates()
        public
        view
        returns (willsByMaturitydates[] memory)
    {
        willsByMaturitydates[] memory loc;
        int k = 0;
        // for(uint i=0;i<s_WillsByMaturityDate.length;i++)
        // {

        //     for(uint j=0;j< s_WillsByMaturityDate[s_MaturityDates[i]].length; j++)
        //     {
        //         loc[k].maturityDate = s_WillsByMaturityDate[i];
        //         loc[k].willId =  s_WillsByMaturityDate[s_MaturityDates[i]][j];
        //     }

        // }

        return loc;
    }

    function generateHash(uint matDate) public returns (uint) {
        return uint(keccak256(abi.encodePacked(matDate)));
    }

    // function performUpKeep(
    //     bytes calldata
    // ) external override {
    //     (bool upKeepNeeded,) = checkUpKeep("");
    //     if(!upKeepNeeded) {
    //         revert Raffle__UpkeepNotNeeded(
    //             // address(this).balance,
    //             // s_players.length,
    //             // uint256(s_raffleState)

    //         );
    //     }
    // }
    // function checkUpKeep(
    //     bytes memory /*checkData */
    // )
    // public
    // view
    // override
    // returns (
    //     bool upkeepNeeded,
    //     bytes memory /* performData*/
    // ){
    //     // bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
    //    settleAssets(1);
    //    upkeepNeeded = false;
    //    return (upkeepNeeded, "0x0");
    // }
    // function checkUpkeep(
    //     bytes memory /* checkData */
    // )
    //     public
    //     view
    //     override
    //     returns (
    //         bool upkeepNeeded,
    //         bytes memory /* performData */
    //     )
    // {
    //     // bool isOpen = RaffleState.OPEN == s_raffleState;
    //     // bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
    //     // bool hasPlayers = s_players.length > 0;
    //     // bool hasBalance = address(this).balance > 0;
    //     // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers);
    //     return (upkeepNeeded, "0x0"); // can we comment this out?
    // }
    //  /**
    //  * @dev Once `checkUpkeep` is returning `true`, this function is called
    //  * and it kicks off a Chainlink VRF call to get a random winner.
    //  */
    // function performUpkeep(
    //     bytes calldata /* performData */
    // ) external override {
    //     (bool upkeepNeeded, ) = checkUpkeep("");
    //     // require(upkeepNeeded, "Upkeep not needed");
    //     // if (!upkeepNeeded) {
    //     //     revert Raffle__UpkeepNotNeeded(
    //     //         address(this).balance,
    //     //         s_players.length,
    //     //         uint256(s_raffleState)
    //     //     );
    //     // }
    //     // s_raffleState = RaffleState.CALCULATING;
    //     // uint256 requestId = i_vrfCoordinator.requestRandomWords(
    //     //     i_gasLane,
    //     //     i_subscriptionId,
    //     //     REQUEST_CONFIRMATIONS,
    //     //     i_callbackGasLimit,
    //     //     NUM_WORDS
    //     // );
    //     // // Quiz... is this redundant?
    //     // emit RequestedRaffleWinner(requestId);
    // }
}
