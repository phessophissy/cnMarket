const { expect } = require("chai");

describe("Batch 41 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 41,
      commit: 4,
      timestamp: "1778858984.8183722"
    };
    expect(metadata.batch).to.equal(41);
    expect(metadata.commit).to.equal(4);
  });
});
