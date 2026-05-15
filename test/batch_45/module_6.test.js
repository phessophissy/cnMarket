const { expect } = require("chai");

describe("Batch 45 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 45,
      commit: 6,
      timestamp: "1778859014.852128"
    };
    expect(metadata.batch).to.equal(45);
    expect(metadata.commit).to.equal(6);
  });
});
