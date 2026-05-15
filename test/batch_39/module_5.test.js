const { expect } = require("chai");

describe("Batch 39 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 39,
      commit: 5,
      timestamp: "1778858976.4093578"
    };
    expect(metadata.batch).to.equal(39);
    expect(metadata.commit).to.equal(5);
  });
});
