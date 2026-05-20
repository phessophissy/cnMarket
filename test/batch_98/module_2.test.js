const { expect } = require("chai");

describe("Batch 98 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 98,
      commit: 2,
      timestamp: "1779313776.689111839"
    };
    expect(metadata.batch).to.equal(98);
    expect(metadata.commit).to.equal(2);
  });
});
