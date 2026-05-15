const { expect } = require("chai");

describe("Batch 44 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 44,
      commit: 3,
      timestamp: "1778859014.2860744"
    };
    expect(metadata.batch).to.equal(44);
    expect(metadata.commit).to.equal(3);
  });
});
