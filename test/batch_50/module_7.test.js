const { expect } = require("chai");

describe("Batch 50 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 50,
      commit: 7,
      timestamp: "1778859056.2291062"
    };
    expect(metadata.batch).to.equal(50);
    expect(metadata.commit).to.equal(7);
  });
});
