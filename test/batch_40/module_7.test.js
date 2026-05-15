const { expect } = require("chai");

describe("Batch 40 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 40,
      commit: 7,
      timestamp: "1778858977.3390796"
    };
    expect(metadata.batch).to.equal(40);
    expect(metadata.commit).to.equal(7);
  });
});
