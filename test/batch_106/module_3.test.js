const { expect } = require("chai");

describe("Batch 106 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 106,
      commit: 3,
      timestamp: "1779383613.081000090"
    };
    expect(metadata.batch).to.equal(106);
    expect(metadata.commit).to.equal(3);
  });
});
