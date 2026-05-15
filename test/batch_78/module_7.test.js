const { expect } = require("chai");

describe("Batch 78 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 78,
      commit: 7,
      timestamp: "1778859267.4067829"
    };
    expect(metadata.batch).to.equal(78);
    expect(metadata.commit).to.equal(7);
  });
});
