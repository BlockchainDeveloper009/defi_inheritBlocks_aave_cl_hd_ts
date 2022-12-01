// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC1155/ERC1155.sol)

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WWeth20 is ERC20 {
    event Deposit(address indexed account, uint amount);
    event Withdraw(address indexed account, uint amount);

    constructor() ERC20("Wrapped Will Ether", "WWETH") {}

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        deposit();
    }

    function depositWithCharges() public payable {
        //collect fees
        uint fees = (msg.value * 2) / 100;
        _mint(msg.sender, msg.value - fees);
        _mint(address(this), fees);
        emit Deposit(msg.sender, msg.value - fees);
    }

    function deposit() public payable {
        //collect fees
        uint fees = (msg.value * 2) / 100;
        _mint(msg.sender, msg.value - fees);
        _mint(address(this), fees);
        emit Deposit(msg.sender, msg.value - fees);
    }

    function withDraw(uint _amount) external {
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }
}
