export const RPC_URLS = {
  celo: ["https://forno.celo.org", "https://rpc.ankr.com/celo"],
} as const;
export function getCeloRpcUrl(): string {
  return RPC_URLS.celo[0];
}
