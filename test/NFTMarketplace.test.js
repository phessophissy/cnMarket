const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  let nft, marketplace, owner, seller, buyer;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const CeloNFT = await ethers.getContractFactory("CeloNFT");
    nft = await CeloNFT.deploy("ipfs://c", "ipfs://r", "ipfs://l");

    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
    marketplace = await Marketplace.deploy(await nft.getAddress());

    // Mint an NFT to seller
    await nft.connect(seller).mint(0, { value: ethers.parseEther("0.01") });
    // Approve marketplace
    await nft.connect(seller).approve(await marketplace.getAddress(), 0);
  });

  describe("Listing", function () {
    it("should list NFT for sale", async function () {
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      const listing = await marketplace.getListing(0);
      expect(listing[0]).to.equal(seller.address);
      expect(listing[1]).to.equal(ethers.parseEther("1"));
    });

    it("should reject listing by non-owner", async function () {
      await expect(
        marketplace.connect(buyer).listNFT(0, ethers.parseEther("1"))
      ).to.be.reverted;
    });

    it("should reject zero price", async function () {
      await expect(
        marketplace.connect(seller).listNFT(0, 0)
      ).to.be.reverted;
    });
  });

  describe("Buying", function () {
    beforeEach(async function () {
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
    });

    it("should transfer NFT on purchase", async function () {
      await marketplace.connect(buyer).buyNFT(0, { value: ethers.parseEther("1") });
      expect(await nft.ownerOf(0)).to.equal(buyer.address);
    });

    it("should reject wrong price", async function () {
      await expect(
        marketplace.connect(buyer).buyNFT(0, { value: ethers.parseEther("0.5") })
      ).to.be.reverted;
    });
  });

  describe("Cancel Listing", function () {
    it("should cancel listing by seller", async function () {
      await marketplace.connect(seller).listNFT(0, ethers.parseEther("1"));
      await marketplace.connect(seller).cancelListing(0);
      expect(await marketplace.isListed(0)).to.equal(false);
    });
  });
});
