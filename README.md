# Token Bridge Smart Contract

Some smart contracts is used to build a bridge for ERC20 and native token.
It comes with most sensible plugins already installed:

-   [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
-   [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation
-   [Dotenv](https://github.com/motdotla/dotenv): loads environment variables from .env
-   [Web3.js](https://github.com/web3/web3.js): simplify my code with built-in utilities
-   [Openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts): a library for secure smart contract development

## Usage

### Pre Requisites

First, config the `.env` file (ex `.env.example`)
```
RPC_ENDPOINT=
PRIVATE_KEY_1=
PRIVATE_KEY_2=
```

Before running any command, make sure to install dependencies:

```sh
npm install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
npx hardhat compile
```

### Test

```sh
npx hardhat test
```

### Deploy contract to network

```sh
npx hardhat run scripts/deploy.js
```

## License

Distributed under the MIT License.