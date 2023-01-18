const { assert, expect } = require("chai");

describe("habit", () => {
  describe("recurring", () => {
    it("should be the accurate time passed according to the recurring interval chosen", () => {
      const dateNow = Date.now();
      console.log(`date now: ${dateNow}`);

      const newDate = new Date();
      console.log(`new date: ${newDate}`);
    });
  });
});
