import { getEthersSigner } from "@/client/lib/getSigner";
import { wagmi, web3ModalReact } from "@/client/lib/wagmi";
import { JsonRpcSigner } from "@ethersproject/providers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";

const { useAccount, useChainId, useConfig, useSwitchNetwork } = wagmi;
const { useWeb3Modal } = web3ModalReact;

const useEthers = (): {
  signer: JsonRpcSigner | null;
  account?: string;
  setFallbackChainId: (chainId: number) => void;
  chainId: number;
  openWalletModal: () => void;
  switchNetwork: ((chainId_?: number | undefined) => void) | undefined;
} => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { open: openWalletModal } = useWeb3Modal();
  const { switchNetwork } = useSwitchNetwork();
  const { publicClient } = useConfig();
  const chainId = useChainId();
  const { data: signer } = useQuery({
    queryKey: ["signer", chainId, address],
    enabled: !!chainId,
    keepPreviousData: false,
    initialData: null,
    queryFn: () => getEthersSigner({ chainId }),
  });

  const fallbackChainId =
    typeof router.query.fallback_chain_id === "string" &&
    publicClient.chains
      ?.map((c) => c.id)
      .includes(+router.query.fallback_chain_id as any)
      ? +router.query.fallback_chain_id
      : 137;

  const setFallbackChainId = useCallback(
    (chainId: number) => {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            fallback_chain_id: chainId,
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return {
    account: address,
    chainId: isConnected ? chainId || 137 : fallbackChainId || 137,
    signer,
    setFallbackChainId,
    openWalletModal,
    switchNetwork,
  };
};

export default useEthers;
