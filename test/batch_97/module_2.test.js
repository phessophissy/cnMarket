const { expect } = require("chai");

describe("Batch 97 - Module 2", function () {
  it("Should return correct batch metadata", async function () {
    const metadata = {
      batch: 97,
      commit: 2,
      timestamp: "1779313770.950056534"
    };
    expect(metadata.batch).to.equal(97);
    expect(metadata.commit).to.equal(2);
  });
});
