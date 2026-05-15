const { expect } = require("chai");

describe("Batch 56 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 56,
      commit: 4,
      timestamp: "1778859095.4563792"
    };
    expect(metadata.batch).to.equal(56);
    expect(metadata.commit).to.equal(4);
  });
});
