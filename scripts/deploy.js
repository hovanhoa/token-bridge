const { ethers } = require("hardhat");

async function main() {
    const TokenSwap = await ethers.getContractFactory("TokenSwap");
    const TokenSwapContract = await TokenSwap.deploy("0x22495B6533186F5bA8B5AE0ad47F20AC65014f00", 1);
    const TokenSwapAddress = await TokenSwapContract.getAddress();
    console.log("TokenSwap deployed to:", TokenSwapAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
