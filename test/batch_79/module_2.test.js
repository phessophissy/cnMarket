const { expect } = require("chai");

describe("Batch 79 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 79,
      commit: 2,
      timestamp: "1778859274.5379417"
    };
    expect(metadata.batch).to.equal(79);
    expect(metadata.commit).to.equal(2);
  });
});
