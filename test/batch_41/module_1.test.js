const { expect } = require("chai");

describe("Batch 41 - Module 1", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 41,
      commit: 1,
      timestamp: "1778858984.7812872"
    };
    expect(metadata.batch).to.equal(41);
    expect(metadata.commit).to.equal(1);
  });
});
