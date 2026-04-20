# cnMarket

A production-ready NFT minting and marketplace dApp on the Celo blockchain. Mint NFTs with 3 rarity levels (Common, Rare, Legendary) and trade them on a decentralized marketplace.

## Tech Stack

- **Blockchain:** Celo Mainnet (ERC-721)
- **Smart Contracts:** Solidity 0.8.20 + OpenZeppelin v5
- **Frontend:** Next.js 14 (App Router) + TailwindCSS
- **Web3:** wagmi v2 + viem
- **Wallet:** miniPay (primary) + WalletConnect v2 (fallback)
- **Metadata:** IPFS

## Project Structure

```
cnMarket/
├── contracts/
│   ├── CeloNFT.sol            # ERC-721 NFT with rarity system
│   └── NFTMarketplace.sol      # Decentralized marketplace
├── scripts/
│   └── deploy.js               # Hardhat deployment script
├── metadata/                   # Sample IPFS metadata JSONs
├── frontend/
│   └── src/
│       ├── app/                # Next.js pages
│       ├── components/         # UI components
│       ├── hooks/              # Contract interaction hooks
│       └── lib/                # Config, ABIs, wagmi setup
├── hardhat.config.js
└── .env.example
```

## NFT Rarity & Pricing

| Rarity    | Mint Price | Color Theme   |
|-----------|-----------|---------------|
| Common    | 0.01 CELO | Silver/Gray   |
| Rare      | 0.03 CELO | Blue/Purple   |
| Legendary | 0.05 CELO | Gold/Orange   |

## Setup

### Prerequisites

- Node.js >= 18
- A Celo wallet with CELO for deployment
- (Optional) WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

### 1. Install Dependencies

```bash
# Root (smart contracts)
cd cnMarket
npm install

# Frontend
cd frontend
npm install
```

### 2. Configure Environment

```bash
# Root .env
cp .env.example .env
# Edit .env and add your DEPLOYER_PRIVATE_KEY

# Frontend .env
cp .env.example frontend/.env.local
# Will update with contract addresses after deployment
```

### 3. Upload Metadata to IPFS

Upload the files in `metadata/` to IPFS (using [Pinata](https://pinata.cloud), [nft.storage](https://nft.storage), or similar):

1. Upload your NFT images and note the CIDs
2. Update `metadata/common.json`, `metadata/rare.json`, `metadata/legendary.json` with image CIDs
3. Upload the JSON files and note their CIDs
4. Set the CIDs in `.env`:

```
COMMON_URI=ipfs://QmYourCommonCID/metadata.json
RARE_URI=ipfs://QmYourRareCID/metadata.json
LEGENDARY_URI=ipfs://QmYourLegendaryCID/metadata.json
```

### 4. Compile Contracts

```bash
npm run compile
```

## Deployment

### Deploy to Alfajores Testnet (Recommended First)

```bash
npm run deploy:alfajores
```

### Deploy to Celo Mainnet

```bash
npm run deploy:mainnet
```

After deployment, the script outputs the contract addresses. Add them to `frontend/.env.local`:

```
NEXT_PUBLIC_NFT_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
```

## Running the Frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## miniPay Integration

The app automatically detects miniPay's injected provider (`window.ethereum`). When opened in the miniPay browser:

1. Click **Connect Wallet** — miniPay connects automatically
2. Navigate to **Mint** to create NFTs
3. Select a rarity and confirm the transaction in miniPay
4. Go to **My NFTs** to view your collection
5. List NFTs for sale or browse the marketplace to buy

For non-miniPay users, WalletConnect v2 is available as a fallback connector.

## How to Mint & Trade

### Minting

1. Connect your wallet
2. Go to `/mint`
3. Choose a rarity (Common: 0.01, Rare: 0.03, Legendary: 0.05 CELO)
4. Confirm the transaction

### Listing for Sale

1. Go to `/my-nfts`
2. Click **List for Sale** on any NFT you own
3. Approve the marketplace contract (one-time per NFT)
4. Set your price in CELO
5. Confirm the listing transaction

### Buying

1. Browse the marketplace on the home page
2. Click on any listed NFT
3. Click **Buy** and confirm the transaction
4. The NFT transfers to your wallet and CELO goes to the seller

## Smart Contract Security

- **ReentrancyGuard** on all marketplace purchase functions
- **Ownership validation** before listing
- **Approval checks** before marketplace operations
- **Double-listing prevention** via active listing tracking
- **Checks-Effects-Interactions** pattern in buyNFT
- Built on audited **OpenZeppelin v5** contracts

## Contract ABIs

After compilation, ABIs are available in `artifacts/contracts/`. The frontend already has the necessary ABI definitions in `frontend/src/lib/abis.ts`.

## License

MIT
