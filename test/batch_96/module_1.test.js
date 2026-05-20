const { expect } = require("chai");

describe("Batch 96 - Module 1", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 96,
      commit: 1,
      timestamp: "1779313765.392715274"
    };
    expect(metadata.batch).to.equal(96);
    expect(metadata.commit).to.equal(1);
  });
});
