const { expect } = require("chai");

describe("Batch 46 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 46,
      commit: 2,
      timestamp: "1778859021.6832905"
    };
    expect(metadata.batch).to.equal(46);
    expect(metadata.commit).to.equal(2);
  });
});
