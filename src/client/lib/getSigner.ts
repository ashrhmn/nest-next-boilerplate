import { wagmiCore } from "@/client/lib/wagmi";
import { providers } from "ethers";

const { getWalletClient } = wagmiCore;
export function walletClientToSigner(walletClient: wagmiCore.WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId });
  // if (!walletClient) return null;
  if (!walletClient) throw new Error("No wallet client found");
  return walletClientToSigner(walletClient);
}
