const { expect } = require("chai");

describe("Batch 73 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 73,
      commit: 2,
      timestamp: "1778859223.0793645"
    };
    expect(metadata.batch).to.equal(73);
    expect(metadata.commit).to.equal(2);
  });
});
