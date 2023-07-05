import test from "node:test";
import assert from "node:assert";
import BloomFilter from "../bloom-filter.js";

test("should NOT return the false-negative for set value", () => {
  const bloom = new BloomFilter();
  bloom.add("foo");
  assert.strictEqual(bloom.exists("foo"), true);
  assert.strictEqual(bloom.exists("bar"), false);
});
