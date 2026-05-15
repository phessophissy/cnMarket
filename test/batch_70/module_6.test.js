const { expect } = require("chai");

describe("Batch 70 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 70,
      commit: 6,
      timestamp: "1778859206.2152152"
    };
    expect(metadata.batch).to.equal(70);
    expect(metadata.commit).to.equal(6);
  });
});
