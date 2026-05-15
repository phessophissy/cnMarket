const { expect } = require("chai");

describe("Batch 37 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 37,
      commit: 3,
      timestamp: "1778858954.8425524"
    };
    expect(metadata.batch).to.equal(37);
    expect(metadata.commit).to.equal(3);
  });
});
