const { expect } = require("chai");

describe("Batch 88 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 88,
      commit: 5,
      timestamp: "1779313721.152732921"
    };
    expect(metadata.batch).to.equal(88);
    expect(metadata.commit).to.equal(5);
  });
});
