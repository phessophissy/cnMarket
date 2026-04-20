# Scripts

## deploy.js
Deploys CeloNFT and NFTMarketplace to the configured network.

### Usage
```bash
# Testnet
npx hardhat run scripts/deploy.js --network alfajores

# Mainnet
npx hardhat run scripts/deploy.js --network celo
```

### Environment Variables
- `DEPLOYER_PRIVATE_KEY` — Wallet private key for deployment
- `COMMON_URI` — Metadata URI for Common NFTs
- `RARE_URI` — Metadata URI for Rare NFTs
- `LEGENDARY_URI` — Metadata URI for Legendary NFTs
