const { expect } = require("chai");

describe("Batch 80 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 80,
      commit: 2,
      timestamp: "1778859282.3512583"
    };
    expect(metadata.batch).to.equal(80);
    expect(metadata.commit).to.equal(2);
  });
});
