// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloNFT is ERC721, ERC721Enumerable, Ownable {
    enum Rarity { Common, Rare, Legendary }

    uint256 private _nextTokenId;

    IERC20 public usdmToken;

    mapping(Rarity => uint256) public mintPrices;
    mapping(uint256 => Rarity) public tokenRarity;
    mapping(Rarity => string) private _rarityURIs;

    event NFTMinted(address indexed to, uint256 indexed tokenId, Rarity rarity);

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

    function setUsdmToken(address usdmToken_) external onlyOwner {
        require(usdmToken_ != address(0), "Invalid USDm address");
        usdmToken = IERC20(usdmToken_);
    }

    function withdrawUSDm() external onlyOwner {
        uint256 bal = usdmToken.balanceOf(address(this));
        require(bal > 0, "Nothing to withdraw");
        require(usdmToken.transfer(owner(), bal), "Transfer failed");
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _rarityURIs[tokenRarity[tokenId]];
    }

    function setRarityURI(Rarity rarity, string calldata uri) external onlyOwner {
        _rarityURIs[rarity] = uri;
    }

    function setMintPrice(Rarity rarity, uint256 price) external onlyOwner {
        mintPrices[rarity] = price;
    }



    // Required overrides for ERC721Enumerable
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
