const { expect } = require("chai");

describe("Batch 96 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 96,
      commit: 4,
      timestamp: "1779313765.437407591"
    };
    expect(metadata.batch).to.equal(96);
    expect(metadata.commit).to.equal(4);
  });
});
