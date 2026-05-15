const { expect } = require("chai");

describe("Batch 32 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 32,
      commit: 7,
      timestamp: "1778858918.9766042"
    };
    expect(metadata.batch).to.equal(32);
    expect(metadata.commit).to.equal(7);
  });
});
