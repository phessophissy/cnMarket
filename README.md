# 🎨 cnMarket

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://cnmarket.vercel.app)
[![Built on Celo](https://img.shields.io/badge/Built%20on-Celo-FCFF52)](https://celo.org)

> NFT minting and marketplace dApp built on Celo blockchain.

## 🚀 Live Demo

**[cnmarket.vercel.app](https://cnmarket.vercel.app)**

## ✨ Features

- **3 Rarity Levels** — Common (0.01 CELO), Rare (0.03 CELO), Legendary (0.05 CELO)
- **On-chain Marketplace** — List, buy, and cancel NFT listings
- **Verified Contracts** — Smart contracts verified on Sourcify
- **Mobile Ready** — Works with miniPay, MetaMask, and WalletConnect
- **Modern Stack** — Next.js 14, wagmi v2, TailwindCSS

## 📦 Smart Contracts

| Contract | Address | Verified |
|----------|---------|----------|
| CeloNFT | `0xA285c0f2cb1Bf72b94Fc71Bf3dC85C7A2da6480a` | ✅ |
| NFTMarketplace | `0xac37CE99815bF34f73426Ae5eEE2955Ef3544021` | ✅ |

## 🛠 Tech Stack

- **Blockchain:** Celo (EVM-compatible)
- **Smart Contracts:** Solidity 0.8.24, OpenZeppelin v5, Hardhat
- **Frontend:** Next.js 14, TypeScript, TailwindCSS
- **Web3:** wagmi v2, viem
- **Deployment:** Vercel

## 🏗 Getting Started

```bash
# Clone the repo
git clone https://github.com/phessophissy/cnMarket.git
cd cnMarket

# Install dependencies
npm install
cd frontend && npm install

# Set up environment
cp .env.example .env

# Compile contracts
npm run compile

# Start frontend dev server
cd frontend && npm run dev
```

## 📄 License

[MIT](LICENSE)

## 📁 Project Structure

```
cnMarket/
├── contracts/           # Solidity smart contracts
│   ├── CeloNFT.sol     # ERC-721 NFT with rarity levels
│   └── NFTMarketplace.sol # Marketplace with listings
├── frontend/            # Next.js 14 frontend
│   ├── src/app/         # App router pages
│   ├── src/components/  # Reusable UI components (30+)
│   ├── src/hooks/       # Custom React hooks (9)
│   └── src/lib/         # Utilities, config, and types
├── scripts/             # Deployment & verification scripts
├── test/                # Smart contract unit tests
└── .github/             # CI/CD workflows and templates
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for our security policy.
