const hre = require("hardhat");

async function main() {
  const nftAddress = process.env.NFT_ADDRESS;
  const marketplaceAddress = process.env.MARKETPLACE_ADDRESS;

  if (!nftAddress || !marketplaceAddress) {
    console.error("Please set NFT_ADDRESS and MARKETPLACE_ADDRESS env vars");
    process.exit(1);
  }

  const commonURI = process.env.COMMON_URI || "ipfs://QmCommonHash/metadata.json";
  const rareURI = process.env.RARE_URI || "ipfs://QmRareHash/metadata.json";
  const legendaryURI = process.env.LEGENDARY_URI || "ipfs://QmLegendaryHash/metadata.json";

  console.log("Verifying CeloNFT...");
  await hre.run("verify:verify", {
    address: nftAddress,
    constructorArguments: [commonURI, rareURI, legendaryURI],
    contract: "contracts/CeloNFT.sol:CeloNFT",
  });

  console.log("Verifying NFTMarketplace...");
  await hre.run("verify:verify", {
    address: marketplaceAddress,
    constructorArguments: [nftAddress],
    contract: "contracts/NFTMarketplace.sol:NFTMarketplace",
  });

  console.log("Verification complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
