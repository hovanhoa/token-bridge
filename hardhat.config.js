require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "kameleon",
  networks: {
    kameleon: {
        url: process.env.RPC_ENDPOINT,
        accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2],
    }
  },
  sourcify: {
    enabled: true,
  },
};
