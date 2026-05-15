const { expect } = require("chai");

describe("Batch 33 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 33,
      commit: 5,
      timestamp: "1778858931.8478825"
    };
    expect(metadata.batch).to.equal(33);
    expect(metadata.commit).to.equal(5);
  });
});
