const { expect } = require("chai");

describe("Batch 37 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 37,
      commit: 6,
      timestamp: "1778858954.915766"
    };
    expect(metadata.batch).to.equal(37);
    expect(metadata.commit).to.equal(6);
  });
});
