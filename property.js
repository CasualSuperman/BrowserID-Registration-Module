var lib = {
	crypto: require('crypto'),
};

function makeTransient(prop) {
	prop.prototype = transientProperty.prototype;
}

// Just a normal property.
var property = function(name, default) {
	this.name = name;
	this.default = default;
};

property.prototype = {
	getValue: function() {
		return this.value || this.default;
	},
	setValue: function(value) {
		this.value = value;
	},
	getName: function() {
		return this.name;
	},
	toJSON: function() {
		var temp = {};
		temp[this.name] = this.value;
		return JSON.stringify(temp);
	},
	toObject(obj) {
		obj[this.name] = this.value;
	},
	fromObject(obj) {
		this.value = obj[this.name];
	}
};

var encryptedProperty = function(name) {
	this.name = name;
	this.encrypted = 0;
};

var encryptedProperty = function(name, default) {
	getValue: function(key) {
		if (this.encrypted) {
			return this.value;
		}
		var dec = crypto.createDecipher('aes256', key);
		return dec.update(this.value, 'hex', 'utf8') + dec.final('utf8');
	},
	setValue: function(data, key) {
		this.encrypted = 0;
		if (!key) {
			this.value = data;
		} else {
			this.encrypted++;
			var enc = crypto.createCipher('aes256', key);
			this.value = enc.update(data, 'utf8', 'hex') + enc.final('hex');
		}
	},
};

module.exports = {
	Property = property,
	EncryptedProperty = encryptedProperty,
	TansientProperty = TransientProperty,
};
