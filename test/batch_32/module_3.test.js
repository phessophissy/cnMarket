const { expect } = require("chai");

describe("Batch 32 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 32,
      commit: 3,
      timestamp: "1778858918.9325795"
    };
    expect(metadata.batch).to.equal(32);
    expect(metadata.commit).to.equal(3);
  });
});
