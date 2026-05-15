const { expect } = require("chai");

describe("Batch 73 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 73,
      commit: 3,
      timestamp: "1778859223.0909894"
    };
    expect(metadata.batch).to.equal(73);
    expect(metadata.commit).to.equal(3);
  });
});
