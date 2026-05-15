const { expect } = require("chai");

describe("Batch 80 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 80,
      commit: 6,
      timestamp: "1778859282.396966"
    };
    expect(metadata.batch).to.equal(80);
    expect(metadata.commit).to.equal(6);
  });
});
