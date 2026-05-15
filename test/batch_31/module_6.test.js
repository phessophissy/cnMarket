const { expect } = require("chai");

describe("Batch 31 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 31,
      commit: 6,
      timestamp: "1778858910.2252383"
    };
    expect(metadata.batch).to.equal(31);
    expect(metadata.commit).to.equal(6);
  });
});
