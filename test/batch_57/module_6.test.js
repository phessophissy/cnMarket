const { expect } = require("chai");

describe("Batch 57 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 57,
      commit: 6,
      timestamp: "1778859102.8108857"
    };
    expect(metadata.batch).to.equal(57);
    expect(metadata.commit).to.equal(6);
  });
});
