import { http, createConfig } from "wagmi";
import { celo } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

export const config = createConfig({
  chains: [celo],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [celo.id]: http("https://forno.celo.org"),
  },
  ssr: true,
});
