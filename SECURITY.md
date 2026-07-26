# Security Policy

## Smart Contract Security

- CeloNFT uses OpenZeppelin v5 audited contracts
- NFTMarketplace implements ReentrancyGuard for purchase protection
- All contracts are verified on Sourcify

## Access Control

Privilege boundaries across the two contracts are deliberately narrow:

| Function | Caller | Purpose |
|----------|--------|---------|
| `CeloNFT.mint` | anyone (payer) | Mint by paying the rarity price in USDm |
| `CeloNFT.setUsdmToken` | `owner` | Swap the accepted payment token |
| `CeloNFT.setMintPrice` | `owner` | Adjust a rarity tier's price |
| `CeloNFT.setRarityURI` | `owner` | Update a tier's metadata URI |
| `CeloNFT.withdrawUSDm` | `owner` | Sweep accumulated USDm |
| `NFTMarketplace.listNFT` | token owner | List only your own NFT |
| `NFTMarketplace.cancelListing` | listing seller | Cancel only your own listing |
| `NFTMarketplace.buyNFT` | anyone (payer) | Purchase a listed NFT |

- **CeloNFT** inherits OpenZeppelin `Ownable`; the deployer is the initial
  owner. Only `owner`-gated functions can change prices, URIs, the payment
  token, or withdraw funds.
- **NFTMarketplace** has no admin role by design — it is immutable-bound to its
  NFT and USDm tokens at construction. Sellers can only list/cancel their own
  tokens; buyers pay sellers directly via `transferFrom`.
- There is no upgradeability path (no proxy); changes require a redeploy.

## Reporting Vulnerabilities

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. Email the details to the maintainers
3. Include steps to reproduce

## Best Practices

- Never share your private keys
- Always verify contract addresses before interacting
- Use hardware wallets for large holdings
