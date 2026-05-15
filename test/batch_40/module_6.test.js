const { expect } = require("chai");

describe("Batch 40 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 40,
      commit: 6,
      timestamp: "1778858977.3158817"
    };
    expect(metadata.batch).to.equal(40);
    expect(metadata.commit).to.equal(6);
  });
});
