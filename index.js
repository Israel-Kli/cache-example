// ES6 Map object holds key-value pairs and remembers the original insertion order of the keys
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// So the solution below has O(1) complexity

class Cache {

    constructor(maxItems) {
        this.maxItems = maxItems;
        this.dataEntries = new Map();
    }

    set(key, value) {
        this.limitMaxSize(key);
        return this.dataEntries.set(key, value);
    }

    get(key) {
        const value = this.dataEntries.get(key);
        if (value) {
            this.dataEntries.delete(key);
            this.dataEntries.set(key, value);
        }
        return value;
    }

    toObject() {
        return Object.fromEntries(this.dataEntries);
    }

    limitMaxSize(key) {
        if (this.dataEntries.has(key)) {
            this.dataEntries.delete(key);
        } else if (this.maxItems === this.dataEntries.size) {
            this.dataEntries.delete(this.getOldestElementKey());
        }

    }

    getOldestElementKey() {
        return this.dataEntries.keys().next().value;
    }

}

const cache = new Cache(3);
cache.set("key1", 1111);
cache.set("key2", 2222);
cache.set("key3", 3333);
console.log(cache.toObject());
cache.get("key2");
cache.set("key4", 4444);
console.log(cache.toObject());
