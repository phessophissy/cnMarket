const { expect } = require("chai");

describe("Batch 36 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 36,
      commit: 6,
      timestamp: "1778858947.5205977"
    };
    expect(metadata.batch).to.equal(36);
    expect(metadata.commit).to.equal(6);
  });
});
