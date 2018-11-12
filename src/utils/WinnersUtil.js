export function createWinnersObj(RATINGS) {
	let WINNERS = {}, maxScores = 0

	for (let key in RATINGS) {
		maxScores = RATINGS[key][0].scores
		
		WINNERS[key] = RATINGS[key].filter(member => member.scores === maxScores)
 	}

	return WINNERS
}