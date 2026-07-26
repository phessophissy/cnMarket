const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests focused on the marketplace's active-listing enumeration logic:
// getActiveListingCount, isListed, getActiveListingAt, and the swap-and-pop
// integrity maintained by _removeListing.
describe("Marketplace enumeration", function () {
  let nft, marketplace, usdm, owner, seller, buyer;

  // Helper: mint a fresh token to `seller` and approve the marketplace.
  async function mintAndApprove(tokenId) {
    const CeloNFT = await ethers.getContractFactory("CeloNFT");
    // Mint a Common (rarity 0) NFT: price 0.01 ether.
    await usdm.mint(seller.address, ethers.parseEther("0.01"));
    await usdm
      .connect(seller)
      .approve(await nft.getAddress(), ethers.parseEther("0.01"));
    await nft.connect(seller).mint(0);
    await nft.connect(seller).approve(await marketplace.getAddress(), tokenId);
    return tokenId;
  }

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const MockUSDm = await ethers.getContractFactory("MockUSDm");
    usdm = await MockUSDm.deploy();

    const CeloNFT = await ethers.getContractFactory("CeloNFT");
    nft = await CeloNFT.deploy(
      "ipfs://c",
      "ipfs://r",
      "ipfs://l",
      await usdm.getAddress()
    );

    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
    marketplace = await Marketplace.deploy(
      await nft.getAddress(),
      await usdm.getAddress()
    );
  });

  describe("getActiveListingCount & isListed", function () {
    it("reports zero active listings before anything is listed", async function () {
      expect(await marketplace.getActiveListingCount()).to.equal(0);
      expect(await marketplace.isListed(0)).to.equal(false);
    });

    it("increments the count and marks the token as listed", async function () {
      await mintAndApprove(0);
      await marketplace
        .connect(seller)
        .listNFT(0, ethers.parseEther("1"));

      expect(await marketplace.getActiveListingCount()).to.equal(1);
      expect(await marketplace.isListed(0)).to.equal(true);
    });

    it("tracks multiple active listings independently", async function () {
      // Token 0
      await mintAndApprove(0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      // Token 1
      await mintAndApprove(1);
      await marketplace.connect(seller).listNFT(1, ethers.parseEther("2"));

      expect(await marketplace.getActiveListingCount()).to.equal(2);
      expect(await marketplace.isListed(0)).to.equal(true);
      expect(await marketplace.isListed(1)).to.equal(true);
    });
  });
});
