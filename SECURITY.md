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

### Responsible disclosure timeline

We follow a coordinated disclosure process:

| Day | Action |
|-----|--------|
| 0 | Maintainer acknowledges receipt of the report. |
| ≤ 3 | Maintainer confirms or rejects validity, shares an initial assessment. |
| ≤ 14 | Fix is developed on a private branch and reviewed. |
| ≤ 30 | Patch is deployed; a public advisory + CVE (if applicable) is published. |
| 0–90 | Reporter is credited in the advisory (unless they prefer to remain anonymous). |

- Severity is triaged against the deployed mainnet contracts; high/critical
  reports may receive an expedited (≤ 7 day) patch cycle.
- Public disclosure **before** a patch is released is strongly discouraged and
  may disqualify a reporter from credit.
- Reports about the **frontend** (e.g. XSS, wallet-connect abuse) follow the
  same process but are triaged separately from smart-contract reports.

## Reentrancy & Checks-Effects-Interactions

The marketplace is the only contract that moves both ERC-20 and ERC-721 assets
in a single transaction, so reentrancy is the primary concern.

- **`NFTMarketplace.buyNFT`** is guarded by OpenZeppelin `ReentrancyGuard`
  (`nonReentrant`). A malicious ERC-721 receiver cannot re-enter `buyNFT`,
  `cancelListing`, or `listNFT` while a purchase is in flight.
- The listing is **removed before** any external call (`_removeListing`
  precedes the USDm `transferFrom` and the NFT `safeTransferFrom`). This is the
  Checks-Effects-Interactions pattern: the contract's state is updated first,
  so a reentrant call (were the guard ever bypassed) would find no active
  listing to operate on.
- **`CeloNFT.mint`** uses `_safeMint`, which calls `onERC721Received` on the
  recipient. If the recipient is an untrusted contract, ensure it implements
  `IERC721Receiver`; the mint itself does not move external ERC-20 funds into a
  reentrant path beyond the single `transferFrom`.
- ERC-20 payments depend on the USDm token's own reentrancy posture. Only a
  conformant, non-rebasing ERC-20 should be configured via `setUsdmToken`.

## Best Practices

- Never share your private keys
- Always verify contract addresses before interacting
- Use hardware wallets for large holdings
