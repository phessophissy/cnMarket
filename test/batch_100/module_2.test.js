const { expect } = require("chai");

describe("Batch 100 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 100,
      commit: 2,
      timestamp: "1779313787.392614042"
    };
    expect(metadata.batch).to.equal(100);
    expect(metadata.commit).to.equal(2);
  });
});
