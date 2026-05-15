const { expect } = require("chai");

describe("Batch 40 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 40,
      commit: 8,
      timestamp: "1778858977.3592486"
    };
    expect(metadata.batch).to.equal(40);
    expect(metadata.commit).to.equal(8);
  });
});
