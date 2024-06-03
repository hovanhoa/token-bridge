// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenSwap is Ownable {
    IERC20 public erc20Token;
    uint256 public rate; // Number of ERC-20 tokens per 1 native token

    event SwapNativeToERC20(address indexed user, uint256 nativeAmount, uint256 erc20Amount);
    event SwapERC20ToNative(address indexed user, uint256 erc20Amount, uint256 nativeAmount);

    constructor(address _erc20Token, uint256 _rate) Ownable(_msgSender()) {
        erc20Token = IERC20(_erc20Token);
        rate = _rate;
    }

    function swapNativeToERC20() external payable {
        require(msg.value > 0, "Must send native token");
        uint256 erc20Amount = msg.value * rate;
        require(erc20Token.balanceOf(address(this)) >= erc20Amount, "Insufficient ERC-20 tokens in contract");

        erc20Token.transfer(msg.sender, erc20Amount);
        emit SwapNativeToERC20(msg.sender, msg.value, erc20Amount);
    }

    function swapERC20ToNative(uint256 erc20Amount) external {
        require(erc20Amount > 0, "Must send ERC-20 tokens");
        uint256 nativeAmount = erc20Amount / rate;
        require(address(this).balance >= nativeAmount, "Insufficient native tokens in contract");

        erc20Token.transferFrom(msg.sender, address(this), erc20Amount);
        payable(msg.sender).transfer(nativeAmount);
        emit SwapERC20ToNative(msg.sender, erc20Amount, nativeAmount);
    }

    // Function to withdraw native tokens
    function withdrawNative(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);
    }

    // Function to withdraw ERC-20 tokens
    function withdrawERC20(uint256 amount) external onlyOwner {
        require(erc20Token.balanceOf(address(this)) >= amount, "Insufficient balance");
        erc20Token.transfer(owner(), amount);
    }

    // Receive function to accept native tokens
    receive() external payable {}
}
