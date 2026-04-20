/**
 * Extract user-friendly error message from contract errors
 */
export function parseContractError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);

  if (msg.includes("Incorrect CELO amount")) return "Incorrect CELO amount sent.";
  if (msg.includes("user rejected")) return "Transaction rejected by user.";
  if (msg.includes("insufficient funds")) return "Insufficient CELO balance.";
  if (msg.includes("NFT not listed")) return "This NFT is not listed for sale.";
  if (msg.includes("Cannot buy your own")) return "You cannot buy your own NFT.";
  if (msg.includes("Not the owner")) return "You don't own this NFT.";
  if (msg.includes("Not approved")) return "NFT not approved for marketplace.";

  return msg.length > 100 ? msg.slice(0, 100) + "..." : msg;
}
