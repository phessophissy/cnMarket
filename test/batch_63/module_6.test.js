const { expect } = require("chai");

describe("Batch 63 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 63,
      commit: 6,
      timestamp: "1778859147.9258378"
    };
    expect(metadata.batch).to.equal(63);
    expect(metadata.commit).to.equal(6);
  });
});
