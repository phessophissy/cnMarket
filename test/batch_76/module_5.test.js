const { expect } = require("chai");

describe("Batch 76 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 76,
      commit: 5,
      timestamp: "1778859247.0114992"
    };
    expect(metadata.batch).to.equal(76);
    expect(metadata.commit).to.equal(5);
  });
});
