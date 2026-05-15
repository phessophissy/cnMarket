const { expect } = require("chai");

describe("Batch 35 - Module 6", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 35,
      commit: 6,
      timestamp: "1778858940.5654817"
    };
    expect(metadata.batch).to.equal(35);
    expect(metadata.commit).to.equal(6);
  });
});
