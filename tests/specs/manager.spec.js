import initialize, { app, mockListAppsResult, mockDeviceEvent } from "../common.js";

describe("Manager", () => {
  initialize("manager", {
    userData: "onboardingcompleted",
  });

  const $ = selector => app.client.$(selector);
  const deviceInfo = {
    version: "1.6.1",
    isBootloader: false,
    isOSU: false,
    managerAllowed: false,
    mcuVersion: "1.7",
    pinValidated: false,
    providerName: null,
    majMin: "1.6",
    targetId: 823132164,
  };

  it("can access manager", async () => {
    const managerButton = await $("#drawer-manager-button");
    await managerButton.click();
    await mockDeviceEvent(
      {
        type: "listingApps",
        deviceInfo,
      },
      {
        type: "result",
        result: mockListAppsResult(
          "Bitcoin,Ethereum,Litecoin,Stellar,Tron,Ripple,Polkadot",
          "Bitcoin,Ethereum (outdated)",
          deviceInfo,
        ),
      },
      { type: "complete" },
    );

    await app.client.waitUntilWindowLoaded();
    const deviceActionLoading = await $("#manager-container");
    await deviceActionLoading.waitForExist();

    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "manager-catalog",
    });
  });

  it("can install an app", async () => {
    const installTronButton = await $("#appActionsInstall-Tron");
    await installTronButton.click();
    const progressBar = await $("#manager-app-progress-bar");
    await app.client.waitUntilWindowLoaded();
    await progressBar.waitForExist({ timeout: 10000, reverse: true });
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "manager-install-tron",
    });
  });

  it("can access installed apps tab", async () => {
    const appsOnDeviceButton = await $("#appsOnDevice-tab");
    await appsOnDeviceButton.click();
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "manager-appsOnDevice",
    });
  });

  it("can uninstall an app", async () => {
    const uninstallTronButton = await $("#appActionsUninstall-Tron");
    await uninstallTronButton.click();
    await app.client.waitUntilWindowLoaded();
    await uninstallTronButton.waitForExist({reverse: true });
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "manager-uninstall-tron",
    });
  });

  it("can update all apps", async () => {
    const catalogButton = await $("#appCatalog-tab");
    await catalogButton.click();
    const updateAllbutton = await $("#managerAppsList-updateAll");
    await updateAllbutton.click();
    await app.client.waitUntilWindowLoaded();
    await updateAllbutton.waitForExist({reverse: true });
    expect(await app.client.screenshot()).toMatchImageSnapshot({
      customSnapshotIdentifier: "manager-updateAll",
    });
  });
});
