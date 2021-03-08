/* eslint-disable jest/no-export */
import { app, swapPage, modalPage } from "../../common.js";

const swapHistoryAssertion = () => {
  describe(`When I access history tab`, () => {
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
};

export default swapHistoryAssertion;
