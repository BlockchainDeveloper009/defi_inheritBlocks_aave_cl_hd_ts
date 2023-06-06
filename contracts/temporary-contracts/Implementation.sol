// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Implementation {
  event ImplementationLog(uint256 gas);

//   function() external payable {
//     emit ImplementationLog(gasleft());
//     assert(false);
//   }
fallback() external payable {
     emit ImplementationLog(gasleft());
     assert(false);
  }
}