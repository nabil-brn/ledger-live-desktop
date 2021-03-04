/* eslint-disable jest/no-export */
import { app, swapPage, mockDeviceEvent } from "../../common.js";
import { fromTransactionRaw } from "@ledgerhq/live-common/lib/transaction";

const swap = () => {
  describe("When I reach the swap confirmation modal", () => {
    it("confirm summary step", async () => {
      // Open the modal
      const continueButton = await swapPage.continueButton();
      await continueButton.waitForEnabled();
      await continueButton.click();

      const summaryProviderCheckbox = await swapPage.summaryProviderCheckbox();
      await summaryProviderCheckbox.waitForDisplayed();
      await summaryProviderCheckbox.click();

      expect(await app.client.screenshot(1000)).toMatchImageSnapshot({
        customSnapshotIdentifier: "swap-summary-step",
      });
    });

    it("confirm swap on device and broadcast step", async () => {
      const summaryContinueButton = await swapPage.summaryContinueButton();
      await summaryContinueButton.waitForEnabled();
      await summaryContinueButton.click();

      await mockDeviceEvent({ type: "opened" }, { type: "complete" });
      // init-swap command (Extra pauses because otherwise the UI will not be visible)
      await mockDeviceEvent({ type: "opened" });
      await mockDeviceEvent({ type: "init-swap-requested" });
      await app.client.pause(2000);
      const confirmationStep = await swapPage.confirmationStep();
      await confirmationStep.waitForDisplayed();
      await app.client.pause(1000);
      await mockDeviceEvent(
        {
          type: "init-swap-result",
          initSwapResult: {
            transaction: fromTransactionRaw({
              family: "bitcoin",
              recipient: "1Cz2ZXb6Y6AacXJTpo4RBjQMLEmscuxD8e",
              amount: "1",
              feePerByte: "1",
              networkInfo: {
                family: "bitcoin",
                feeItems: {
                  items: [
                    { key: "0", speed: "high", feePerByte: "3" },
                    { key: "1", speed: "standard", feePerByte: "2" },
                    { key: "2", speed: "low", feePerByte: "1" },
                  ],
                  defaultFeePerByte: "1",
                },
              },
              rbf: false,
              utxoStrategy: {
                strategy: 0,
                pickUnconfirmedRBF: false,
                excludeUTXOs: [],
              },
            }),
            swapId: "12345",
          },
        },
        { type: "complete" },
      );

      // Silent signing, then automatic broadcasting triggered.
      await mockDeviceEvent({ type: "opened" }, { type: "complete" });
      await app.client.pause(5000); // Signing step takes time

      const finishedStep = await swapPage.finishedStep();
      await finishedStep.waitForDisplayed();
      await app.client.pause(1000);
      expect(await app.client.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: "swap-end-0",
      });
    });
  });
};

export default swap;
