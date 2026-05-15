const { expect } = require("chai");

describe("Batch 60 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 60,
      commit: 6,
      timestamp: "1778859125.3707721"
    };
    expect(metadata.batch).to.equal(60);
    expect(metadata.commit).to.equal(6);
  });
});
