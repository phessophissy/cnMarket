const { expect } = require("chai");

describe("Batch 50 - Module 8", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 50,
      commit: 8,
      timestamp: "1778859056.2419243"
    };
    expect(metadata.batch).to.equal(50);
    expect(metadata.commit).to.equal(8);
  });
});
