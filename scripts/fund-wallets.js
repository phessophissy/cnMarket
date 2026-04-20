const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ── Configuration ──────────────────────────────────────────
const FUNDER_ADDRESS = "0xfB9735dAd6ce2aE918900124Ac9FCB744DeDE7a2";
const RPC_URL = "https://forno.celo.org";
const WALLETS_FILE = path.join(__dirname, "..", "wallets.json");
const AMOUNT_PER_WALLET = "0.4"; // CELO per wallet
const BATCH_SIZE = 5; // concurrent txs per batch
const DELAY_MS = 1500; // delay between batches

// ── Helpers ────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  // Load funder private key from .env
  const funderKey = process.env.FUNDER_PRIVATE_KEY;
  if (!funderKey) {
    console.error("❌ Set FUNDER_PRIVATE_KEY in .env (key for", FUNDER_ADDRESS, ")");
    process.exit(1);
  }

  // Load wallets
  if (!fs.existsSync(WALLETS_FILE)) {
    console.error("❌ wallets.json not found. Run: node scripts/generate-wallets.js");
    process.exit(1);
  }
  const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, "utf-8"));
  console.log(`Loaded ${wallets.length} wallets from wallets.json`);

  // Connect funder
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const funder = new ethers.Wallet(funderKey, provider);

  // Verify funder address matches
  if (funder.address.toLowerCase() !== FUNDER_ADDRESS.toLowerCase()) {
    console.error(`❌ Key does not match funder address!`);
    console.error(`   Expected: ${FUNDER_ADDRESS}`);
    console.error(`   Got:      ${funder.address}`);
    process.exit(1);
  }

  // Check funder balance
  const balance = await provider.getBalance(funder.address);
  const totalNeeded = ethers.parseEther(AMOUNT_PER_WALLET) * BigInt(wallets.length);
  const balanceFormatted = ethers.formatEther(balance);
  const neededFormatted = ethers.formatEther(totalNeeded);

  console.log(`\nFunder:          ${funder.address}`);
  console.log(`Balance:         ${balanceFormatted} CELO`);
  console.log(`Amount/wallet:   ${AMOUNT_PER_WALLET} CELO`);
  console.log(`Total needed:    ${neededFormatted} CELO (+ gas)`);
  console.log(`Wallets to fund: ${wallets.length}\n`);

  if (balance < totalNeeded) {
    console.error(`❌ Insufficient balance. Need at least ${neededFormatted} CELO.`);
    process.exit(1);
  }

  // Get starting nonce
  let nonce = await provider.getTransactionCount(funder.address);
  const amountWei = ethers.parseEther(AMOUNT_PER_WALLET);

  let funded = 0;
  let failed = 0;
  const failedWallets = [];

  // Process in batches
  for (let i = 0; i < wallets.length; i += BATCH_SIZE) {
    const batch = wallets.slice(i, i + BATCH_SIZE);
    const promises = batch.map((w, j) => {
      const tx = {
        to: w.address,
        value: amountWei,
        nonce: nonce + j,
      };
      return funder
        .sendTransaction(tx)
        .then(async (txResp) => {
          await txResp.wait(1);
          funded++;
          console.log(`  ✅ [${funded}/${wallets.length}] ${w.address} — tx: ${txResp.hash}`);
        })
        .catch((err) => {
          failed++;
          failedWallets.push(w.address);
          console.error(`  ❌ [${w.index}] ${w.address} — ${err.message?.slice(0, 60)}`);
        });
    });

    nonce += batch.length;
    await Promise.all(promises);

    if (i + BATCH_SIZE < wallets.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n========================================`);
  console.log(`  Funding complete!`);
  console.log(`  ✅ Funded: ${funded}/${wallets.length}`);
  if (failed > 0) {
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`  Failed addresses:`);
    failedWallets.forEach((a) => console.log(`    - ${a}`));
  }
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
