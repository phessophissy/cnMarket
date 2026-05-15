const { expect } = require("chai");

describe("Batch 41 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 41,
      commit: 2,
      timestamp: "1778858984.7902858"
    };
    expect(metadata.batch).to.equal(41);
    expect(metadata.commit).to.equal(2);
  });
});
