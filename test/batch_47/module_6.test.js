const { expect } = require("chai");

describe("Batch 47 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 47,
      commit: 6,
      timestamp: "1778859028.9936864"
    };
    expect(metadata.batch).to.equal(47);
    expect(metadata.commit).to.equal(6);
  });
});
