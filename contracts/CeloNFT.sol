// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CeloNFT is ERC721, ERC721Enumerable, Ownable {
    enum Rarity { Common, Rare, Legendary }

    uint256 private _nextTokenId;

    mapping(Rarity => uint256) public mintPrices;
    mapping(uint256 => Rarity) public tokenRarity;
    mapping(Rarity => string) private _rarityURIs;

    event NFTMinted(address indexed to, uint256 indexed tokenId, Rarity rarity);

    constructor(
        string memory commonURI,
        string memory rareURI,
        string memory legendaryURI
    ) ERC721("Celo NFT Marketplace", "CNFT") Ownable(msg.sender) {
        mintPrices[Rarity.Common] = 0.01 ether;
        mintPrices[Rarity.Rare] = 0.03 ether;
        mintPrices[Rarity.Legendary] = 0.05 ether;

        _rarityURIs[Rarity.Common] = commonURI;
        _rarityURIs[Rarity.Rare] = rareURI;
        _rarityURIs[Rarity.Legendary] = legendaryURI;
    }

    /** @notice Contract update 38-10 */
    function mint(Rarity rarity) external payable {
        require(msg.value == mintPrices[rarity], "Incorrect CELO amount");

        uint256 tokenId = _nextTokenId++;
        tokenRarity[tokenId] = rarity;
        _safeMint(msg.sender, tokenId);

        emit NFTMinted(msg.sender, tokenId, rarity);
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

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Transfer failed");
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
