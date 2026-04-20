// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC721 public immutable nftContract;

    mapping(uint256 => Listing) public listings;
    uint256[] private _activeTokenIds;
    mapping(uint256 => uint256) private _activeIndex;
    mapping(uint256 => bool) private _isActive;

    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTDelisted(uint256 indexed tokenId, address indexed seller);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor(address _nftContract) {
        require(_nftContract != address(0), "Invalid NFT address");
        nftContract = IERC721(_nftContract);
    }

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

    function buyNFT(uint256 tokenId) external payable nonReentrant {
        require(_isActive[tokenId], "Not listed");
        Listing memory listing = listings[tokenId];
        require(msg.value == listing.price, "Incorrect price");
        require(listing.seller != msg.sender, "Cannot buy own NFT");

        _removeListing(tokenId);

        nftContract.safeTransferFrom(listing.seller, msg.sender, tokenId);

        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Payment failed");

        emit NFTSold(tokenId, listing.seller, msg.sender, msg.value);
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
