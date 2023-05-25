// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title A NFT Marketplace using ERC1155
/// @author Harish [@Blockc]

//0xC2Da16B967D13636F4F88E1Fa02d0d05a49ee5C7
contract LegendsofKrump is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _nftSold;
    //collections
    uint256[] public supplies = [1, 1, 1, 1, 1, 1, 1];
    uint256[] public minted = [0, 0, 0, 0, 0, 0, 0];
    mapping(uint256 => NftData) nftTracker;
    //[token]
    mapping(uint256 => mapping(address => bool)) public member;
    string public name = "Legends of Krump";
    //  _price is the price of one Crypto Dev NFT
    uint256 public _price = 0.02 ether;
    struct NftData {
        uint256 totalSupplies;
        uint256 minted;
    }

    //metadata
    ///ipfs/QmctCeyLnDd7yHvr3x1VZndXFBS2UwHQ2kpnrYUhUHL6r3
    //set images
    ///ipfs/QmZqF4PxcvtobxCGQfhd9iJp4pujAmUiNQGA8hqTzew7jD

    //https://ipfs.io/ipfs/QmctCeyLnDd7yHvr3x1VZndXFBS2UwHQ2kpnrYUhUHL6r3/?filename=tokenURI.json

    //https://ipfs.io/ipfs/QmctCeyLnDd7yHvr3x1VZndXFBS2UwHQ2kpnrYUhUHL6r3/?filename=0.json
    constructor()
        ERC1155(
            "ipfs://QmWBaJhyQccMH8Kv92d1v8B8kqpMLg9vAKKkVTXYUQWa9w/{id}.json"
        )
    {
        uint256 tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();
        //1
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //2
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //3
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //4
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //5
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //6
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();

        //7
        tokenId = _tokenIds.current();
        mint(tokenId);
        _tokenIds.increment();
    }

    //0xd9145CCE52D386f254917e481eB44e9943F39138
    // to Put NFT to Opensea
    function uri(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(_tokenId <= supplies.length - 1, "NFT does not exist");
        return
            string(
                abi.encodePacked(
                    "ipfs://QmWBaJhyQccMH8Kv92d1v8B8kqpMLg9vAKKkVTXYUQWa9w/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function mintByTokenId(uint256 _tokenId) public payable {
        require(
            !member[_tokenId][msg.sender],
            "You have already claimed this NFT."
        );
        require(_tokenId <= supplies.length - 1, "NFT does not exist");
        uint256 index = _tokenId;

        require(
            minted[index] + 1 <= supplies[index],
            "All the NFT have been minted"
        );
        require(msg.value == _price, "Ether sent is not correct");
        _mint(msg.sender, _tokenId, 1, "");
        // "" is data which is set empty
        minted[index] += 1;
        member[_tokenId][msg.sender] = true;
    }

    function mint(uint256 _tokenId) public payable {
        require(nftTracker[_tokenId].minted == 0, " NFT have been minted");
        // require(msg.value == _price, "Ether sent is not correct");

        nftTracker[_tokenId] = NftData(1, 0);
        _mint(msg.sender, _tokenId, 1, "");
        // "" is data which is set empty

        nftTracker[_tokenId].minted = 1;
        member[_tokenId][msg.sender] = true;
    }

    function totalNftMinted() public view returns (uint256) {
        return _tokenIds.current(); //minted[_tokenId];
    }

    function isTokenMinted(uint256 _tokenId) public view returns (bool) {
        return nftTracker[_tokenId].minted == 1;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
