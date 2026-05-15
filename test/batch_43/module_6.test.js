const { expect } = require("chai");

describe("Batch 43 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 43,
      commit: 6,
      timestamp: "1778859006.0715365"
    };
    expect(metadata.batch).to.equal(43);
    expect(metadata.commit).to.equal(6);
  });
});
