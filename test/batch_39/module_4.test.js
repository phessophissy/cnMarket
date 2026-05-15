const { expect } = require("chai");

describe("Batch 39 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 39,
      commit: 4,
      timestamp: "1778858976.3878987"
    };
    expect(metadata.batch).to.equal(39);
    expect(metadata.commit).to.equal(4);
  });
});
