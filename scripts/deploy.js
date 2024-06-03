const { ethers } = require("hardhat");
const web3 = require("web3");

async function main() {
    const Token = await ethers.getContractFactory("KameToken");
    const token = await Token.deploy(web3.utils.toWei(21000000, "ether"));
    const tokenAddress = await token.getAddress();
    console.log("ERC20 deployed at:    ", tokenAddress)

    const Swap = await ethers.getContractFactory("TokenSwap");
    const swap = await Swap.deploy(tokenAddress, 100);
    const swapAddress = await swap.getAddress()
    console.log("SwapToken deployed at:", swapAddress)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
