const { expect } = require("chai");

describe("Batch 103 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 103,
      commit: 4,
      timestamp: "1779383509.645999908"
    };
    expect(metadata.batch).to.equal(103);
    expect(metadata.commit).to.equal(4);
  });
});
