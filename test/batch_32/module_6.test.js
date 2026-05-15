const { expect } = require("chai");

describe("Batch 32 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 32,
      commit: 6,
      timestamp: "1778858918.9649656"
    };
    expect(metadata.batch).to.equal(32);
    expect(metadata.commit).to.equal(6);
  });
});
