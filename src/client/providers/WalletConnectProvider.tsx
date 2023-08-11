import { ReactNode } from "react";

import {
  wagmi,
  wagmiChains,
  web3ModalEthereum,
  web3ModalReact,
} from "@/client/lib/wagmi";

const { w3mConnectors, w3mProvider } = web3ModalEthereum;
const { WagmiConfig, configureChains, createConfig } = wagmi;

const projectId = "a5f50d04a3c77b08ca37ca38d4a81ff2";

const { goerli, polygon } = wagmiChains;
const { Web3Modal } = web3ModalReact;

const chains = [polygon, goerli];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new web3ModalEthereum.EthereumClient(
  wagmiConfig,
  chains,
);

const WalletConnectProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default WalletConnectProvider;
