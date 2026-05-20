const { expect } = require("chai");

describe("Batch 96 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 96,
      commit: 2,
      timestamp: "1779313765.408068346"
    };
    expect(metadata.batch).to.equal(96);
    expect(metadata.commit).to.equal(2);
  });
});
