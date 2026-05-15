const { expect } = require("chai");

describe("Batch 41 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 41,
      commit: 6,
      timestamp: "1778858984.8500288"
    };
    expect(metadata.batch).to.equal(41);
    expect(metadata.commit).to.equal(6);
  });
});
