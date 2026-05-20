const { expect } = require("chai");

describe("Batch 98 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 98,
      commit: 5,
      timestamp: "1779313776.745418312"
    };
    expect(metadata.batch).to.equal(98);
    expect(metadata.commit).to.equal(5);
  });
});
