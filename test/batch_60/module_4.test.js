const { expect } = require("chai");

describe("Batch 60 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 60,
      commit: 4,
      timestamp: "1778859125.350606"
    };
    expect(metadata.batch).to.equal(60);
    expect(metadata.commit).to.equal(4);
  });
});
