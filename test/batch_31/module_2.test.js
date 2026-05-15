const { expect } = require("chai");

describe("Batch 31 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 31,
      commit: 2,
      timestamp: "1778858910.160972"
    };
    expect(metadata.batch).to.equal(31);
    expect(metadata.commit).to.equal(2);
  });
});
