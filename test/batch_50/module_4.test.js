const { expect } = require("chai");

describe("Batch 50 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 50,
      commit: 4,
      timestamp: "1778859056.1923835"
    };
    expect(metadata.batch).to.equal(50);
    expect(metadata.commit).to.equal(4);
  });
});
