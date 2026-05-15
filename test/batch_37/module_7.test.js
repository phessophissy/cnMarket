const { expect } = require("chai");

describe("Batch 37 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 37,
      commit: 7,
      timestamp: "1778858954.9410677"
    };
    expect(metadata.batch).to.equal(37);
    expect(metadata.commit).to.equal(7);
  });
});
