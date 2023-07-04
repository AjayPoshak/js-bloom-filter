# A bloom filter implementation in JS

This is an implementation of Bloom filter in JS. Bloom filters are probabilistic data structure.
If an hashmap is occupying a lot of space, and we can relax the constraint of determinstic results, then we can use bloom filters to save space. Read [this paper](https://dl.acm.org/doi/pdf/10.1145/362686.362692) for more details.

```js
const bloomFilter = new BloomFilter(); // errorRate(optional), capacity (optional)
bloomFilter.add("apple");
bloomFilter.exists("apple"); // true
bloomFilter.exists("banana"); // false
```

References:

1. [Redis Bloom](https://github.com/RedisBloom/RedisBloom/blob/master/deps/bloom/bloom.c#L100)
2. [Bloom filter implementation in JS](https://github.com/guyroyse/understanding-probabilistic-data-structures/blob/master/code/bloom-filter/javascript/bloom.js)
