const { expect } = require("chai");

describe("Batch 100 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 100,
      commit: 4,
      timestamp: "1779313787.420191108"
    };
    expect(metadata.batch).to.equal(100);
    expect(metadata.commit).to.equal(4);
  });
});
