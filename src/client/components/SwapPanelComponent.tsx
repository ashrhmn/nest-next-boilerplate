// import { CustomSwapPanelUI } from "@/client/components/CustomSwapPanelUi";
import { CustomSwapPanelUI } from "@/client/components/CustomSwapPanelUi";
import useEthers from "@/client/hooks/useEthers";
import { SwapPanel, useSwapData } from "@deepchain-labs/swap-ui";
import { useMutation, useQuery } from "@tanstack/react-query";

export const SwapPanelComponent = () => {
  const ethersData = useEthers();
  const swapData = useSwapData(ethersData, useQuery, useMutation);
  return (
    <div>
      <h2>
        Address: <span suppressHydrationWarning>{ethersData.account}</span>
      </h2>
      <button
        className="bg-emerald-700 text-white p-1 rounded m-1"
        onClick={ethersData.openWalletModal}
      >
        Open Wallet
      </button>
      <SwapPanel swapData={swapData} />
      <SwapPanel panelRender={CustomSwapPanelUI} swapData={swapData} />
      {/* <SwapPanel panelRender={AnotherSwapPanel} swapData={swapData} /> */}
      {/* <SwapPanel
        panelRender={({
          swapData: {
            firstSelectedToken,
            firstTokenData,
            secondTokenData,
            secondSelectedToken,
            handleSwitchSides,
            primaryButtonText,
            isPrimaryButtonDisabled,
            handlePrimaryClick,
            firstTokenBalanceText,
            secondTokenBalanceText,
          },
        }) => (
          <div className="">
            <div>
              <h1 className="flex gap-2">
                <span>From Token : </span>
                <span onClick={() => firstTokenData.setModalOpen(true)}>
                  {firstSelectedToken?.symbol || "Select"}
                </span>
                <span>{firstTokenBalanceText}</span>
              </h1>
              <input
                type="text"
                placeholder={`${firstSelectedToken?.symbol || "Token0"} Amount`}
                value={firstTokenData.amountInput}
                onChange={(e) => firstTokenData.setAmountInput(e.target.value)}
              />
            </div>
            <div>
              <h1 className="flex gap-2">
                <span>To Token : </span>
                <span onClick={() => secondTokenData.setModalOpen(true)}>
                  {secondSelectedToken?.symbol || "Select"}
                </span>
                <span>{secondTokenBalanceText}</span>
              </h1>
              <input
                type="text"
                placeholder={`${
                  secondSelectedToken?.symbol || "Token0"
                } Amount`}
                value={secondTokenData.amountInput}
                onChange={(e) => secondTokenData.setAmountInput(e.target.value)}
              />
            </div>
            <button onClick={handleSwitchSides}>Switch</button>
            <div>
              <button
                suppressHydrationWarning
                onClick={handlePrimaryClick}
                disabled={isPrimaryButtonDisabled}
              >
                {primaryButtonText}
              </button>
            </div>
          </div>
        )}
        swapData={swapData}
        key={1}
      /> */}
    </div>
  );
};
export default SwapPanelComponent;
