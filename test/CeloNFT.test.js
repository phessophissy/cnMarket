const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloNFT", function () {
  let nft, usdm, owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const MockUSDm = await ethers.getContractFactory("MockUSDm");
    usdm = await MockUSDm.deploy();

    const CeloNFT = await ethers.getContractFactory("CeloNFT");
    nft = await CeloNFT.deploy("ipfs://common", "ipfs://rare", "ipfs://legendary", await usdm.getAddress());

    // Fund users with USDm
    await usdm.mint(user1.address, ethers.parseEther("10"));
    await usdm.mint(user2.address, ethers.parseEther("10"));
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

    it("should set USDm token address", async function () {
      expect(await nft.usdmToken()).to.equal(await usdm.getAddress());
    });
  });

  describe("Minting", function () {
    it("should mint Common NFT with correct USDm payment", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.01"));
      await nft.connect(user1).mint(0);
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(0);
    });

    it("should mint Rare NFT with correct USDm payment", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.03"));
      await nft.connect(user1).mint(1);
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(1);
    });

    it("should mint Legendary NFT with correct USDm payment", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.05"));
      await nft.connect(user1).mint(2);
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.tokenRarity(0)).to.equal(2);
    });

    it("should reject insufficient allowance", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.005"));
      await expect(nft.connect(user1).mint(0)).to.be.revertedWith("Insufficient USDm allowance");
    });

    it("should collect USDm in contract balance", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.01"));
      await nft.connect(user1).mint(0);
      expect(await usdm.balanceOf(await nft.getAddress())).to.equal(ethers.parseEther("0.01"));
    });

    it("should increment token IDs", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.01"));
      await nft.connect(user1).mint(0);
      await usdm.connect(user2).approve(await nft.getAddress(), ethers.parseEther("0.03"));
      await nft.connect(user2).mint(1);
      expect(await nft.ownerOf(0)).to.equal(user1.address);
      expect(await nft.ownerOf(1)).to.equal(user2.address);
    });
  });

  describe("Token URI", function () {
    it("should return correct URI per rarity", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.06"));
      await nft.connect(user1).mint(0);
      await nft.connect(user1).mint(2);
      expect(await nft.tokenURI(0)).to.equal("ipfs://common");
      expect(await nft.tokenURI(1)).to.equal("ipfs://legendary");
    });
  });

  describe("Owner Functions", function () {
    it("should allow owner to update URI", async function () {
      await nft.setRarityURI(0, "ipfs://newCommon");
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.01"));
      await nft.connect(user1).mint(0);
      expect(await nft.tokenURI(0)).to.equal("ipfs://newCommon");
    });

    it("should allow owner to update price", async function () {
      await nft.setMintPrice(0, ethers.parseEther("0.02"));
      expect(await nft.mintPrices(0)).to.equal(ethers.parseEther("0.02"));
    });

    it("should allow owner to update USDm token", async function () {
      const MockUSDm = await ethers.getContractFactory("MockUSDm");
      const newUsdm = await MockUSDm.deploy();
      await nft.setUsdmToken(await newUsdm.getAddress());
      expect(await nft.usdmToken()).to.equal(await newUsdm.getAddress());
    });

    it("should allow owner to withdraw USDm", async function () {
      await usdm.connect(user1).approve(await nft.getAddress(), ethers.parseEther("0.01"));
      await nft.connect(user1).mint(0);
      const balBefore = await usdm.balanceOf(owner.address);
      await nft.withdrawUSDm();
      const balAfter = await usdm.balanceOf(owner.address);
      expect(balAfter).to.be.gt(balBefore);
    });

    it("should reject non-owner URI update", async function () {
      await expect(
        nft.connect(user1).setRarityURI(0, "hack")
      ).to.be.reverted;
    });
  });
});
