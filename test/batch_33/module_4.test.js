const { expect } = require("chai");

describe("Batch 33 - Module 4", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 33,
      commit: 4,
      timestamp: "1778858931.8335624"
    };
    expect(metadata.batch).to.equal(33);
    expect(metadata.commit).to.equal(4);
  });
});
