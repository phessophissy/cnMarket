# Smart Contracts

## CeloNFT.sol
ERC-721 NFT contract with:
- Three rarity levels (Common, Rare, Legendary)
- Configurable mint prices in CELO
- Per-rarity metadata URIs
- ERC721Enumerable for on-chain enumeration
- Owner-controlled URI and price updates

## NFTMarketplace.sol
Marketplace contract with:
- List NFTs for sale at custom prices
- Buy listed NFTs with CELO
- Cancel active listings
- ReentrancyGuard protection
- Active listing tracking and enumeration

## Deployment
```bash
npm run deploy:mainnet   # Celo Mainnet
npm run deploy:alfajores # Alfajores Testnet
```

## Verification
Contracts are verified on [Sourcify](https://repo.sourcify.dev).
