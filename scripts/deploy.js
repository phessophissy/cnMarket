const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "CELO");

  // Metadata URIs — replace with your IPFS hashes after uploading metadata/
  const commonURI =
    process.env.COMMON_URI || "ipfs://QmCommonHash/metadata.json";
  const rareURI = process.env.RARE_URI || "ipfs://QmRareHash/metadata.json";
  const legendaryURI =
    process.env.LEGENDARY_URI || "ipfs://QmLegendaryHash/metadata.json";

  // Deploy NFT contract
  console.log("\nDeploying CeloNFT...");
  const CeloNFT = await hre.ethers.getContractFactory("CeloNFT");
  const nft = await CeloNFT.deploy(commonURI, rareURI, legendaryURI);
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("CeloNFT deployed to:", nftAddress);

  // Deploy Marketplace contract
  console.log("\nDeploying NFTMarketplace...");
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy(nftAddress);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("NFTMarketplace deployed to:", marketplaceAddress);

  // Summary
  console.log("\n========================================");
  console.log("Deployment complete!");
  console.log("========================================");
  console.log("CeloNFT:        ", nftAddress);
  console.log("NFTMarketplace: ", marketplaceAddress);
  console.log("\nAdd to frontend/.env.local:");
  console.log(`NEXT_PUBLIC_NFT_ADDRESS=${nftAddress}`);
  console.log(`NEXT_PUBLIC_MARKETPLACE_ADDRESS=${marketplaceAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
