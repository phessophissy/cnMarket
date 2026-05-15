const { expect } = require("chai");

describe("Batch 49 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 49,
      commit: 2,
      timestamp: "1778859049.0564637"
    };
    expect(metadata.batch).to.equal(49);
    expect(metadata.commit).to.equal(2);
  });
});
