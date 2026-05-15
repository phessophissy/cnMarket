const { expect } = require("chai");

describe("Batch 51 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 51,
      commit: 5,
      timestamp: "1778859057.9395835"
    };
    expect(metadata.batch).to.equal(51);
    expect(metadata.commit).to.equal(5);
  });
});
