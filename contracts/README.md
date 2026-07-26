# Smart Contracts

## CeloNFT.sol
ERC-721 NFT contract with:
- Three rarity levels (Common, Rare, Legendary)
- Configurable mint prices in **USDm** (ERC-20)
- Per-rarity metadata URIs
- ERC721Enumerable for on-chain enumeration
- Owner-controlled URI and price updates

## NFTMarketplace.sol
Marketplace contract with:
- List NFTs for sale at custom prices
- Buy listed NFTs with **USDm** (ERC-20)
- Cancel active listings
- ReentrancyGuard protection
- Active listing tracking and enumeration

## Architecture

The two contracts are designed to work together but remain loosely coupled:

```
            USDm (ERC-20)
                 |
                 | payment / allowance
                 v
+-------------------+   owns/ transfers   +----------------------+
|     CeloNFT       | <------------------ |   NFTMarketplace     |
|  (ERC-721 + Enum) |   safeTransferFrom  |  (list / buy / cancel)|
+-------------------+                     +----------------------+
        ^                                            |
        | mint(rarity)                                |
        |   - USDm transferFrom                       |
        |   - _safeMint                               |
        +----------------------------------------------+
              owner (minter)
```

- **CeloNFT** is the canonical ERC-721 token. Minting pulls USDm from the caller
  into the contract via `transferFrom`; admin can later withdraw accumulated USDm.
- **NFTMarketplace** is bound at construction to a specific NFT contract and USDm
  token. It never custodies NFTs long-term — it uses the seller's approval to
  `safeTransferFrom` the token directly from seller to buyer at purchase time.
- Payments always flow in **USDm**, never in native CELO, for both minting and sales.

## Deployment
```bash
npm run deploy:mainnet   # Celo Mainnet
npm run deploy:alfajores # Alfajores Testnet
```

## Verification
Contracts are verified on [Sourcify](https://repo.sourcify.dev).

## Events Reference

All events are emitted from the two contracts and can be indexed off-chain for
UI updates and analytics.

### CeloNFT

| Event | Indexed params | Description |
|-------|----------------|-------------|
| `NFTMinted(to, tokenId, rarity)` | `to`, `tokenId` | Emitted on every successful mint. |

### NFTMarketplace

| Event | Indexed params | Description |
|-------|----------------|-------------|
| `NFTListed(tokenId, seller, price)` | `tokenId`, `seller` | A token was put up for sale. |
| `NFTDelisted(tokenId, seller)` | `tokenId`, `seller` | An active listing was cancelled by the seller. |
| `NFTSold(tokenId, seller, buyer, price)` | `tokenId`, `seller`, `buyer` | A listed token was purchased. |
