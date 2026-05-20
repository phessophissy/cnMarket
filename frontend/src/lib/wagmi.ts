import { http, createConfig } from "wagmi";
import { celo } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { fallback } from "viem";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

export const config = createConfig({
  chains: [celo],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [celo.id]: fallback([
      http("https://forno.celo.org"),
      http("https://rpc.ankr.com/celo"),
      http("https://1rpc.io/celo"),
    ]),
  },
  ssr: true,
});
