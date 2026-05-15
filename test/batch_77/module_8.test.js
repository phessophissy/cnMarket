const { expect } = require("chai");

describe("Batch 77 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 77,
      commit: 8,
      timestamp: "1778859254.2254627"
    };
    expect(metadata.batch).to.equal(77);
    expect(metadata.commit).to.equal(8);
  });
});
