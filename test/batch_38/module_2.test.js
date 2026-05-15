const { expect } = require("chai");

describe("Batch 38 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 38,
      commit: 2,
      timestamp: "1778858968.2803142"
    };
    expect(metadata.batch).to.equal(38);
    expect(metadata.commit).to.equal(2);
  });
});
