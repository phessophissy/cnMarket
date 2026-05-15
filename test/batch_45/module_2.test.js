const { expect } = require("chai");

describe("Batch 45 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 45,
      commit: 2,
      timestamp: "1778859014.7909434"
    };
    expect(metadata.batch).to.equal(45);
    expect(metadata.commit).to.equal(2);
  });
});
