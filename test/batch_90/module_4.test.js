const { expect } = require("chai");

describe("Batch 90 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 90,
      commit: 4,
      timestamp: "1779313732.045799324"
    };
    expect(metadata.batch).to.equal(90);
    expect(metadata.commit).to.equal(4);
  });
});
