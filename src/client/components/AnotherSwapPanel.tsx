import { DefaultSwapPanelUI } from "@deepchain-labs/swap-ui";

const AnotherSwapPanel: typeof DefaultSwapPanelUI = ({
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
        placeholder={`${secondSelectedToken?.symbol || "Token0"} Amount`}
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
);

export default AnotherSwapPanel;
