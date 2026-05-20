const { expect } = require("chai");

describe("Batch 90 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 90,
      commit: 2,
      timestamp: "1779313732.016796608"
    };
    expect(metadata.batch).to.equal(90);
    expect(metadata.commit).to.equal(2);
  });
});
