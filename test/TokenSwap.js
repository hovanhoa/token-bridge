const { expect } = require("chai");
const web3 = require("web3");

describe("TokenSwap", function () {
  let token, swap, tokenAddress ,swapAddress;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Deploy ERC-20 token
    const Token = await ethers.getContractFactory("KameToken");
    token = await Token.deploy(web3.utils.toWei(21000000, "ether"));
    tokenAddress = await token.getAddress();
    console.log("ERC20 deployed at:    ", tokenAddress)

    // Deploy TokenSwap contract
    const Swap = await ethers.getContractFactory("TokenSwap");
    swap = await Swap.deploy(tokenAddress, 100);
    swapAddress = await swap.getAddress()
    console.log("SwapToken deployed at:", swapAddress)

    // Transfer some ERC-20 tokens to the swap contract
    await token.transfer(swapAddress, web3.utils.toWei(1000, "ether"));
  });

  it("Should swap native token to ERC-20 token", async function () {
    await swap.connect(addr1).swapNativeToERC20({ value: web3.utils.toWei(1, "ether") });
    expect(await token.balanceOf(addr1.address)).to.equal(web3.utils.toWei(100, "ether"));
  });

  it("Should swap ERC-20 token to native token", async function () {
    const initialAddr1NativeBalance = await ethers.provider.getBalance(addr1.address);
    const initialAddr1TokenBalance = await token.balanceOf(addr1.address);
    console.log("Initial native balance:", web3.utils.fromWei(initialAddr1NativeBalance, "ether"));
    console.log("Initial token balance:", web3.utils.fromWei(initialAddr1TokenBalance, "ether"));

    // Transfer some tokens to addr1 for the test
    await token.transfer(addr1.address, web3.utils.toWei(100, "ether"));
    const addr1TokenBalance = await token.balanceOf(addr1.address);
    console.log("Token balance after transfer:", web3.utils.fromWei(addr1TokenBalance, "ether"));

    // Approve token transfer
    await token.connect(addr1).approve(swapAddress, web3.utils.toWei(100, "ether"));
    const allowance = await token.allowance(addr1.address, swapAddress);
    console.log("Allowance:", web3.utils.fromWei(allowance, "ether"));

    // Add native tokens to the swap contract
    await owner.sendTransaction({ to: swapAddress, value: web3.utils.toWei(10, "ether") });
    const contractNativeBalance = await ethers.provider.getBalance(swapAddress);
    console.log("Contract native balance:", web3.utils.fromWei(contractNativeBalance, "ether"));

    // Perform the swap
    await swap.connect(addr1).swapERC20ToNative(web3.utils.toWei(100, "ether"));

    // Log final balances
    const finalAddr1NativeBalance = await ethers.provider.getBalance(addr1.address);
    const finalAddr1TokenBalance = await token.balanceOf(addr1.address);
    console.log("Final native balance:", web3.utils.fromWei(finalAddr1NativeBalance, "ether"));
    console.log("Final token balance:", web3.utils.fromWei(finalAddr1TokenBalance, "ether"));

    expect(await ethers.provider.getBalance(addr1.address)).to.be.above(initialAddr1NativeBalance);
    expect(await token.balanceOf(addr1.address)).to.equal(web3.utils.toWei(0, "ether"));

  });
});
