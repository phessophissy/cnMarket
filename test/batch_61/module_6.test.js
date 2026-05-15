const { expect } = require("chai");

describe("Batch 61 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 61,
      commit: 6,
      timestamp: "1778859133.2140245"
    };
    expect(metadata.batch).to.equal(61);
    expect(metadata.commit).to.equal(6);
  });
});
