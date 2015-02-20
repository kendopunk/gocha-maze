function typoglycemia(text, level) {

	this.text = undefined,
		this.level = 'good',
		this.elementID = undefined;
	
	// G
	this.getElementID = function() {
		return this.elementID;
	},
	this.getLevel = function() {
		return this.level;
	},
	this.getText = function() {
		return this.text;
	},
	
	// S
	this.setElementID = function(elementID) {
		this.elementID = elementID;
	},
	this.setLevel = function(level) {
		this.level = level || 'good';
	},
	this.setText = function(text) {
		this.text = text || '';
	},
	
	this.convert = function() {
		var words = this.text.replace(/[^\w\s]|_/g, function($1) {
			return ' ' + $1 + ' ';}
		).replace(/[ ]+/g, ' ').split(' '),
			result;

		if(this.level == 'damn') {
			result = this.goDamn(words);
		} else if(this.level == 'better') {
			result = this.goBetter(words);
		} else {
			result = this.goGood(words);
		}
		
	 	document.getElementById(this.elementID).innerHTML = result;
	},
	
	// l = !
	// a = @
	
	this.goDamn = function(wordArray) {
		var map = wordArray.map(function(item) {
		
			if(item.length <= 4) {
				return item;
			}
			
			return item.slice(0,1)
				+ this.charShuffle(item.slice(1, item.length-1).split('')).join('').replace(/a/i, '@')
				+ item.slice(item.length-1, item.length);
		}, this);
		
		// have to rejoin punctuation with no spaces
		return map.join(' ').replace(/(\r\n|\n|\r)/gm, '<br>');
	},
	
	this.goBetter = function(wordArray) {
		var map = wordArray.map(function(item) {
		
			if(item.length <= 4) {
				return item;
			}
			
			return item.slice(0,1)
				+ this.charShuffle(item.slice(1, item.length-1).split('')).join('')
				+ item.slice(item.length-1, item.length);
		}, this);
		
		// have to rejoin punctuation with no spaces
		return map.join(' ').replace(/(\r\n|\n|\r)/gm, '<br>');
	},
	
	/**
	 * @function
	 * @description Initial 2 characters and final 2 characters left intact.
	 * 	inner characters shuffled
	 */
	this.goGood = function(wordArray) {
	
		var map = wordArray.map(function(item) {
		
			if(item.length <= 5) {
				return item;
			}
			
			return item.slice(0,2)
				+ this.charShuffle(item.slice(2, item.length-2).split('')).join('')
				+ item.slice(item.length-2, item.length);
		}, this);
		
		// have to rejoin punctuation with no spaces
		return map.join(' ').replace(/(\r\n|\n|\r)/gm, '<br>');
	}
	
	/** Fisher-Yates ?? **/
	// http://bost.ocks.org/mike/shuffle/
	this.charShuffle = function(arr) {
		var m = arr.length, t, i;
		
		// while there are remaining elements to shuffle
		while(m) {
			// Pick a remaining element…
    		i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = arr[m];
			arr[m] = arr[i];
			arr[i] = t;
		}
		
		return arr;
	}
}

/** 
 * @function
 */
function tgWrapper(text, level, elementID) {
	var tg = new typoglycemia();
	tg.setText(text);
	tg.setLevel(level);
	tg.setElementID(elementID);
	tg.convert();
}