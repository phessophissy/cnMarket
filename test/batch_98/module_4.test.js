const { expect } = require("chai");

describe("Batch 98 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 98,
      commit: 4,
      timestamp: "1779313776.732098866"
    };
    expect(metadata.batch).to.equal(98);
    expect(metadata.commit).to.equal(4);
  });
});
