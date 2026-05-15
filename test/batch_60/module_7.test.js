const { expect } = require("chai");

describe("Batch 60 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 60,
      commit: 7,
      timestamp: "1778859125.3829033"
    };
    expect(metadata.batch).to.equal(60);
    expect(metadata.commit).to.equal(7);
  });
});
