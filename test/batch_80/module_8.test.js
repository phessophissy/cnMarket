const { expect } = require("chai");

describe("Batch 80 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 80,
      commit: 8,
      timestamp: "1778859282.4200785"
    };
    expect(metadata.batch).to.equal(80);
    expect(metadata.commit).to.equal(8);
  });
});
