import acceptTerms from "../flows/swap/acceptTerms";
import swap from "../flows/swap/swap";
import confirmSwap from "../flows/swap/confirmSwap";
import initialize, { swapPage, modalPage, app } from "../common.js";

describe("Test suite: Swap", () => {
  initialize(
    "swap",
    {
      userData: "1AccountBTC1AccountETH",
    },
    { SPECTRON_RUN_DISABLE_COUNTDOWN_TIMERS: true },
  );

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

  it("should appear in the history", async () => {
    const finishedStep = await swapPage.finishedStep();
    await finishedStep.waitForDisplayed();
    await finishedStep.click();
    await finishedStep.waitForDisplayed({ reverse: true });

    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "swap-end-1",
    });
  });

  it("should show operation details modal", async () => {
    const firstRow = await swapPage.firstRow();
    await firstRow.waitForDisplayed();
    await firstRow.click();
    await modalPage.waitForDisplayed();

    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "swap-history-modal",
    });
  });
});
