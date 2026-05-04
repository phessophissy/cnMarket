import type { Connector } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
export function getConnectors() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";
  return [
    injected(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ];
}
export function getInjectedConnector(connectors: readonly Connector[]) {
  return connectors.find((connector) => connector.id === "injected");
}
export function getPreferredConnector(connectors: readonly Connector[]) {
  return (
    getInjectedConnector(connectors) ||
    connectors.find((connector) => connector.id === "walletConnect")
  );
}
export function getMiniPayConnector() {
  return injected();
}
