// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title CeloNFT — ERC-721 NFT with rarity levels minted via USDm
/// @notice Mint NFTs in three rarity tiers (Common, Rare, Legendary),
///         each with its own price and metadata URI. Payments are made in USDm.
/// @dev Extends ERC721Enumerable for on-chain enumeration and Ownable for
///      admin-gated configuration of prices, URIs, and the USDm token.
contract CeloNFT is ERC721, ERC721Enumerable, Ownable {
    /// @notice Rarity tiers available for minting.
    /// @return Common   Lowest tier (0.01 ether by default).
    /// @return Rare     Mid tier (0.03 ether by default).
    /// @return Legendary Highest tier (0.05 ether by default).
    enum Rarity { Common, Rare, Legendary }

    uint256 private _nextTokenId;

    /// @notice The USDm (ERC-20) token accepted for mint payments.
    IERC20 public usdmToken;

    /// @notice Mint price (in USDm base units) for each rarity tier.
    mapping(Rarity => uint256) public mintPrices;

    /// @notice Rarity assigned to each minted token.
    mapping(uint256 => Rarity) public tokenRarity;

    mapping(Rarity => string) private _rarityURIs;

    /// @notice Emitted when an NFT is successfully minted.
    /// @param to       Recipient of the newly minted token.
    /// @param tokenId  ID of the minted token.
    /// @param rarity   Rarity tier of the minted token.
    event NFTMinted(address indexed to, uint256 indexed tokenId, Rarity rarity);

    /// @notice Deploys the CeloNFT contract and configures initial rarity prices/URIs.
    /// @param commonURI    Metadata URI for Common-tier tokens.
    /// @param rareURI      Metadata URI for Rare-tier tokens.
    /// @param legendaryURI Metadata URI for Legendary-tier tokens.
    /// @param usdmToken_   Address of the USDm ERC-20 token used for payments.
    constructor(
        string memory commonURI,
        string memory rareURI,
        string memory legendaryURI,
        address usdmToken_
    ) ERC721("Celo NFT Marketplace", "CNFT") Ownable(msg.sender) {
        require(usdmToken_ != address(0), "Invalid USDm address");
        usdmToken = IERC20(usdmToken_);

        mintPrices[Rarity.Common] = 0.01 ether;
        mintPrices[Rarity.Rare] = 0.03 ether;
        mintPrices[Rarity.Legendary] = 0.05 ether;

        _rarityURIs[Rarity.Common] = commonURI;
        _rarityURIs[Rarity.Rare] = rareURI;
        _rarityURIs[Rarity.Legendary] = legendaryURI;
    }

    /// @notice Mints a new NFT of the given rarity to the caller after taking USDm payment.
    /// @dev Requires the caller to have approved this contract to spend at least the
    ///      rarity's mint price in USDm. Reverts on insufficient allowance or transfer failure.
    /// @param rarity The rarity tier to mint.
    function mint(Rarity rarity) external {
        uint256 price = mintPrices[rarity];
        require(
            usdmToken.allowance(msg.sender, address(this)) >= price,
            "Insufficient USDm allowance"
        );
        require(
            usdmToken.transferFrom(msg.sender, address(this), price),
            "USDm transfer failed"
        );

        uint256 tokenId = _nextTokenId++;
        tokenRarity[tokenId] = rarity;
        _safeMint(msg.sender, tokenId);

        emit NFTMinted(msg.sender, tokenId, rarity);
    }

    /// @notice Updates the USDm token used for mint payments.
    /// @dev Only callable by the contract owner. The zero address is rejected.
    /// @param usdmToken_ New USDm token address.
    function setUsdmToken(address usdmToken_) external onlyOwner {
        require(usdmToken_ != address(0), "Invalid USDm address");
        usdmToken = IERC20(usdmToken_);
    }

    /// @notice Withdraws the entire USDm balance held by this contract to the owner.
    /// @dev Only callable by the contract owner. Reverts if there is nothing to withdraw.
    function withdrawUSDm() external onlyOwner {
        uint256 bal = usdmToken.balanceOf(address(this));
        require(bal > 0, "Nothing to withdraw");
        require(usdmToken.transfer(owner(), bal), "Transfer failed");
    }

    /// @notice Returns the metadata URI for a token, based on its rarity tier.
    /// @dev Reverts if the token does not exist (via `_requireOwned`).
    /// @param tokenId ID of the token whose URI is requested.
    /// @return The rarity-tier metadata URI for the token.
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _rarityURIs[tokenRarity[tokenId]];
    }

    /// @notice Sets the metadata URI for a given rarity tier.
    /// @dev Only callable by the contract owner.
    /// @param rarity Rarity tier whose URI should be updated.
    /// @param uri    New metadata URI for the tier.
    function setRarityURI(Rarity rarity, string calldata uri) external onlyOwner {
        _rarityURIs[rarity] = uri;
    }

    /// @notice Sets the mint price (in USDm base units) for a given rarity tier.
    /// @dev Only callable by the contract owner. Use base units (not ether).
    /// @param rarity Rarity tier whose price should be updated.
    /// @param price  New mint price in USDm base units.
    function setMintPrice(Rarity rarity, uint256 price) external onlyOwner {
        mintPrices[rarity] = price;
    }



    // Required overrides for ERC721Enumerable

    /// @notice Hook invoked on every token transfer/mint/burn.
    /// @dev Required to reconcile ERC721 and ERC721Enumerable storage.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    /// @notice Notifies the contract of a balance increase without a transfer (e.g. mint batches).
    /// @dev Required to reconcile ERC721 and ERC721Enumerable storage.
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    /// @notice Whether this contract implements the given interface.
    /// @dev Required to reconcile ERC721 and ERC721Enumerable interface support.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
