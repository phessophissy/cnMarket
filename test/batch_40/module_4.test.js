const { expect } = require("chai");

describe("Batch 40 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 40,
      commit: 4,
      timestamp: "1778858977.2830877"
    };
    expect(metadata.batch).to.equal(40);
    expect(metadata.commit).to.equal(4);
  });
});
