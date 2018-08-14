import _ from "underscore";

export function ranks2fen(str) {
	var ranks = str.split(/\s+/);

	return _.map(ranks, function(rank) {
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
	}).join("/");
}
