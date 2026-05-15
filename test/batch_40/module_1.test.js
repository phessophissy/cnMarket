const { expect } = require("chai");

describe("Batch 40 - Module 1", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 40,
      commit: 1,
      timestamp: "1778858977.2097049"
    };
    expect(metadata.batch).to.equal(40);
    expect(metadata.commit).to.equal(1);
  });
});
