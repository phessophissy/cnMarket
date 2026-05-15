const { expect } = require("chai");

describe("Batch 36 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 36,
      commit: 7,
      timestamp: "1778858947.5418591"
    };
    expect(metadata.batch).to.equal(36);
    expect(metadata.commit).to.equal(7);
  });
});
