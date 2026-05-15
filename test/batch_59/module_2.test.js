const { expect } = require("chai");

describe("Batch 59 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 59,
      commit: 2,
      timestamp: "1778859117.8964918"
    };
    expect(metadata.batch).to.equal(59);
    expect(metadata.commit).to.equal(2);
  });
});
