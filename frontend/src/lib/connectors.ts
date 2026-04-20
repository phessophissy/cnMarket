import { injected, walletConnect } from "wagmi/connectors";
export function getConnectors() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";
  return [
    injected({ target: "metaMask" }),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ];
}
export function getMiniPayConnector() {
  return injected({ target: "metaMask" });
}
