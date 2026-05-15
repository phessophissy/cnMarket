const { expect } = require("chai");

describe("Batch 70 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 70,
      commit: 4,
      timestamp: "1778859206.1925797"
    };
    expect(metadata.batch).to.equal(70);
    expect(metadata.commit).to.equal(4);
  });
});
