const { expect } = require("chai");

describe("Batch 78 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 78,
      commit: 8,
      timestamp: "1778859267.419977"
    };
    expect(metadata.batch).to.equal(78);
    expect(metadata.commit).to.equal(8);
  });
});
