const { expect } = require("chai");

describe("Batch 36 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 36,
      commit: 2,
      timestamp: "1778858947.3761232"
    };
    expect(metadata.batch).to.equal(36);
    expect(metadata.commit).to.equal(2);
  });
});
