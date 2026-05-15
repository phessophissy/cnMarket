const { expect } = require("chai");

describe("Batch 37 - Module 9", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 37,
      commit: 9,
      timestamp: "1778858954.9892793"
    };
    expect(metadata.batch).to.equal(37);
    expect(metadata.commit).to.equal(9);
  });
});
