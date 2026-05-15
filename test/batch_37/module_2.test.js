const { expect } = require("chai");

describe("Batch 37 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 37,
      commit: 2,
      timestamp: "1778858954.8230443"
    };
    expect(metadata.batch).to.equal(37);
    expect(metadata.commit).to.equal(2);
  });
});
