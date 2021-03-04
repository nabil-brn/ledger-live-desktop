/* eslint-disable jest/no-export */
import { app, swapPage } from "../../common.js";

const swap = o => {
  describe("When I reach the swap form", () => {
    it("should display an empty form", async () => {
      const form = await swapPage.form();
      await form.waitForDisplayed();

      expect(await app.client.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: "swap-empty-form",
      });
    });

    describe("when I choose a crypto asset source", () => {
      it("should autofill the source account", async () => {
        const fromCurrencyInput = await swapPage.fromCurrency();
        await fromCurrencyInput.setValue(o.fromCurrency);
        await app.client.keys(["Enter"]);
        expect(await fromCurrencyInput.getValue()).toBeDefined();
      });
    });

    describe("when I fill the amount field", () => {
      it("should display the countervalue", async () => {
        const fromAmount = await swapPage.fromAmount();
        await fromAmount.setValue([o.fromAmount, "Tab"]);
        const countervalue = await swapPage.countervalue();
        expect(await countervalue.isDisplayed()).toBe(true);
      });
    });

    describe("when I choose the destination crypto asset", () => {
      it("should autofill the destination account", async () => {
        const toCurrencyInput = await swapPage.toCurrency();
        await toCurrencyInput.setValue(o.toCurrency);
        await app.client.keys(["Enter"]);
        expect(await toCurrencyInput.getValue()).toBeDefined();
      });

      it("continue button should be enabled", async () => {
        const continueButton = await swapPage.continueButton();
        expect(await continueButton.waitForEnabled()).toBe(true);
      });

      it("should display the amount to receive", async () => {
        const toAmount = await swapPage.toAmount();
        expect(await toAmount.getValue()).toBe(o.toAmount);
      });

      it("should display the price", async () => {
        const price = await swapPage.price();
        expect(await price.isDisplayed()).toBe(true);
      });

      it("should display the countdown", async () => {
        const countdown = await swapPage.countdown();
        expect(await countdown.isDisplayed()).toBe(true);
      });

      it("should trigger the countdown", async () => {
        // lower the countdown by 1s
        await app.client.pause(1000);

        const countdown = await swapPage.countdown();
        expect(await countdown.getText()).toBe("00:59");
      });
    });

    describe("when I select a destination account", () => {
      it('should refresh the "to" form', async () => {
        const toAccount = await swapPage.toAccount();
        await toAccount.setValue(o.toAccount);
        await app.client.keys(["Enter"]);

        const continueButton = await swapPage.continueButton();
        expect(await continueButton.waitForEnabled({ reverse: true })).toBe(true);
        expect(await continueButton.waitForEnabled()).toBe(true);
      });

      it("should refresh the countdown", async () => {
        const countdown = await swapPage.countdown();
        expect(await countdown.getText()).toBe("01:00");
      });

      it("form should be valid", async () => {
        expect(await app.client.screenshot()).toMatchImageSnapshot({
          customSnapshotIdentifier: "swap-rates",
        });
      });
    });
  });
};

export default swap;
