const { expect } = require("chai");

describe("Batch 41 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 41,
      commit: 3,
      timestamp: "1778858984.800827"
    };
    expect(metadata.batch).to.equal(41);
    expect(metadata.commit).to.equal(3);
  });
});
