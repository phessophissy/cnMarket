const { expect } = require("chai");

describe("Batch 73 - Module 7", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 73,
      commit: 7,
      timestamp: "1778859223.1483161"
    };
    expect(metadata.batch).to.equal(73);
    expect(metadata.commit).to.equal(7);
  });
});
