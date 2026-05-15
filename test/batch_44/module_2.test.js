const { expect } = require("chai");

describe("Batch 44 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 44,
      commit: 2,
      timestamp: "1778859014.2736752"
    };
    expect(metadata.batch).to.equal(44);
    expect(metadata.commit).to.equal(2);
  });
});
