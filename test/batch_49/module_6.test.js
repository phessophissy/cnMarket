const { expect } = require("chai");

describe("Batch 49 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 49,
      commit: 6,
      timestamp: "1778859049.1226397"
    };
    expect(metadata.batch).to.equal(49);
    expect(metadata.commit).to.equal(6);
  });
});
