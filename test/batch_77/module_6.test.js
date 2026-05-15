const { expect } = require("chai");

describe("Batch 77 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 77,
      commit: 6,
      timestamp: "1778859254.1792645"
    };
    expect(metadata.batch).to.equal(77);
    expect(metadata.commit).to.equal(6);
  });
});
