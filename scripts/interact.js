const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ── Configuration ──────────────────────────────────────────
const RPC_URL = "https://forno.celo.org";
const CELO_NFT_ADDRESS = "0xA285c0f2cb1Bf72b94Fc71Bf3dC85C7A2da6480a";
const WALLETS_FILE = path.join(__dirname, "..", "wallets.json");
const BATCH_SIZE = 5;
const DELAY_MS = 2000;

// Rarity enum: 0 = Common, 1 = Rare, 2 = Legendary
const MINT_PLAN = [
  { start: 0, end: 49, rarity: 0, label: "Common", price: "0.01" },
  { start: 50, end: 89, rarity: 1, label: "Rare", price: "0.03" },
  { start: 90, end: 99, rarity: 2, label: "Legendary", price: "0.05" },
];

const CELO_NFT_ABI = [
  "function mint(uint8 rarity) external payable",
  "event NFTMinted(address indexed to, uint256 indexed tokenId, uint8 rarity)",
];

// ── Helpers ────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPlanForIndex(index) {
  for (const plan of MINT_PLAN) {
    if (index >= plan.start && index <= plan.end) return plan;
  }
  return null;
}

// ── Main ───────────────────────────────────────────────────
async function main() {
  const wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, "utf-8"));
  console.log(`Loaded ${wallets.length} wallets from wallets.json\n`);

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  console.log("Mint Plan:");
  console.log("  Wallets  1-50  → Common    (0.01 CELO each)");
  console.log("  Wallets 51-90  → Rare      (0.03 CELO each)");
  console.log("  Wallets 91-100 → Legendary (0.05 CELO each)");
  console.log(`  Total mints: ${wallets.length}`);
  console.log("========================================\n");

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < wallets.length; i += BATCH_SIZE) {
    const batch = wallets.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (w) => {
      const plan = getPlanForIndex(w.index - 1); // wallets.json index is 1-based
      if (!plan) {
        console.log(`  ⚠️  [${w.index}/100] No plan for index ${w.index}, skipping`);
        return;
      }

      try {
        const wallet = new ethers.Wallet(w.privateKey, provider);
        const contract = new ethers.Contract(CELO_NFT_ADDRESS, CELO_NFT_ABI, wallet);
        const value = ethers.parseEther(plan.price);

        const tx = await contract.mint(plan.rarity, { value });
        const receipt = await tx.wait();

        console.log(
          `  ✅ [${w.index}/100] ${w.address} → ${plan.label} — tx: ${receipt.hash}`
        );
        success++;
      } catch (err) {
        const reason = err.shortMessage || err.message || String(err);
        console.log(`  ❌ [${w.index}/100] ${w.address} → ${plan.label} — ${reason}`);
        failed++;
        failures.push({ index: w.index, address: w.address, rarity: plan.label, error: reason });
      }
    });

    await Promise.all(promises);

    if (i + BATCH_SIZE < wallets.length) {
      await sleep(DELAY_MS);
    }
  }

  console.log("\n========================================");
  console.log(`  Minting complete!`);
  console.log(`  ✅ Success: ${success}/100`);
  if (failed > 0) {
    console.log(`  ❌ Failed:  ${failed}/100`);
    console.log("\n  Failed wallets:");
    for (const f of failures) {
      console.log(`    [${f.index}] ${f.address} (${f.rarity}): ${f.error}`);
    }
  }
  console.log("========================================");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
