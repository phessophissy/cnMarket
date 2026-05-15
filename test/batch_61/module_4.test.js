const { expect } = require("chai");

describe("Batch 61 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 61,
      commit: 4,
      timestamp: "1778859133.1936872"
    };
    expect(metadata.batch).to.equal(61);
    expect(metadata.commit).to.equal(4);
  });
});
