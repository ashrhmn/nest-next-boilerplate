import { CustomSwapPanelUI } from "@/client/components/CustomSwapPanelUi";
import useEthers from "@/client/hooks/useEthers";
import { SwapPanel, useSwapData } from "@ashrhmn/react-module";
import { useMutation, useQuery } from "@tanstack/react-query";

export const SwapPanelComponent = () => {
  const ethersData = useEthers();
  const swapData = useSwapData(ethersData, useQuery, useMutation);
  return (
    <div>
      <h2>
        Address: <span suppressHydrationWarning>{ethersData.account}</span>
      </h2>
      <button onClick={ethersData.openWalletModal}>Open Wallet</button>
      <SwapPanel swapData={swapData} />
      <SwapPanel panelRender={CustomSwapPanelUI} swapData={swapData} />
      <SwapPanel
        panelRender={({ swapData: { secondSelectedToken } }) => (
          <div>{secondSelectedToken?.address}</div>
        )}
        swapData={swapData}
      />
    </div>
  );
};
export default SwapPanelComponent;
