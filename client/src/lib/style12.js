// I was going to get rid of this but wanted to keep it as a reference for how to make code cleaner

/* export function ranks2fen(str) {
	var ranks = str.split(/\s+/);

	return ranks
		.map(function(rank) {
			var newRank = "";

			for (var i = 0, count = 0; i < 8; i++) {
				var letter = rank[i];

				if (letter === "-") {
					count++;
					letter = i === 7 ? count.toString() : "";
				} else if (count > 0) {
					newRank += count.toString();
					count = 0;
				}

				newRank += letter;
			}

			return newRank;
		})
		.join("/");
}
*/

// single-liner
export function style12(str) {
	return str.replace(/ /g, "/").replace(/-+/g, m => m.length);
}
