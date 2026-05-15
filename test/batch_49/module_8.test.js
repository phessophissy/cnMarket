const { expect } = require("chai");

describe("Batch 49 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 49,
      commit: 8,
      timestamp: "1778859049.1450982"
    };
    expect(metadata.batch).to.equal(49);
    expect(metadata.commit).to.equal(8);
  });
});
