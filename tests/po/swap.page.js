import Page from "./page";

export default class SwapPage extends Page {
  async KYCCheckbox() {
    return this.$("#swap-landing-kyc-tos");
  }

  async KYCContinueButton() {
    return this.$("#swap-landing-kyc-continue-button");
  }

  async form() {
    return this.$("#swap-form");
  }

  async fromCurrency() {
    return this.$("#swap-form-from-currency input");
  }

  async fromAccount() {
    return this.$("#swap-form-from-account input");
  }

  async fromAmount() {
    return this.$("#swap-form-from-amount");
  }

  async toCurrency() {
    return this.$("#swap-form-to-currency input");
  }

  async toAccount() {
    return this.$("#swap-form-to-account input");
  }

  async toAmount() {
    return this.$("#swap-form-to-amount");
  }

  async countervalue() {
    return this.$("#swap-form-countervalue");
  }

  async price() {
    return this.$("#swap-form-price");
  }

  async countdown() {
    return this.$("#swap-form-countdown");
  }

  async exchangeButton() {
    return this.$("#swap-form-exchange-button");
  }

  async summaryProviderCheckbox() {
    return this.$("#swap-modal-summary-provider-tos-checkbox");
  }

  async deviceConfirmationStep() {
    return this.$("#swap-modal-device-confirm");
  }

  async finishedStep() {
    return this.$("#swap-modal-finished-close-button");
  }

  async summaryConfirmButton() {
    return this.$("#swap-modal-summary-confirm-button");
  }

  async firstRow() {
    return this.$(".swap-history-row:first-child");
  }
}
