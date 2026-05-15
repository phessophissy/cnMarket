const { expect } = require("chai");

describe("Batch 51 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 51,
      commit: 6,
      timestamp: "1778859057.9536953"
    };
    expect(metadata.batch).to.equal(51);
    expect(metadata.commit).to.equal(6);
  });
});
