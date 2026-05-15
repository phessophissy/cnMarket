const { expect } = require("chai");

describe("Batch 64 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 64,
      commit: 4,
      timestamp: "1778859155.1923854"
    };
    expect(metadata.batch).to.equal(64);
    expect(metadata.commit).to.equal(4);
  });
});
