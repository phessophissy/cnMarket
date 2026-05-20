const { expect } = require("chai");

describe("Batch 98 - Module 3", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 98,
      commit: 3,
      timestamp: "1779313776.716086630"
    };
    expect(metadata.batch).to.equal(98);
    expect(metadata.commit).to.equal(3);
  });
});
