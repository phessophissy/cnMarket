const { expect } = require("chai");

describe("Batch 66 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 66,
      commit: 2,
      timestamp: "1778859176.3886952"
    };
    expect(metadata.batch).to.equal(66);
    expect(metadata.commit).to.equal(2);
  });
});
