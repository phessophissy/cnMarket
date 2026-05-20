const { expect } = require("chai");

describe("Batch 100 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 100,
      commit: 3,
      timestamp: "1779313787.406789925"
    };
    expect(metadata.batch).to.equal(100);
    expect(metadata.commit).to.equal(3);
  });
});
