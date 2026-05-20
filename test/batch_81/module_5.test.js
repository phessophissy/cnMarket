const { expect } = require("chai");

describe("Batch 81 - Module 5", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 81,
      commit: 5,
      timestamp: "1779313681.459719648"
    };
    expect(metadata.batch).to.equal(81);
    expect(metadata.commit).to.equal(5);
  });
});
