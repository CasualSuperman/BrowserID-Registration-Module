var lib = {
	fs    : require('fs'),
	path  : require('path'),
	crypto: require('crypto'),
};

var maxCache = -1;

var sha1 = (function() {
	var noCache = (function() {
		return function sha1(data) {
			return lib.crypto.createHash('sha1').update(data).digest('hex');
		};
	}());
	var allCache = (function() {
		// Cache of hashed emails in a local scope.
		var hashCache = {};
		return function sha1(data) {
			return hashCache[data] || hashCache[data] = noCache(data);
		};
	}());
	var someCache = function makeSomeHash(count) {
		var hashCache = {
			size: 0,
			last: [],
		};
		var shrinkToSize = function() {
			while (hashCache.size > count) {
				delete hashCache[hashCache.last.shift()];
			}
		};
		return function sha1(data) {
			var hash = hashCache[data];
			if (hash) {
				return hash;
			}
			hashCache[data] = hash = noCache(data);
			hashCache.last.push(data);
			hashCache.size = hashCache.size + 1;
			shrinkToSize();
			return hash;
		};
	};
	return function sha1_init(cacheSize) {
		switch(cacheSize) {
			case 0:
				return noCache;
			case -1:
				return allCache;
			default:
				return someCache(cacheSize);
		}
	};
}());