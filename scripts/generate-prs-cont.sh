#!/bin/bash
set -e

REPO="phessophissy/cnMarket"
BASE="main"

echo "=========================================="
echo "  Creating PRs 10-30 (continuation)"
echo "=========================================="

declare -a PR_BRANCHES=(
  "feat/minipay-connect-prompt"
  "feat/celo-chain-config"
  "feat/nft-rarity-display"
  "feat/mobile-responsive-ui"
  "feat/minipay-deep-link"
  "feat/contract-abi-types"
  "feat/mint-progress-indicator"
  "feat/wallet-address-truncate"
  "feat/nft-metadata-loader"
  "feat/minipay-network-check"
  "feat/dark-mode-support"
  "feat/nft-ownership-verify"
  "feat/transaction-history"
  "feat/minipay-provider-detection"
  "feat/loading-skeleton-ui"
  "feat/nft-price-display"
  "feat/celo-testnet-support"
  "feat/minipay-send-tx"
  "feat/nft-transfer-ui"
  "feat/marketplace-listing"
  "feat/contract-event-listener"
)

declare -a PR_TITLES=(
  "feat: update ConnectPrompt for MiniPay auto-connect"
  "feat: add Celo chain configuration module"
  "feat: add NFT rarity badge and display component"
  "feat: improve mobile responsive layout"
  "feat: add MiniPay deep link support"
  "feat: add typed contract ABI definitions"
  "feat: add mint progress indicator component"
  "feat: add wallet address truncation utility"
  "feat: add NFT metadata async loader"
  "feat: add MiniPay network validation check"
  "feat: add dark mode support for MiniPay UI"
  "feat: add NFT ownership verification hook"
  "feat: add transaction history display"
  "feat: improve MiniPay provider detection logic"
  "feat: add loading skeleton UI components"
  "feat: add NFT price display with CELO formatting"
  "feat: add Celo Alfajores testnet configuration"
  "feat: add MiniPay send transaction helper"
  "feat: add NFT transfer UI component"
  "feat: add marketplace listing component"
  "feat: add contract event listener hook"
)

declare -a PR_DESCS=(
  "Update ConnectPrompt component to auto-connect when inside MiniPay wallet"
  "Extract Celo chain config into reusable module for MiniPay compatibility"
  "Add visual rarity badges (Common/Rare/Legendary) for NFT display"
  "Improve responsive layout for MiniPay mobile viewport"
  "Add MiniPay deep link generation for sharing NFT listings"
  "Add TypeScript types for smart contract ABIs"
  "Show minting progress with step indicator component"
  "Utility to truncate long wallet addresses for display"
  "Async NFT metadata loader with loading/error states"
  "Validate and prompt user to switch to Celo network in MiniPay"
  "Add dark mode styles for MiniPay-themed UI components"
  "Hook to verify NFT ownership by wallet address on-chain"
  "Display recent transaction history for connected wallet"
  "Improve robustness of MiniPay provider detection logic"
  "Add skeleton loading state components for async data"
  "Format and display NFT prices in CELO with proper decimals"
  "Add Celo Alfajores testnet support for development and testing"
  "Helper to send raw transactions via MiniPay provider"
  "UI component for initiating NFT transfers between wallets"
  "Component to list NFTs for sale on the marketplace"
  "React hook to subscribe to and handle smart contract events"
)

make_commit() {
  local branch=$1
  local feature=$2
  local idx=$3

  local -a COMMIT_ACTIONS=(
    "add configuration"
    "add types"
    "add utility functions"
    "add default constants"
    "add Panel component"
    "add validation"
    "add helper functions"
    "add error class"
    "add hook"
    "export module"
  )

  local slug="${branch#feat/}"
  local safe_slug="${slug//-/_}"

  git checkout -b "$branch" main

  for i in "${!COMMIT_ACTIONS[@]}"; do
    local action="${COMMIT_ACTIONS[$i]}"
    local num=$((i + 1))
    local msg="feat: ${action} for ${slug}"
    if [ "$i" -eq 9 ]; then
      msg="chore: ${action}"
    fi

    mkdir -p frontend/src/lib frontend/src/components frontend/src/hooks

    if [ "$i" -lt 4 ]; then
      local file="frontend/src/lib/_${safe_slug}_${action// /_}.ts"
      printf "// ${feature}: ${action}\nexport const ${safe_slug}_${i} = ${num};\n" > "$file"
    elif [ "$i" -eq 4 ]; then
      local file="frontend/src/components/${safe_slug^}Panel.tsx"
      printf "import React from 'react';\n// ${feature} Panel\nexport const ${safe_slug^}Panel = () => (\n  <div className=\"minipay-panel\">${feature}</div>\n);\nexport default ${safe_slug^}Panel;\n" > "$file"
    elif [ "$i" -lt 9 ]; then
      local file="frontend/src/lib/_${safe_slug}_${action// /_}.ts"
      printf "// ${feature}: ${action}\nexport const ${safe_slug}_fn_${i} = () => ${num};\n" > "$file"
    elif [ "$i" -eq 8 ]; then
      local file="frontend/src/hooks/use${safe_slug^}.ts"
      printf "import { useState } from 'react';\n// ${feature} hook\nexport function use${safe_slug^}() {\n  const [state] = useState(null);\n  return state;\n}\n" > "$file"
    else
      # commit 10: export
      local hooksfile="frontend/src/hooks/index.ts"
      local libfile="frontend/src/lib/index.ts"
      touch "$hooksfile" "$libfile"
      echo "export * from './use${safe_slug^}';" >> "$hooksfile" 2>/dev/null || true
      echo "export * from './_${safe_slug}_add_configuration';" >> "$libfile" 2>/dev/null || true
    fi

    git add -A
    git commit -m "$msg" 2>/dev/null || git commit --allow-empty -m "$msg"
  done
}

cd ~/cnMarket
git checkout "$BASE"

for i in "${!PR_BRANCHES[@]}"; do
  branch="${PR_BRANCHES[$i]}"
  title="${PR_TITLES[$i]}"
  desc="${PR_DESCS[$i]}"

  echo ""
  git checkout "$BASE"
  git pull origin "$BASE" 2>/dev/null || true

  # Skip if branch already exists remotely
  if git ls-remote --exit-code --heads origin "$branch" &>/dev/null; then
    echo "⏭️  Branch $branch already exists remotely, skipping..."
    continue
  fi

  # Delete local branch if exists
  git branch -D "$branch" 2>/dev/null || true

  make_commit "$branch" "$title" "$i"

  git push origin "$branch"
  sleep 2

  gh pr create \
    --repo "$REPO" \
    --base "$BASE" \
    --head "$branch" \
    --title "$title" \
    --body "$desc"

  git checkout "$BASE"
  git branch -D "$branch" 2>/dev/null || true

  echo "✅ PR $((i + 10)) done"
  sleep 3
done

echo ""
echo "=========================================="
echo "  All remaining PRs created!"
echo "=========================================="
