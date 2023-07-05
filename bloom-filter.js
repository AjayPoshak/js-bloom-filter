import murmurhash from "murmurhash";
const DEFAULT_ERROR_RATE = 0.01;
const DEFAULT_CAPACITY = 100;

/**
 * Keeping this implementation simple, by not handling the expansion.  Once the bloom filter fills upto the `capacity`, then expansion happens
 * to add more bloom filters which are stacked on current one.
 *
 * k = count of hash functions
 * m = bf array size
 * bpe = bits per element i.e. how many times a given element is hashed with different seeds
 * bpe = Math.ceil(-Math.log(errorRate)/(Math.log(2)*Math.log(2)))
 */
class BloomFilter {
  #seeds;
  constructor(errorRate = DEFAULT_ERROR_RATE, capacity = DEFAULT_CAPACITY) {
    if (errorRate <= 0 || errorRate >= 1)
      throw new Error("errorRate out of acceptable range");
    this.errorRate = errorRate;
    this.capacity = capacity;
    this.bpe = Math.ceil(
      -Math.log(this.errorRate) / (Math.log(2) * Math.log(2))
    );
    this.bf = new Array(this.capacity).fill(0);
    this.#seeds = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  #getHash(element, seed) {
    return murmurhash.v3(element.toString(), seed);
  }

  add(element) {
    for (let i = 0; i < this.bpe; i++) {
      const hash = this.#getHash(element, this.#seeds[i]);
      const index = hash % this.bf.length;
      this.bf[index] = 1;
    }
  }

  exists(element) {
    for (let i = 0; i < this.bpe; i++) {
      const hash = this.#getHash(element, this.#seeds[i]);
      const index = hash % this.bf.length;
      if (this.bf[index] === 0) return false;
    }
    return true;
  }
}

const bFilter = new BloomFilter();
bFilter.add("apple");
bFilter.add("banana");
console.log(bFilter.exists("apple"));
console.log(bFilter.exists("banana"));
console.log(bFilter.exists("papaya"));

export default BloomFilter;
