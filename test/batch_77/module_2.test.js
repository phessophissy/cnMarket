const { expect } = require("chai");

describe("Batch 77 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 77,
      commit: 2,
      timestamp: "1778859254.1181762"
    };
    expect(metadata.batch).to.equal(77);
    expect(metadata.commit).to.equal(2);
  });
});
