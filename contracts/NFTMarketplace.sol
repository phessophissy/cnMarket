// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC721 public immutable nftContract;
    IERC20 public immutable usdmToken;

    mapping(uint256 => Listing) public listings;
    uint256[] private _activeTokenIds;
    mapping(uint256 => uint256) private _activeIndex;
    mapping(uint256 => bool) private _isActive;

    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTDelisted(uint256 indexed tokenId, address indexed seller);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor(address _nftContract, address _usdmToken) {
        require(_nftContract != address(0), "Invalid NFT address");
        require(_usdmToken != address(0), "Invalid USDm address");
        nftContract = IERC721(_nftContract);
        usdmToken = IERC20(_usdmToken);
    }

    /** @notice Contract update 38-5 */
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

    function cancelListing(uint256 tokenId) external {
        require(_isActive[tokenId], "Not listed");
        require(listings[tokenId].seller == msg.sender, "Not the seller");

        _removeListing(tokenId);
        emit NFTDelisted(tokenId, msg.sender);
    }

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
