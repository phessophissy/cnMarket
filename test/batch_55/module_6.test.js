const { expect } = require("chai");

describe("Batch 55 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 55,
      commit: 6,
      timestamp: "1778859088.2049596"
    };
    expect(metadata.batch).to.equal(55);
    expect(metadata.commit).to.equal(6);
  });
});
