const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const WALLET_COUNT = 100;
const OUTPUT_FILE = path.join(__dirname, "..", "wallets.json");

function main() {
  console.log(`Generating ${WALLET_COUNT} wallets...\n`);

  const wallets = [];

  for (let i = 0; i < WALLET_COUNT; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      index: i + 1,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(wallets, null, 2));
  console.log(`✅ ${WALLET_COUNT} wallets generated and saved to wallets.json`);
  console.log(`\nFirst 5 addresses:`);
  wallets.slice(0, 5).forEach((w) => {
    console.log(`  ${w.index}. ${w.address}`);
  });
  console.log(`  ...`);
  console.log(`\n⚠️  Keep wallets.json secret — it contains private keys!`);
}

main();
