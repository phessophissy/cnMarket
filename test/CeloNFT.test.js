const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloNFT", function () {
  let nft, owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const CeloNFT = await ethers.getContractFactory("CeloNFT");
    nft = await CeloNFT.deploy("ipfs://common", "ipfs://rare", "ipfs://legendary");
  });

  describe("Deployment", function () {
    it("should set correct name and symbol", async function () {
      expect(await nft.name()).to.equal("Celo NFT Marketplace");
      expect(await nft.symbol()).to.equal("CNFT");
    });

    it("should set correct mint prices", async function () {
      expect(await nft.mintPrices(0)).to.equal(ethers.parseEther("0.01"));
      expect(await nft.mintPrices(1)).to.equal(ethers.parseEther("0.03"));
      expect(await nft.mintPrices(2)).to.equal(ethers.parseEther("0.05"));
    });

    it("should set owner correctly", async function () {
      expect(await nft.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("should mint Common NFT with correct price", async function () {
      await nft.connect(user1).mint(0, { value: ethers.parseEther("0.01") });
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(0);
    });

    it("should mint Rare NFT with correct price", async function () {
      await nft.connect(user1).mint(1, { value: ethers.parseEther("0.03") });
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(1);
    });

    it("should mint Legendary NFT with correct price", async function () {
      await nft.connect(user1).mint(2, { value: ethers.parseEther("0.05") });
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(2);
    });

    it("should reject incorrect price", async function () {
      await expect(
        nft.connect(user1).mint(0, { value: ethers.parseEther("0.02") })
      ).to.be.revertedWith("Incorrect CELO amount");
    });

    it("should increment token IDs", async function () {
      await nft.connect(user1).mint(0, { value: ethers.parseEther("0.01") });
      await nft.connect(user2).mint(1, { value: ethers.parseEther("0.03") });
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.ownerOf(1)).to.equal(user2.address);
    });
  });

  describe("Token URI", function () {
    it("should return correct URI per rarity", async function () {
      await nft.connect(user1).mint(0, { value: ethers.parseEther("0.01") });
      await nft.connect(user1).mint(2, { value: ethers.parseEther("0.05") });
      expect(await nft.tokenURI(0)).to.equal("ipfs://common");
      expect(await nft.tokenURI(1)).to.equal("ipfs://legendary");
    });
  });

  describe("Owner Functions", function () {
    it("should allow owner to update URI", async function () {
      await nft.setRarityURI(0, "ipfs://newCommon");
      await nft.connect(user1).mint(0, { value: ethers.parseEther("0.01") });
      expect(await nft.tokenURI(0)).to.equal("ipfs://newCommon");
    });

    it("should allow owner to update price", async function () {
      await nft.setMintPrice(0, ethers.parseEther("0.02"));
      expect(await nft.mintPrices(0)).to.equal(ethers.parseEther("0.02"));
    });

    it("should allow owner to withdraw", async function () {
      await nft.connect(user1).mint(0, { value: ethers.parseEther("0.01") });
      const balBefore = await ethers.provider.getBalance(owner.address);
      await nft.withdraw();
      const balAfter = await ethers.provider.getBalance(owner.address);
      expect(balAfter).to.be.gt(balBefore);
    });

    it("should reject non-owner URI update", async function () {
      await expect(
        nft.connect(user1).setRarityURI(0, "hack")
      ).to.be.reverted;
    });
  });
});
