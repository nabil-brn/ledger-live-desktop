import initialize from "../common.js";
import acceptTerms from "../flows/swap/acceptTerms";
import swap from "../flows/swap/swap";
import confirmSwap from "../flows/swap/confirmSwap";
import swapHistoryAssertion from "../flows/swap/swapHistoryAssertion";

describe("Test suite: Swap", () => {
  initialize("swap", { userData: "1AccountBTC1AccountETH" });
  acceptTerms();
  swap({
    fromCurrency: "bitcoin",
    fromAccount: "bitcoin 1",
    fromAmount: "0.2",
    toCurrency: "ethereum",
    toAccount: "ethereum 2",
    toAmount: "0.2",
  });
  confirmSwap();
  swapHistoryAssertion();
});
