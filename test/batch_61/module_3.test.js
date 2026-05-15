const { expect } = require("chai");

describe("Batch 61 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 61,
      commit: 3,
      timestamp: "1778859133.1823292"
    };
    expect(metadata.batch).to.equal(61);
    expect(metadata.commit).to.equal(3);
  });
});
