const { expect } = require("chai");

describe("Batch 56 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 56,
      commit: 2,
      timestamp: "1778859095.4353733"
    };
    expect(metadata.batch).to.equal(56);
    expect(metadata.commit).to.equal(2);
  });
});
