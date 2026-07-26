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

  describe("getActiveListingAt", function () {
    it("returns the token id, seller, and price for an active listing", async function () {
      await mintAndApprove(0);
      await marketplace
        .connect(seller)
        .listNFT(0, ethers.parseEther("1.5"));

      const [tokenId, sellerAddr, price] =
        await marketplace.getActiveListingAt(0);

      expect(tokenId).to.equal(0);
      expect(sellerAddr).to.equal(seller.address);
      expect(price).to.equal(ethers.parseEther("1.5"));
    });

    it("reflects the insertion order for multiple listings", async function () {
      await mintAndApprove(0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      await mintAndApprove(1);
      await marketplace.connect(seller).listNFT(1, ethers.parseEther("2"));

      const [tokenId0] = await marketplace.getActiveListingAt(0);
      const [tokenId1] = await marketplace.getActiveListingAt(1);

      expect(tokenId0).to.equal(0);
      expect(tokenId1).to.equal(1);
    });

    it("reverts when the index is out of bounds", async function () {
      await mintAndApprove(0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));

      await expect(marketplace.getActiveListingAt(1)).to.be.revertedWith(
        "Index out of bounds"
      );
    });
  });

  describe("swap-and-pop integrity on delist/relist", function () {
    it("maintains a valid array when a middle listing is cancelled", async function () {
      // List three tokens: 0, 1, 2 (in that order).
      await mintAndApprove(0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      await mintAndApprove(1);
      await marketplace.connect(seller).listNFT(1, ethers.parseEther("2"));
      await mintAndApprove(2);
      await marketplace.connect(seller).listNFT(2, ethers.parseEther("3"));

      // Cancel the middle one (token 1). After swap-and-pop the last element
      // (token 2) should move into slot 1.
      await marketplace.connect(seller).cancelListing(1);

      expect(await marketplace.getActiveListingCount()).to.equal(2);
      expect(await marketplace.isListed(1)).to.equal(false);
      expect(await marketplace.isListed(2)).to.equal(true);

      // Slot 0 should still hold token 0.
      const [tokenId0] = await marketplace.getActiveListingAt(0);
      expect(tokenId0).to.equal(0);
      // Slot 1 should now hold the swapped token 2.
      const [tokenId1] = await marketplace.getActiveListingAt(1);
      expect(tokenId1).to.equal(2);
    });

    it("allows relisting a previously cancelled token and restores the count", async function () {
      await mintAndApprove(0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      await marketplace.connect(seller).cancelListing(0);

      expect(await marketplace.getActiveListingCount()).to.equal(0);
      expect(await marketplace.isListed(0)).to.equal(false);

      // Re-approve (cancel does not clear approvals) and relist.
      await nft.connect(seller).approve(await marketplace.getAddress(), 0);
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("5"));

      expect(await marketplace.getActiveListingCount()).to.equal(1);
      expect(await marketplace.isListed(0)).to.equal(true);

      const [, , price] = await marketplace.getActiveListingAt(0);
      expect(price).to.equal(ethers.parseEther("5"));
    });
  });
});
