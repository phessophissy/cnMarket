import { celo } from "wagmi/chains";
export const supportedChains = [celo] as const;
export const defaultChain = celo;
export const chainConfig = {
  [celo.id]: {
    name: "Celo", rpcUrl: "https://forno.celo.org",
    explorer: "https://celoscan.io",
    nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  },
} as const;
