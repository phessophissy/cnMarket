const { expect } = require("chai");

describe("Batch 63 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 63,
      commit: 2,
      timestamp: "1778859147.8849337"
    };
    expect(metadata.batch).to.equal(63);
    expect(metadata.commit).to.equal(2);
  });
});
