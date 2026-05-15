const { expect } = require("chai");

describe("Batch 39 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 39,
      commit: 3,
      timestamp: "1778858976.360155"
    };
    expect(metadata.batch).to.equal(39);
    expect(metadata.commit).to.equal(3);
  });
});
