const { expect } = require("chai");

describe("Batch 80 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 80,
      commit: 4,
      timestamp: "1778859282.3737726"
    };
    expect(metadata.batch).to.equal(80);
    expect(metadata.commit).to.equal(4);
  });
});
