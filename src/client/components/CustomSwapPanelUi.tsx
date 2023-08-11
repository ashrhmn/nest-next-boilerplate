import { DefaultSwapPanelUI, clx } from "@ashrhmn/react-module";
import { LoaderIcon } from "react-hot-toast";

export const CustomSwapPanelUI: typeof DefaultSwapPanelUI = ({
  swapData: {
    exactInputQuoteFetching,
    exactOutputQuoteFetching,
    firstSelectedToken,
    firstTokenBalanceText,
    firstTokenData,
    handlePrimaryClick,
    handleSwitchSides,
    invalidFirstTokenInput,
    invalidSecondTokenInput,
    isPrimaryButtonDisabled,
    primaryButtonText,
    secondSelectedToken,
    secondTokenBalanceText,
    secondTokenData,
    setFirstAmountInput,
    setLastTouchedInput,
    setSecondAmountInput,
    singleUnitPriceText,
  },
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div
          className={`t-p-2 relative bg-blue-700`}
          style={{
            boxSizing: "border-box",
            width: "450px",
            height: "375px",
            background: `linear-gradient(141.93deg,
                rgba(155, 164, 240, 0.25) 6.98%,
                rgba(173, 181, 251, 0) 91.14%),
            filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.05))`,
            borderRadius: "19px",
            border: "1px solid #ffffff2c",
          }}
        >
          <div className="bg-[#5044749a] rounded-[19px] w-full h-[150px] mt-1 px-4 py-5 relative">
            {exactOutputQuoteFetching && (
              <LoaderIcon className="absolute right-2 top-2" />
            )}
            <div className="flex justify-between items-stretch">
              <div className="">
                <input
                  onFocus={() => setLastTouchedInput("first")}
                  value={firstTokenData.amountInput}
                  onChange={(e) =>
                    firstTokenData.setAmountInput(e.target.value)
                  }
                  type="text"
                  className={clx(
                    "text-[30px] text-[#E2EBFB] font-[600] leading-6 w-[150px] lg:w-[180px] bg-transparent focus:outline-none",
                    invalidFirstTokenInput && "text-[#b51919]",
                  )}
                />
              </div>
              <div className="flex flex-col justify-between">
                <div
                  onClick={() => firstTokenData.setModalOpen(true)}
                  className="w-[160px] py-1.5 border border-[#ffffff] rounded-full bg-[#00000064] flex justify-between cursor-pointer"
                >
                  <div className="flex gap-2 ml-1 items-center">
                    <img
                      className="inline mx-2 opacity-[0.7] w-5 h-5"
                      src={firstSelectedToken?.logo_url}
                      alt={firstSelectedToken?.name}
                    />
                    <span className="text-[#ffffff] text-[16px] w-full">
                      {firstSelectedToken?.symbol || "Select"}
                    </span>
                  </div>
                  <svg
                    className="my-auto mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9b9b9b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-[13px] font-[400] text-center flex justify-end mt-8">
              <span className="text-[#e2ebfb67] whitespace-nowrap">
                Balance: {firstTokenBalanceText}
              </span>
              <span
                onClick={() => {
                  setFirstAmountInput(
                    firstTokenData.selectedTokenBalance?.formattedBalance || "",
                  );
                  setLastTouchedInput("first");
                }}
                className="text-[#eaf553] cursor-pointer"
              >
                &nbsp;MAX
              </span>
            </p>
          </div>
          <div className="bg-[#5044749a] rounded-[19px] w-full h-[150px] mt-1 px-4 py-5 relative">
            {exactInputQuoteFetching && (
              <LoaderIcon className="absolute right-2 top-2" />
            )}
            <div className="flex justify-between items-stretch">
              <div className="">
                <input
                  onFocus={() => setLastTouchedInput("second")}
                  value={secondTokenData.amountInput}
                  onChange={(e) =>
                    secondTokenData.setAmountInput(e.target.value)
                  }
                  type="text"
                  className={clx(
                    "text-[30px] text-[#E2EBFB] font-[600] leading-6 w-[150px] lg:w-[180px] bg-transparent focus:outline-none",
                    invalidSecondTokenInput && "text-[#b51919]",
                  )}
                />
              </div>
              <div className="flex flex-col justify-between">
                <div
                  onClick={() => secondTokenData.setModalOpen(true)}
                  className="w-[160px] py-1.5 border border-[#ffffff] rounded-full bg-[#00000064] flex justify-between cursor-pointer"
                >
                  <div className="flex gap-2 ml-1 items-center">
                    <img
                      className="inline mx-2 opacity-[0.7] w-5 h-5"
                      src={secondSelectedToken?.logo_url}
                      alt={secondSelectedToken?.name}
                    />
                    <span className="text-[#ffffff] text-[16px] w-full">
                      {secondSelectedToken?.symbol || "Select"}
                    </span>
                  </div>
                  <svg
                    className="my-auto mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9b9b9b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-[13px] font-[400] text-center flex justify-end mt-8">
              <span className="text-[#e2ebfb67] whitespace-nowrap">
                Balance: {secondTokenBalanceText}
              </span>
              <span
                onClick={() => {
                  setSecondAmountInput(
                    secondTokenData.selectedTokenBalance?.formattedBalance ||
                      "",
                  );
                  setLastTouchedInput("second");
                }}
                className="text-[#eaf553] cursor-pointer"
              >
                &nbsp;MAX
              </span>
            </p>
          </div>
          <div
            onClick={handleSwitchSides}
            className="absolute top-[140px] left-[170px] lg:left-[200px] h-[40px] w-[40px] rounded-[9px] bg-[#eecb1c] cursor-pointer"
          >
            <svg
              className="m-auto mt-1.5"
              width="19"
              height="26"
              viewBox="0 0 19 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.51616 0.783569C8.74028 0.783569 8.11058 1.41327 8.11058 2.18914V20.5604L2.68046 15.1303C2.13088 14.5807 1.24106 14.5807 0.692888 15.1303L0.572097 15.2511C0.0225173 15.8007 0.0225173 16.6905 0.572097 17.2387L8.52237 25.1889C9.07195 25.7385 9.96177 25.7385 10.5099 25.1889L18.4602 17.2387C19.0098 16.6891 19.0098 15.7993 18.4602 15.2511L18.3394 15.1303C17.7898 14.5807 16.9 14.5807 16.3519 15.1303L10.9217 20.5604V2.18914C10.9217 1.41327 10.292 0.783569 9.51616 0.783569Z"
                fill="#3E3E3E"
              />
            </svg>
          </div>
          <button
            suppressHydrationWarning
            onClick={handlePrimaryClick}
            className="bg-[#a7e53d] w-full h-[50px] rounded-[18px] mt-1 flex justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-[#eecb1c]/40"
            disabled={isPrimaryButtonDisabled}
          >
            <span
              suppressHydrationWarning
              className="text-[17px] text-[#000000] font-[700] my-auto"
            >
              {primaryButtonText}
            </span>
          </button>
        </div>
      </div>
      {!!singleUnitPriceText && (
        <p className="text-center text-[#468aff] text-[16px] font-[700]">
          {singleUnitPriceText}
        </p>
      )}
    </>
  );
};
