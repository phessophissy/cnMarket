const { expect } = require("chai");

describe("Batch 101 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 101,
      commit: 5,
      timestamp: "1779383433.134999990"
    };
    expect(metadata.batch).to.equal(101);
    expect(metadata.commit).to.equal(5);
  });
});
