const { expect } = require("chai");

describe("Batch 101 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 101,
      commit: 3,
      timestamp: "1779383429.898999929"
    };
    expect(metadata.batch).to.equal(101);
    expect(metadata.commit).to.equal(3);
  });
});
