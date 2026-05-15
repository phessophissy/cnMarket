const { expect } = require("chai");

describe("Batch 72 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 72,
      commit: 6,
      timestamp: "1778859215.9172623"
    };
    expect(metadata.batch).to.equal(72);
    expect(metadata.commit).to.equal(6);
  });
});
