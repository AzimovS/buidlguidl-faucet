# BuidlGuidl Faucet App on 🏗 Scaffold-ETH 2

## About The Project

<p align="center">
  <img src="assets/demo.png" alt="demo" width="75%"/>
</p>

This is a simple Ethereum faucet application that provides users with a small amount of Sepolia ETH. You can request 0.1 ETH if your balance is less than 0.2 ETH. Additionally, feel free to deposit more ETH on the dedicated deposit page.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with NFT Snaking App, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/AzimovS/buidlguidl-faucet.git
cd buidlguidl-faucet
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation 🏗 Scaffold-ETH 2

Here's the original [Scaffold-ETH 2 documentation](https://docs.scaffoldeth.io)
