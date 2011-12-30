var lib = {
	sha1_none: require('./sha1')(0),
	sha1_all: require('./sha1')(-1),
	sha1_some: require('./sha1')(5),
};

console.log(lib.sha1_none('abc') === 'a9993e364706816aba3e25717850c26c9cd0d89d');
var final_test = '';
for (var i = 0; i < 1000000; ++i) {
	final_test += 'a';
}
console.log(lib.sha1_all(final_test) === '34aa973cd4c4daa4f61eeb2bdbad27316534016f');
console.log(lib.sha1_some('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq') === '84983e441c3bd26ebaae4aa1f95129e5e54670f1');

var test = '';
for (var i = 0; i < 7; ++i) {
	test += 'a';
	lib.sha1_some(test);
	console.log(lib.sha1_some);
}
