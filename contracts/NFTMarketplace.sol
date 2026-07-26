// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title NFTMarketplace — peer-to-peer NFT sales paid in USDm
/// @notice Allows NFT owners to list tokens for sale at a fixed USDm price,
///         buyers to purchase listed tokens, and sellers to cancel listings.
/// @dev Uses a swap-and-pop active-listing array for O(1) enumeration and removal,
///      and ReentrancyGuard to protect purchases.
contract NFTMarketplace is ReentrancyGuard {
    /// @notice A fixed-price sale listing for a single token.
    /// @param seller Address of the current owner selling the token.
    /// @param price  Sale price in USDm base units.
    struct Listing {
        address seller;
        uint256 price;
    }

    /// @notice The ERC-721 NFT being traded (immutable).
    IERC721 public immutable nftContract;

    /// @notice The USDm ERC-20 token used for payments (immutable).
    IERC20 public immutable usdmToken;

    mapping(uint256 => Listing) public listings;
    uint256[] private _activeTokenIds;
    mapping(uint256 => uint256) private _activeIndex;
    mapping(uint256 => bool) private _isActive;

    /// @notice Emitted when an NFT is listed for sale.
    /// @param tokenId ID of the listed token.
    /// @param seller  Address of the seller (token owner).
    /// @param price   Sale price in USDm base units.
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);

    /// @notice Emitted when an active listing is cancelled by the seller.
    /// @param tokenId ID of the delisted token.
    /// @param seller  Address of the seller who cancelled.
    event NFTDelisted(uint256 indexed tokenId, address indexed seller);

    /// @notice Emitted when a listed NFT is purchased.
    /// @param tokenId ID of the sold token.
    /// @param seller  Address of the previous owner (seller).
    /// @param buyer   Address of the purchaser.
    /// @param price   Sale price paid in USDm base units.
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    /// @notice Deploys the marketplace bound to an NFT contract and USDm token.
    /// @dev Both addresses must be non-zero.
    /// @param _nftContract Address of the ERC-721 NFT contract.
    /// @param _usdmToken   Address of the USDm ERC-20 token used for payments.
    constructor(address _nftContract, address _usdmToken) {
        require(_nftContract != address(0), "Invalid NFT address");
        require(_usdmToken != address(0), "Invalid USDm address");
        nftContract = IERC721(_nftContract);
        usdmToken = IERC20(_usdmToken);
    }

    /// @notice Lists a token for sale at a fixed USDm price.
    /// @dev The caller must own the token and have approved this marketplace
    ///      (per-token or per-operator). Reverts if price is zero, the caller is
    ///      not the owner, the marketplace is not approved, or the token is already listed.
    /// @param tokenId ID of the token to list.
    /// @param price   Sale price in USDm base units (must be > 0).
    function listNFT(uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(
            nftContract.getApproved(tokenId) == address(this) ||
                nftContract.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );
        require(!_isActive[tokenId], "Already listed");

        listings[tokenId] = Listing(msg.sender, price);
        _activeIndex[tokenId] = _activeTokenIds.length;
        _activeTokenIds.push(tokenId);
        _isActive[tokenId] = true;

        emit NFTListed(tokenId, msg.sender, price);
    }

    /// @notice Cancels an active listing created by the caller.
    /// @dev Reverts if the token is not listed or the caller is not the seller.
    /// @param tokenId ID of the token to delist.
    function cancelListing(uint256 tokenId) external {
        require(_isActive[tokenId], "Not listed");
        require(listings[tokenId].seller == msg.sender, "Not the seller");

        _removeListing(tokenId);
        emit NFTDelisted(tokenId, msg.sender);
    }

    /// @notice Buys a listed NFT, paying the seller in USDm and transferring the token.
    /// @dev Protected by `nonReentrant`. The caller must have approved this marketplace
    ///      to spend at least the listing price in USDm. Reverts if the token is not
    ///      listed, the buyer is the seller, or the USDm payment/transfer fails.
    /// @param tokenId ID of the token to purchase.
    function buyNFT(uint256 tokenId) external nonReentrant {
        require(_isActive[tokenId], "Not listed");
        Listing memory listing = listings[tokenId];
        require(listing.seller != msg.sender, "Cannot buy own NFT");
        require(
            usdmToken.allowance(msg.sender, address(this)) >= listing.price,
            "Insufficient USDm allowance"
        );

        _removeListing(tokenId);

        require(
            usdmToken.transferFrom(msg.sender, listing.seller, listing.price),
            "USDm payment failed"
        );

        nftContract.safeTransferFrom(listing.seller, msg.sender, tokenId);

        emit NFTSold(tokenId, listing.seller, msg.sender, listing.price);
    }

    function _removeListing(uint256 tokenId) private {
        uint256 index = _activeIndex[tokenId];
        uint256 lastTokenId = _activeTokenIds[_activeTokenIds.length - 1];

        _activeTokenIds[index] = lastTokenId;
        _activeIndex[lastTokenId] = index;
        _activeTokenIds.pop();

        delete listings[tokenId];
        delete _activeIndex[tokenId];
        _isActive[tokenId] = false;
    }

    function getListing(uint256 tokenId) external view returns (address seller, uint256 price) {
        Listing memory l = listings[tokenId];
        return (l.seller, l.price);
    }

    function isListed(uint256 tokenId) external view returns (bool) {
        return _isActive[tokenId];
    }

    function getActiveListingCount() external view returns (uint256) {
        return _activeTokenIds.length;
    }

    function getActiveListingAt(uint256 index)
        external
        view
        returns (uint256 tokenId, address seller, uint256 price)
    {
        require(index < _activeTokenIds.length, "Index out of bounds");
        tokenId = _activeTokenIds[index];
        Listing memory l = listings[tokenId];
        return (tokenId, l.seller, l.price);
    }
}
