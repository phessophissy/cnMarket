const { expect } = require("chai");

describe("Batch 55 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 55,
      commit: 3,
      timestamp: "1778859088.1621523"
    };
    expect(metadata.batch).to.equal(55);
    expect(metadata.commit).to.equal(3);
  });
});
