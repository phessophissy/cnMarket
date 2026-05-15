const { expect } = require("chai");

describe("Batch 39 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 39,
      commit: 2,
      timestamp: "1778858976.3367481"
    };
    expect(metadata.batch).to.equal(39);
    expect(metadata.commit).to.equal(2);
  });
});
